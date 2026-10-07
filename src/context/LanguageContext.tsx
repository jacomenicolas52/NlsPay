import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en' | 'pt';

export interface Translations {
  // Navigation / Sidebar
  navDashboard: string;
  navTransactions: string;
  navAnalytics: string;
  navBudgets: string;
  navAiHealth: string;
  navScanner: string;
  navShared: string;
  navMap: string;
  navLogout: string;

  // Topbar
  greetings: string;
  startDayWith: string;
  searchPlaceholder: string;
  newExpense: string;
  myAccount: string;
  logout: string;

  // Metric Cards
  metricAvailable: string;
  metricIncome: string;
  metricExpense: string;
  metricSavings: string;
  vsLastMonth: string;
  optimalControl: string;
  savingsRate: string;
  goalBadge: string;

  // Cards
  cardsTitle: string;
  addCard: string;
  seeAll: string;
  addCardModalTitle: string;
  initialBalance: string;
  lastFourDigits: string;
  visualStyle: string;
  darkVisa: string;
  lightMastercard: string;
  saveCard: string;
  cancel: string;

  // Quick Actions
  actionTransfer: string;
  actionUtility: string;
  actionTaxes: string;
  actionTransport: string;

  // Statistics Panel
  statTitle: string;
  thisWeek: string;
  thisMonth: string;
  total: string;
  paymentAtStore: string;
  moneyTransaction: string;
  recentMovements: string;
  timeMinsAgo: string;
  timeHourAgo: string;
  timeHoursAgo: string;
  timeDayAgo: string;

  // AI Health Widget
  aiHealthTitle: string;
  aiEngineBadge: string;
  aiSubtitle: string;
  healthScore: string;
  scoreExcellent: string;
  expenseOptimization: string;
  spikeDetected: string;
  deliverySpikeTitle: string;
  deliverySpikeDesc: string;
  recommendationTitle: string;
  recommendationDesc: string;
  activateSavingsRule: string;
  ruleActivated: string;
  savingsPotential: string;
  perMonth: string;

  // Recent Sales Table & Transactions
  recentSalesTitle: string;
  viewAllMovements: string;
  recipientMerchant: string;
  date: string;
  status: string;
  amount: string;
  completed: string;
  pending: string;
  today: string;

  // Modals & Extras
  transferTitle: string;
  recordMovement: string;
  ocrScannerTitle: string;
  ecosystemFooter: string;

  // Auth Screen
  loginTitle: string;
  registerTitle: string;
  loginSubtitle: string;
  registerSubtitle: string;
  fullNamePlaceholder: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  remember30Days: string;
  forgotPassword: string;
  signInBtn: string;
  createAccountBtn: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  terms: string;
  support: string;
  demoAccess: string;
  quantumTitle: string;
  quantumBullet1: string;
  quantumBullet2: string;
  floatingSubtitle: string;
  portalSubtitle: string;

  // Onboarding Screen
  onboardingStep1Title: string;
  onboardingStep1Desc: string;
  onboardingStep2Title: string;
  onboardingStep2Desc: string;
  onboardingStep3Title: string;
  onboardingStep3Desc: string;
  onboardingCta: string;
  onboardingNext: string;
  onboardingBack: string;
  onboardingStepBadge: string;
}

