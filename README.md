# NlsPay — Plataforma Analítica & Gestión Financiera Premium

> **"Tu dinero. Tu control."**  
> Plataforma SaaS de alto nivel para analítica de gastos personales, proyecciones de capitalización e inteligencia financiera predictiva con estética oscura inspirada en interfaces fintech institucionales (Stripe, Vercel, Bloomberg Terminal).

---

## 💎 1. Dirección Visual y Diseño UI/UX

- **Estricto Dark Theme**: Fondos negros y azul marino profundo (`#050811`, `#070B14`, `#0D1322`).
- **Acentos y Detalles Ligeros**: Paleta en verde esmeralda brillante (`#10B981`), teal (`#14F195`) y cian (`#06B6D4`), acompañados de resplandores suaves (*ambient glows*) y bordes de alta definición.
- **Glassmorphism Minimalista**: Paneles flotantes con `backdrop-blur-xl`, bordes semitransparentes `border-white/[0.08]` y efectos de interacción táctil.
- **Layout Institucional**: Barra de navegación lateral fija con módulos organizados, cabecera superior con sincronización en vivo y selector multimoneda (COP/USD), y cuadrícula de widgets modulares con generoso espacio visual.

---

## ⚡ 2. Stack Tecnológico

### Frontend (Implementado y Compilado)
- **Framework & Runtime**: React 19 + TypeScript + Vite 8
- **Estilos**: Tailwind CSS 3.4 + Clsx + Tailwind-Merge
- **Componentes & Microinteracciones**: Sistema de diseño basado en principios shadcn/ui con animaciones suaves
- **Iconografía**: Lucide React
- **Analítica Gráfica**: Recharts (Gráficos interactivos de Áreas y Donut)

### Backend (Arquitectura Planeada)
- **Opciones de Servicio**: Node.js / NestJS (TypeScript) o Spring Boot 3 (Java 21)
- **Base de Datos**: PostgreSQL 16 con índices optimizados en transacciones y categorías
- **Seguridad**:
  - Autenticación JWT con rotación de Refresh Tokens en cookies `HttpOnly` y `SameSite=Strict`
  - Hashing seguro de contraseñas con Argon2id / BCrypt
  - Protección activa contra XSS (CSP riguroso) y SQL Injection (ORM tipado Prisma/TypeORM/Hibernate)
  - Soporte Passkeys / WebAuthn (FIDO2)

---

## 📦 3. Módulos y Características Core Desarrolladas

1. **Dashboard Principal (Resumen en <10 Segundos)**
   - **Tarjetas de Balance y Flujo**:
     - Dinero Disponible
     - Ingresos de Octubre
     - Gastos de Octubre (con indicador de reducción eficiente)
     - Ahorro & Capitalización (con cálculo de tasa de ahorro neta)
   - **Evolución Financiera**: Gráfico de doble área gradiente con alternancia entre Comparativa y Curva de Ahorro acumulada.
   - **Distribución por Categorías**: Gráfico Donut de gastos mensuales con desglose porcentual y barras de calibración.

2. **Módulo de Movimientos & Gastos**
   - Modal flotante con selección de tipo (Gasto / Ingreso), importe, descripción, selector inteligente de categorías y subcategorías, método de pago, fecha y switch de gasto recurrente.
   - Actualización en tiempo real del saldo y del libro mayor.

3. **Categorías Inteligentes Contextuales**
   - Jerarquía flexible (Ej: *Alimentación & Gastronomía* › *Domicilios & Delivery*, *Restaurantes & Bares*, *Supermercados*).

4. **IA de Salud Financiera (Diferenciador Institucional)**
   - Algoritmo de detección de anomalías y sugerencias contextuales:
     > *"Has gastado 32% más en domicilios los fines de semana. Si reduces a 8 pedidos mensuales y cocinas 4 días en casa, ahorras $180.000 COP este mes."*
   - Puntuación de salud financiera (Health Score: 885 / 1000).
   - Acciones de 1-clic para activar reglas preventivas de gasto.

5. **Metas de Capitalización & Presupuestos**
   - Metas con barras de progreso gradiente (*MacBook Pro M3 Max: 57% completado*, *Fondo de Emergencia: 82%*).
   - Presupuestos por categoría con alertas visuales de proximidad al límite (amarillo al 80% y rojo al 100%).

6. **Herramientas Avanzadas (Mockups Interactivos)**
   - **Escáner OCR de Recibos**: Zona de drag & drop con animación láser de análisis y extracción instantánea de comercio, IVA e ítems para agregarlos al libro mayor.
   - **Cuentas Compartidas**: Módulo para dividir gastos de viajes y cenas con amigos y generar links de cobro.

7. **Autenticación Premium**
   - Ventana modal moderna con logotipo NlsPay, eslogan *"Tu dinero. Tu control."*, soporte de Google, Apple, Microsoft Entra ID, credenciales y autenticación biométrica Passkey (WebAuthn).

---

## 🚀 4. Puesta en Marcha (Desarrollo Local)

Para ejecutar la aplicación en el entorno local:

```bash
# 1. Instalar dependencias (ya instaladas)
npm run dev
# o en PowerShell de Windows:
npm.cmd run dev
```

Para compilar para producción:

```bash
npm.cmd run build
```

---

## 🏛️ 5. Arquitectura del Backend & Base de Datos
Consulta el archivo [`ARCHITECTURE.md`](./ARCHITECTURE.md) para ver el esquema DDL de PostgreSQL, los endpoints REST de la API y los diagramas de flujo de seguridad.
