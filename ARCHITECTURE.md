# NlsPay — Especificación Arquitectónica del Backend y Base de Datos

## 1. Visión General de la Arquitectura

NlsPay adopta una arquitectura basada en microservicios modulares (o monolito modular de alto rendimiento) con Clean Architecture / Hexagonal Architecture:

```
┌────────────────────────────────────────────────────────┐
│                   Cliente Web (Vite + React)           │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS / WSS / JWT
┌───────────────────────────▼────────────────────────────┐
│                    API Gateway / Reverse Proxy          │
│                (Nginx / Cloudflare / Envoy)            │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│               Servicio Core NlsPay Backend             │
│        (NestJS con Fastify  ó  Spring Boot 3 en Java)   │
│  - Módulo Auth (JWT + WebAuthn + OAuth2)               │
│  - Módulo Transacciones & Libro Mayor                  │
│  - Módulo Presupuestos & Metas                         │
│  - Módulo Motor IA Analítica (Reglas & Previsiones)    │
│  - Módulo OCR Ingestión (Tesseract / Gemini Vision)    │
└─────────────┬───────────────────────────┬──────────────┘
              │                           │
┌─────────────▼──────────────┐ ┌──────────▼──────────────┐
│       PostgreSQL 16        │ │         Redis 7         │
│   (Transaccional / ACID)   │ │  (Caché & Rate Limiter) │
└────────────────────────────┘ └─────────────────────────┘
```

---

## 2. Esquema Relacional de Base de Datos (PostgreSQL)

```sql
-- Extensión para IDs criptográficos UUID v7
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Tabla de Usuarios
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    tier VARCHAR(50) DEFAULT 'PRO',
    currency_preference VARCHAR(10) DEFAULT 'COP',
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Cuentas Financieras (Bancos, Billeteras, Efectivo)
CREATE TABLE accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_name VARCHAR(100) NOT NULL,
    account_type VARCHAR(50) NOT NULL, -- 'CHECKING', 'SAVINGS', 'CREDIT_CARD', 'CASH'
    balance NUMERIC(15, 2) NOT NULL DEFAULT 0.00,
    currency VARCHAR(10) DEFAULT 'COP',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Categorías y Subcategorías
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE, -- NULL si es del sistema
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(50),
    color VARCHAR(20),
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Transacciones (Libro Mayor)
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    account_id UUID REFERENCES accounts(id) ON DELETE SET NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    amount NUMERIC(15, 2) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('EXPENSE', 'INCOME', 'TRANSFER')),
    description VARCHAR(255) NOT NULL,
    transaction_date TIMESTAMP WITH TIME ZONE NOT NULL,
    is_recurring BOOLEAN DEFAULT FALSE,
    status VARCHAR(30) DEFAULT 'COMPLETED', -- 'COMPLETED', 'PENDING', 'FLAGGED'
    metadata JSONB, -- Almacena detalles de OCR o división de cuenta
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices de Alto Rendimiento para Consultas Analíticas
CREATE INDEX idx_transactions_user_date ON transactions(user_id, transaction_date DESC);
CREATE INDEX idx_transactions_category ON transactions(user_id, category_id);

-- 5. Presupuestos y Límites
CREATE TABLE budgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    monthly_limit NUMERIC(15, 2) NOT NULL,
    warning_threshold NUMERIC(3, 2) DEFAULT 0.85, -- Alerta al 85%
    period_month INT NOT NULL,
    period_year INT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Metas de Capitalización
CREATE TABLE financial_goals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    target_amount NUMERIC(15, 2) NOT NULL,
    current_amount NUMERIC(15, 2) DEFAULT 0.00,
    deadline DATE,
    category VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Contrato de la API REST (Endpoints Clave)

### Autenticación (`/api/v1/auth`)
- `POST /api/v1/auth/register`: Registro con verificación de credenciales y hashing Argon2id.
- `POST /api/v1/auth/login`: Autenticación con emisión de JWT access token (15 min) y refresh token rotativo en cookie `HttpOnly`.
- `POST /api/v1/auth/oauth/google`: Intercambio de token de Google OAuth.
- `POST /api/v1/auth/passkey/verify`: Autenticación criptográfica FIDO2 / WebAuthn.

### Transacciones (`/api/v1/transactions`)
- `GET /api/v1/transactions`: Lista paginada con filtrado por fecha, categoría y tipo.
- `POST /api/v1/transactions`: Registro de movimiento con conciliación inmediata de saldo en cuenta.
- `GET /api/v1/transactions/summary`: Agregados rápidos de ingresos, egresos y tasa de ahorro.

### Analítica & Salud Financiera (`/api/v1/analytics`)
- `GET /api/v1/analytics/cashflow`: Datos agregados mensuales para gráficos de áreas.
- `GET /api/v1/analytics/categories`: Distribución porcentual por categorías para gráfico donut.
- `GET /api/v1/analytics/ai-insights`: Diagnóstico de tendencias y recomendaciones automáticas de ahorro.

### Procesamiento OCR (`/api/v1/ocr`)
- `POST /api/v1/ocr/scan-receipt`: Subida multipart/form-data de recibo para extracción de comercio, fecha, ítems e importe total.

---

## 4. Medidas de Seguridad & Cumplimiento

1. **Protección de Datos & Cifrado**:
   - TLS 1.3 con HSTS estricto (`max-age=63072000; includeSubDomains; preload`).
   - Cifrado en reposo para tablas críticas utilizando Transparent Data Encryption (TDE) o llaves de aplicación con AES-256-GCM.
2. **Mitigación de Ataques Web**:
   - **XSS**: Sanitización estricta y cabeceras `Content-Security-Policy (CSP)` sin `unsafe-inline`.
   - **SQL Injection**: Uso obligatorio de queries parametrizadas / ORMs seguros con validación de esquemas Zod o DTOs con class-validator.
   - **CSRF**: Tokens sincronizados y uso de cookies `SameSite=Strict`.
   - **Rate Limiting**: Limitador de tasa Redis por IP y por API Key (máx. 100 req/min por usuario regular).