const translationsRecord: Record<Language, Translations> = {
  es: {
    // Navigation
    navDashboard: 'Dashboard Principal',
    navTransactions: 'Módulo de Gastos',
    navAnalytics: 'Centro de Estadísticas',
    navBudgets: 'Metas y Presupuestos',
    navAiHealth: 'IA Salud Financiera',
    navScanner: 'Escáner OCR de Recibos',
    navShared: 'Cuentas Compartidas',
    navMap: 'Mapa de Gastos',
    navLogout: 'Cerrar Sesión',

    // Topbar
    greetings: '¡Hola!',
    startDayWith: 'Comienza tu día con',
    searchPlaceholder: 'Buscar transacciones, comercios...',
    newExpense: 'Nuevo Gasto',
    myAccount: 'Mi cuenta',
    logout: 'Cerrar sesión',

    // Metric Cards
    metricAvailable: 'Dinero Disponible',
    metricIncome: 'Ingresos del Mes',
    metricExpense: 'Gastos del Mes',
    metricSavings: 'Ahorro & Capitalización',
    vsLastMonth: 'vs mes anterior',
    optimalControl: 'control óptimo',
    savingsRate: 'tasa de ahorro neta',
    goalBadge: 'Meta +15%',

    // Cards
    cardsTitle: 'Tarjetas',
    addCard: 'Añadir',
    seeAll: 'Ver todas',
    addCardModalTitle: 'Añadir Nueva Tarjeta',
    initialBalance: 'Saldo inicial ($)',
    lastFourDigits: 'Últimos 4 dígitos',
    visualStyle: 'Estilo visual',
    darkVisa: 'Negra (Visa)',
    lightMastercard: 'Blanca (Mastercard)',
    saveCard: 'Guardar Tarjeta',
    cancel: 'Cancelar',

    // Quick Actions
    actionTransfer: 'Transferir',
    actionUtility: 'Servicios',
    actionTaxes: 'Impuestos',
    actionTransport: 'Transporte',

    // Statistics Panel
    statTitle: 'Estadísticas',
    thisWeek: 'Esta semana',
    thisMonth: 'Este mes',
    total: 'Total',
    paymentAtStore: 'Pagos en comercios',
    moneyTransaction: 'Transferencias',
    recentMovements: 'Movimientos recientes',
    timeMinsAgo: 'hace unos minutos',
    timeHourAgo: 'hace 1 hora',
    timeHoursAgo: 'hace unas horas',
    timeDayAgo: 'hace 1 día',

    // AI Health Widget
    aiHealthTitle: 'IA de Salud Financiera',
    aiEngineBadge: 'NEURAL ENGINE V2',
    aiSubtitle: 'Modelado predictivo de hábitos de consumo y capitalización',
    healthScore: 'PUNTUACIÓN DE SALUD',
    scoreExcellent: 'Excelente',
    expenseOptimization: 'Optimización de Gastos',
    spikeDetected: '+32% vs mes anterior',
    deliverySpikeTitle: 'Pico en Domicilios Detectado',
    deliverySpikeDesc: 'Has gastado un 32% más en domicilios los fines de semana respecto a tu media histórica.',
    recommendationTitle: 'Recomendación Inteligente',
    recommendationDesc: 'Si reduces de 12 a 8 pedidos mensuales y preparas 4 comidas en casa, ahorras aproximadamente $180.000 COP este mes.',
    activateSavingsRule: 'Activar Regla de Ahorro Automático',
    ruleActivated: 'Regla de ahorro activada',
    savingsPotential: 'Potencial de ahorro:',
    perMonth: '/mes',

    // Recent Sales
    recentSalesTitle: 'Movimientos Recientes',
    viewAllMovements: 'Ver todos',
    recipientMerchant: 'Beneficiario / Comercio',
    date: 'Fecha',
    status: 'Estado',
    amount: 'Monto',
    completed: 'Completado',
    pending: 'Pendiente',
    today: 'Hoy',

    // Modals & Extras
    transferTitle: 'Transferir Fondos',
    recordMovement: '+ Registrar Movimiento',
    ocrScannerTitle: 'Escáner OCR de Facturas',
    ecosystemFooter: 'NlsPay Ecosystem • Tu dinero. Tu control.',

    // Auth Screen
    loginTitle: 'Inicia Sesión en NlsPay',
    registerTitle: 'Crea tu Cuenta en NlsPay',
    loginSubtitle: 'Tu ecosistema financiero inteligente y seguro',
    registerSubtitle: 'Regístrate para gestionar tus finanzas con precisión',
    fullNamePlaceholder: 'Nombre completo',
    emailPlaceholder: 'Email o usuario',
    passwordPlaceholder: 'Contraseña',
    remember30Days: 'Recordar 30 días',
    forgotPassword: '¿Olvidaste tu contraseña?',
    signInBtn: 'Iniciar Sesión',
    createAccountBtn: 'Crear Cuenta',
    alreadyHaveAccount: '¿Ya tienes cuenta?',
    dontHaveAccount: '¿No tienes cuenta?',
    terms: 'Términos',
    support: 'Soporte',
    demoAccess: 'Acceso Demo',
    quantumTitle: 'Cifrado Cuántico y Conectividad Analítica',
    quantumBullet1: 'Cifrado Cuántico y Conectividad Analítica',
    quantumBullet2: 'Innovación y Seguridad en un ecosistema premium',
    floatingSubtitle: 'Tu control financiero inteligente',
    portalSubtitle: 'Seguridad Total y Acceso Institucional',

    // Onboarding Screen
    onboardingStep1Title: 'Bienvenido a NlsPay. Tu centro de mando financiero.',
    onboardingStep1Desc: 'No somos una simple hoja de gastos. Somos tu analista personal. Aquí rastrearás tu flujo de caja, proyectarás tus ahorros y tomarás el control total de tu dinero.',
    onboardingStep2Title: 'Decisiones respaldadas por inteligencia.',
    onboardingStep2Desc: 'Nuestra IA evaluará tus patrones de consumo diarios. Te avisaremos de forma proactiva dónde estás gastando de más para que alcances tus presupuestos mucho antes.',
    onboardingStep3Title: 'Tu ecosistema está listo.',
    onboardingStep3Desc: 'El motor analítico está preparado. Solo falta que ingreses tu saldo inicial para comenzar a organizar tu capital institucional.',
    onboardingCta: 'Entrar a mi portal',
    onboardingNext: 'Siguiente paso',
    onboardingBack: 'Atrás',
    onboardingStepBadge: 'Paso',
  },

  en: {
    // Navigation
    navDashboard: 'Main Dashboard',
    navTransactions: 'Expenses Module',
    navAnalytics: 'Statistics Center',
    navBudgets: 'Goals & Budgets',
    navAiHealth: 'Financial Health AI',
    navScanner: 'Receipt OCR Scanner',
    navShared: 'Shared Accounts',
    navMap: 'Expense Map',
    navLogout: 'Log Out',

    // Topbar
    greetings: 'Greetings!',
    startDayWith: 'Start your day with',
    searchPlaceholder: 'Search transactions, merchants...',
    newExpense: 'New Expense',
    myAccount: 'My account',
    logout: 'Log out',

    // Metric Cards
    metricAvailable: 'Available Balance',
    metricIncome: 'Monthly Income',
    metricExpense: 'Monthly Expenses',
    metricSavings: 'Savings & Growth',
    vsLastMonth: 'vs last month',
    optimalControl: 'optimal control',
    savingsRate: 'net savings rate',
    goalBadge: 'Goal +15%',

    // Cards
    cardsTitle: 'Cards',
    addCard: 'Add',
    seeAll: 'See all',
    addCardModalTitle: 'Add New Card',
    initialBalance: 'Initial Balance ($)',
    lastFourDigits: 'Last 4 digits',
    visualStyle: 'Visual Style',
    darkVisa: 'Black (Visa)',
    lightMastercard: 'White (Mastercard)',
    saveCard: 'Save Card',
    cancel: 'Cancel',

    // Quick Actions
    actionTransfer: 'Transfer',
    actionUtility: 'Utilities',
    actionTaxes: 'Taxes',
    actionTransport: 'Transport',

    // Statistics Panel
    statTitle: 'Statistics',
    thisWeek: 'This week',
    thisMonth: 'This month',
    total: 'Total',
    paymentAtStore: 'Store payments',
    moneyTransaction: 'Money transfers',
    recentMovements: 'Recent movements',
    timeMinsAgo: 'a few minutes ago',
    timeHourAgo: '1 hour ago',
    timeHoursAgo: 'a few hours ago',
    timeDayAgo: '1 day ago',

    // AI Health Widget
    aiHealthTitle: 'Financial Health AI',
    aiEngineBadge: 'NEURAL ENGINE V2',
    aiSubtitle: 'Predictive modeling of spending and wealth accumulation',
    healthScore: 'HEALTH SCORE',
    scoreExcellent: 'Excellent',
    expenseOptimization: 'Expense Optimization',
    spikeDetected: '+32% vs last month',
    deliverySpikeTitle: 'Delivery Spike Detected',
    deliverySpikeDesc: 'You spent 32% more on food deliveries on weekends compared to your historical average.',
    recommendationTitle: 'Smart Recommendation',
    recommendationDesc: 'Reducing monthly orders from 12 to 8 and cooking 4 home meals saves around $180,000 COP this month.',
    activateSavingsRule: 'Activate Automatic Savings Rule',
    ruleActivated: 'Savings rule activated',
    savingsPotential: 'Savings potential:',
    perMonth: '/mo',

    // Recent Sales
    recentSalesTitle: 'Recent Transactions',
    viewAllMovements: 'View all',
    recipientMerchant: 'Recipient / Merchant',
    date: 'Date',
    status: 'Status',
    amount: 'Amount',
    completed: 'Completed',
    pending: 'Pending',
    today: 'Today',

    // Modals & Extras
    transferTitle: 'Transfer Funds',
    recordMovement: '+ Record Transaction',
    ocrScannerTitle: 'Receipt OCR Scanner',
    ecosystemFooter: 'NlsPay Ecosystem • Your money. Your control.',

    // Auth Screen
    loginTitle: 'Sign in to NlsPay',
    registerTitle: 'Create your NlsPay Account',
    loginSubtitle: 'Your intelligent and secure financial ecosystem',
    registerSubtitle: 'Sign up to manage your finances with precision',
    fullNamePlaceholder: 'Full name',
    emailPlaceholder: 'Email or username',
    passwordPlaceholder: 'Password',
    remember30Days: 'Remember for 30 days',
    forgotPassword: 'Forgot password?',
    signInBtn: 'Sign In',
    createAccountBtn: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    terms: 'Terms',
    support: 'Support',
    demoAccess: 'Demo Access',
    quantumTitle: 'Quantum Encryption & Analytical Connectivity',
    quantumBullet1: 'Quantum Encryption & Analytical Connectivity',
    quantumBullet2: 'Innovation & Security in a premium ecosystem',
    floatingSubtitle: 'Your smart financial control',
    portalSubtitle: 'Total Security & Institutional Access',

    // Onboarding Screen
    onboardingStep1Title: 'Welcome to NlsPay. Your financial command center.',
    onboardingStep1Desc: 'We are not just an expense spreadsheet. We are your personal analyst. Here you will track your cash flow, project your savings, and take full control of your money.',
    onboardingStep2Title: 'Decisions backed by intelligence.',
    onboardingStep2Desc: 'Our AI will evaluate your daily spending patterns. We will proactively alert you where you are overspending so you reach your budgets much sooner.',
    onboardingStep3Title: 'Your ecosystem is ready.',
    onboardingStep3Desc: 'The analytical engine is ready. All that is left is to enter your initial balance to start organizing your institutional capital.',
    onboardingCta: 'Enter my portal',
    onboardingNext: 'Next step',
    onboardingBack: 'Back',
    onboardingStepBadge: 'Step',
  },

  pt: {
    // Navigation
    navDashboard: 'Painel Principal',
    navTransactions: 'Módulo de Despesas',
    navAnalytics: 'Centro de Estatísticas',
    navBudgets: 'Metas e Orçamentos',
    navAiHealth: 'IA Saúde Financeira',
    navScanner: 'Scanner OCR de Recibos',
    navShared: 'Contas Compartilhadas',
    navMap: 'Mapa de Gastos',
    navLogout: 'Sair da Conta',

    // Topbar
    greetings: 'Olá!',
    startDayWith: 'Comece seu dia com',
    searchPlaceholder: 'Pesquisar transações, estabelecimentos...',
    newExpense: 'Nova Despesa',
    myAccount: 'Minha conta',
    logout: 'Sair',

    // Metric Cards
    metricAvailable: 'Saldo Disponível',
    metricIncome: 'Receitas do Mês',
    metricExpense: 'Despesas do Mês',
    metricSavings: 'Poupança e Capitalização',
    vsLastMonth: 'vs mês anterior',
    optimalControl: 'controle ideal',
    savingsRate: 'taxa líquida de poupança',
    goalBadge: 'Meta +15%',

    // Cards
    cardsTitle: 'Cartões',
    addCard: 'Adicionar',
    seeAll: 'Ver todos',
    addCardModalTitle: 'Adicionar Novo Cartão',
    initialBalance: 'Saldo inicial ($)',
    lastFourDigits: 'Últimos 4 dígitos',
    visualStyle: 'Estilo visual',
    darkVisa: 'Preto (Visa)',
    lightMastercard: 'Branco (Mastercard)',
    saveCard: 'Salvar Cartão',
    cancel: 'Cancelar',

    // Quick Actions
    actionTransfer: 'Transferir',
    actionUtility: 'Serviços',
    actionTaxes: 'Impostos',
    actionTransport: 'Transporte',

    // Statistics Panel
    statTitle: 'Estatísticas',
    thisWeek: 'Esta semana',
    thisMonth: 'Este mês',
    total: 'Total',
    paymentAtStore: 'Pagamentos em lojas',
    moneyTransaction: 'Transferências',
    recentMovements: 'Movimentações recentes',
    timeMinsAgo: 'há alguns minutos',
    timeHourAgo: 'há 1 hora',
    timeHoursAgo: 'há algumas horas',
    timeDayAgo: 'há 1 dia',

    // AI Health Widget
    aiHealthTitle: 'IA de Saúde Financeira',
    aiEngineBadge: 'NEURAL ENGINE V2',
    aiSubtitle: 'Modelagem preditiva de hábitos de consumo e riqueza',
    healthScore: 'PONTUAÇÃO DE SAÚDE',
    scoreExcellent: 'Excelente',
    expenseOptimization: 'Otimização de Despesas',
    spikeDetected: '+32% vs mês anterior',
    deliverySpikeTitle: 'Pico em Delivery Detectado',
    deliverySpikeDesc: 'Você gastou 32% a mais em delivery nos fins de semana em relação à sua média histórica.',
    recommendationTitle: 'Recomendação Inteligente',
    recommendationDesc: 'Reduzir pedidos de 12 para 8 por mês e preparar 4 refeições caseiras economiza cerca de $180.000 COP este mês.',
    activateSavingsRule: 'Ativar Regra de Poupança Automática',
    ruleActivated: 'Regra de poupança ativada',
    savingsPotential: 'Potencial de poupança:',
    perMonth: '/mês',

    // Recent Sales
    recentSalesTitle: 'Movimentações Recentes',
    viewAllMovements: 'Ver todos',
    recipientMerchant: 'Beneficiário / Estabelecimento',
    date: 'Data',
    status: 'Status',
    amount: 'Valor',
    completed: 'Concluído',
    pending: 'Pendente',
    today: 'Hoje',

    // Modals & Extras
    transferTitle: 'Transferir Fundos',
    recordMovement: '+ Registrar Movimentação',
    ocrScannerTitle: 'Scanner OCR de Recibos',
    ecosystemFooter: 'NlsPay Ecosystem • Seu dinheiro. Seu controle.',

    // Auth Screen
    loginTitle: 'Entre no NlsPay',
    registerTitle: 'Crie sua Conta no NlsPay',
    loginSubtitle: 'Seu ecossistema financeiro inteligente e seguro',
    registerSubtitle: 'Cadastre-se para gerenciar suas finanças com precisão',
    fullNamePlaceholder: 'Nome completo',
    emailPlaceholder: 'E-mail ou usuário',
    passwordPlaceholder: 'Senha',
    remember30Days: 'Lembrar por 30 dias',
    forgotPassword: 'Esqueceu a senha?',
    signInBtn: 'Entrar',
    createAccountBtn: 'Criar Conta',
    alreadyHaveAccount: 'Já tem uma conta?',
    dontHaveAccount: 'Não tem uma conta?',
    terms: 'Termos',
    support: 'Suporte',
    demoAccess: 'Acesso Demo',
    quantumTitle: 'Criptografia Quântica e Conectividade Analítica',
    quantumBullet1: 'Criptografia Quântica e Conectividade Analítica',
    quantumBullet2: 'Inovação e Segurança em um ecossistema premium',
    floatingSubtitle: 'Seu controle financeiro inteligente',
    portalSubtitle: 'Segurança Total e Acesso Institucional',

    // Onboarding Screen
    onboardingStep1Title: 'Bem-vindo ao NlsPay. Seu centro de comando financeiro.',
    onboardingStep1Desc: 'Não somos apenas uma planilha de despesas. Somos seu analista pessoal. Aqui você acompanhará seu fluxo de caixa, projetará suas economias e assumirá o controle total do seu dinheiro.',
    onboardingStep2Title: 'Decisões respaldadas por inteligência.',
    onboardingStep2Desc: 'Nossa IA avaliará seus padrões diários de consumo. Avisaremos proativamente onde você está gastando demais para que alcance seus orçamentos muito antes.',
    onboardingStep3Title: 'Seu ecossistema está pronto.',
    onboardingStep3Desc: 'O motor analítico está preparado. Só resta inserir seu saldo inicial para começar a organizar seu capital institucional.',
    onboardingCta: 'Entrar no meu portal',
    onboardingNext: 'Próxima etapa',
    onboardingBack: 'Voltar',
    onboardingStepBadge: 'Etapa',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'es',
  setLanguage: () => {},
  t: translationsRecord.es,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('nlspay_lang');
    if (saved === 'es' || saved === 'en' || saved === 'pt') {
      return saved;
    }
    return 'es';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('nlspay_lang', lang);
  };

  useEffect(() => {
    localStorage.setItem('nlspay_lang', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translationsRecord[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
