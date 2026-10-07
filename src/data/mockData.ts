import type { Transaction, CategoryStructure, Budget, FinancialGoal, AIInsight, MonthlyCashflow } from '../types';

export const CATEGORIES: CategoryStructure[] = [
  {
    id: 'food',
    name: 'Alimentación & Gastronomía',
    color: '#10B981',
    icon: 'Utensils',
    subcategories: ['Domicilios & Delivery', 'Restaurantes & Bares', 'Supermercados', 'Cafeterías & Snacks']
  },
  {
    id: 'transport',
    name: 'Transporte & Movilidad',
    color: '#06B6D4',
    icon: 'Car',
    subcategories: ['Combustible', 'Uber & Taxi', 'Transporte Público', 'Mantenimiento Vehicular']
  },
  {
    id: 'housing',
    name: 'Vivienda & Servicios',
    color: '#8B5CF6',
    icon: 'Home',
    subcategories: ['Alquiler / Hipoteca', 'Energía & Agua', 'Internet de Alta Velocidad', 'Mantenimiento Hogar']
  },
  {
    id: 'tech',
    name: 'Tecnología & SaaS',
    color: '#3B82F6',
    icon: 'Laptop',
    subcategories: ['Suscripciones Cloud', 'Software Dev & AI', 'Hardware & Gadgets', 'Telefonía']
  },
  {
    id: 'entertainment',
    name: 'Entretenimiento & Ocio',
    color: '#EC4899',
    icon: 'Gamepad2',
    subcategories: ['Streaming (Netflix, Spotify)', 'Eventos & Conciertos', 'Videojuegos', 'Cine']
  },
  {
    id: 'health',
    name: 'Salud & Bienestar',
    color: '#14F195',
    icon: 'HeartPulse',
    subcategories: ['Gimnasio & Deporte', 'Medicina & Farmacia', 'Seguros Médicos', 'Nutrición']
  },
  {
    id: 'education',
    name: 'Educación & Crecimiento',
    color: '#F59E0B',
    icon: 'GraduationCap',
    subcategories: ['Cursos Online & Certificados', 'Libros & Audiolibros', 'Mentorías']
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-001',
    description: 'Rappi Prime - Supermercado Gourmet',
    amount: 145000,
    type: 'expense',
    category: 'Alimentación & Gastronomía',
    subcategory: 'Domicilios & Delivery',
    paymentMethod: 'Tarjeta Débito (NlsPay)',
    date: '2026-10-06T19:40:00Z',
    isRecurring: false,
    status: 'completed',
    merchantIcon: 'ShoppingBag'
  },
  {
    id: 'tx-002',
    description: 'Honorarios Desarrollo Fintech API (Stripe Client)',
    amount: 8500000,
    type: 'income',
    category: 'Tecnología & SaaS',
    subcategory: 'Software Dev & AI',
    paymentMethod: 'Transferencia Bancaria',
    date: '2026-10-05T10:15:00Z',
    isRecurring: true,
    status: 'completed',
    merchantIcon: 'ArrowDownLeft'
  },
  {
    id: 'tx-003',
    description: 'Anthropic Claude Pro & OpenAI API',
    amount: 195000,
    type: 'expense',
    category: 'Tecnología & SaaS',
    subcategory: 'Suscripciones Cloud',
    paymentMethod: 'Visa Platinum •••• 4829',
    date: '2026-10-04T15:20:00Z',
    isRecurring: true,
    status: 'completed',
    merchantIcon: 'Cpu'
  },
  {
    id: 'tx-004',
    description: 'Cena Restaurante Criterión',
    amount: 320000,
    type: 'expense',
    category: 'Alimentación & Gastronomía',
    subcategory: 'Restaurantes & Bares',
    paymentMethod: 'Mastercard Black •••• 9102',
    date: '2026-10-03T21:30:00Z',
    isRecurring: false,
    status: 'completed',
    merchantIcon: 'Utensils'
  },
  {
    id: 'tx-005',
    description: 'Gasolina Estación Primax Premium',
    amount: 160000,
    type: 'expense',
    category: 'Transporte & Movilidad',
    subcategory: 'Combustible',
    paymentMethod: 'Apple Pay',
    date: '2026-10-02T08:45:00Z',
    isRecurring: false,
    status: 'completed',
    merchantIcon: 'Car'
  },
  {
    id: 'tx-006',
    description: 'Rendimientos Inversiones CDT & Index Funds',
    amount: 680000,
    type: 'income',
    category: 'Educación & Crecimiento',
    subcategory: 'Mentorías',
    paymentMethod: 'Transferencia Bancaria',
    date: '2026-10-01T09:00:00Z',
    isRecurring: true,
    status: 'completed',
    merchantIcon: 'TrendingUp'
  },
  {
    id: 'tx-007',
    description: 'Membresía Smart Fit VIP Anual',
    amount: 119900,
    type: 'expense',
    category: 'Salud & Bienestar',
    subcategory: 'Gimnasio & Deporte',
    paymentMethod: 'Tarjeta Débito (NlsPay)',
    date: '2026-09-30T14:00:00Z',
    isRecurring: true,
    status: 'completed',
    merchantIcon: 'HeartPulse'
  },
  {
    id: 'tx-008',
    description: 'Starbucks Reserva - Café de Especialidad',
    amount: 28500,
    type: 'expense',
    category: 'Alimentación & Gastronomía',
    subcategory: 'Cafeterías & Snacks',
    paymentMethod: 'Apple Pay',
    date: '2026-09-29T11:20:00Z',
    isRecurring: false,
    status: 'completed',
    merchantIcon: 'Coffee'
  }
];

export const MONTHLY_CASHFLOW: MonthlyCashflow[] = [
  { month: 'May', ingresos: 7200000, gastos: 3900000, ahorro: 3300000 },
  { month: 'Jun', ingresos: 7500000, gastos: 4100000, ahorro: 3400000 },
  { month: 'Jul', ingresos: 8100000, gastos: 4350000, ahorro: 3750000 },
  { month: 'Ago', ingresos: 7900000, gastos: 3800000, ahorro: 4100000 },
  { month: 'Sep', ingresos: 9400000, gastos: 4600000, ahorro: 4800000 },
  { month: 'Oct', ingresos: 9180000, gastos: 3450000, ahorro: 5730000 },
];

export const CATEGORY_EXPENSE_DISTRIBUTION = [
  { name: 'Alimentación', value: 1250000, color: '#10B981', percentage: 36.2 },
  { name: 'Tecnología & SaaS', value: 680000, color: '#06B6D4', percentage: 19.7 },
  { name: 'Vivienda & Serv.', value: 750000, color: '#8B5CF6', percentage: 21.7 },
  { name: 'Transporte', value: 420000, color: '#3B82F6', percentage: 12.2 },
  { name: 'Salud & Ocio', value: 350000, color: '#EC4899', percentage: 10.2 },
];

export const BUDGETS: Budget[] = [
  {
    id: 'b-1',
    category: 'Alimentación & Domicilios',
    spent: 890000,
    limit: 1100000,
    warningThreshold: 0.8,
    color: '#10B981',
  },
  {
    id: 'b-2',
    category: 'Suscripciones & Cloud',
    spent: 450000,
    limit: 500000,
    warningThreshold: 0.9,
    color: '#06B6D4',
  },
  {
    id: 'b-3',
    category: 'Ocio & Salidas',
    spent: 380000,
    limit: 400000,
    warningThreshold: 0.95,
    color: '#F43F5E',
  },
  {
    id: 'b-4',
    category: 'Transporte & Gasolina',
    spent: 240000,
    limit: 450000,
    warningThreshold: 0.53,
    color: '#3B82F6',
  }
];

export const FINANCIAL_GOALS: FinancialGoal[] = [
  {
    id: 'g-1',
    title: 'MacBook Pro M3 Max (Dev Setup)',
    currentAmount: 8550000,
    targetAmount: 15000000,
    deadline: 'Noviembre 2026',
    category: 'Tecnología',
    color: '#14F195',
  },
  {
    id: 'g-2',
    title: 'Fondo de Emergencia (6 Meses)',
    currentAmount: 24600000,
    targetAmount: 30000000,
    deadline: 'Diciembre 2026',
    category: 'Seguridad Financiera',
    color: '#06B6D4',
  },
  {
    id: 'g-3',
    title: 'Viaje Conferencia Web3 Tokio',
    currentAmount: 4200000,
    targetAmount: 12000000,
    deadline: 'Marzo 2027',
    category: 'Experiencias',
    color: '#A855F7',
  }
];

export const AI_INSIGHTS: AIInsight[] = [
  {
    id: 'ins-1',
    title: 'Pico en Domicilios Detectado',
    metric: '+32% vs mes anterior',
    description: 'Has gastado un 32% más en domicilios los fines de semana respecto a tu media histórica.',
    recommendation: 'Si reduces de 12 a 8 pedidos mensuales y preparas 4 comidas en casa, ahorras aproximadamente $180.000 COP este mes.',
    savingsPotential: 180000,
    badge: 'Optimización de Gastos',
    type: 'warning'
  },
  {
    id: 'ins-2',
    title: 'Eficiencia en Suscripciones SaaS',
    metric: '2 licencias inactivas',
    description: 'Detectamos cargos recurrentes en plataformas cloud con baja utilización en los últimos 45 días.',
    recommendation: 'Pausa tu entorno de staging inactivo para optimizar $94.000 COP netos mensuales.',
    savingsPotential: 94000,
    badge: 'Ahorro Automático',
    type: 'opportunity'
  },
  {
    id: 'ins-3',
    title: 'Capacidad de Inversión Fuerte',
    metric: 'Tasa de Ahorro: 62.4%',
    description: 'Tu ratio de ahorro supera el 60% por tercer mes consecutivo, ubicándote en el 5% superior de disciplina financiera.',
    recommendation: 'Asigna el excedente de $2.200.000 COP directamente a tu meta de Fondo de Emergencia.',
    savingsPotential: 2200000,
    badge: 'Salud Excelente',
    type: 'success'
  }
];

export const SHARED_EXPENSES_MOCK = [
  {
    id: 'se-1',
    title: 'Cena Cumpleaños Andrés',
    total: 480000,
    members: 4,
    yourShare: 120000,
    status: 'Pendiente de cobro (3 pagaron)',
    date: 'Ayer'
  },
  {
    id: 'se-2',
    title: 'Airbnb Fin de Semana Villa de Leyva',
    total: 1600000,
    members: 5,
    yourShare: 320000,
    status: 'Saldado completamente',
    date: '28 Sep'
  }
];
