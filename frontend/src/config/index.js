/**
 * Configuración centralizada para la aplicación SaaS
 * Maneja diferentes entornos y configuraciones multi-tenant
 */

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

const config = {
  // API Configuration
  api: {
    baseURL: process.env.REACT_APP_API_URL || (isDevelopment ? 'http://localhost:8000/api' : 'https://api.stratekaz.com/api'),
    timeout: parseInt(process.env.REACT_APP_API_TIMEOUT || '30000'),
    retryAttempts: parseInt(process.env.REACT_APP_API_RETRY_ATTEMPTS || '3'),
  },

  // Authentication
  auth: {
    tokenKey: 'stratekaz_token',
    refreshTokenKey: 'stratekaz_refresh_token',
    userKey: 'stratekaz_user',
    tenantKey: 'stratekaz_tenant',
    tokenExpiry: parseInt(process.env.REACT_APP_TOKEN_EXPIRY || '3600000'), // 1 hour
  },

  // Multi-tenant Configuration
  tenant: {
    headerName: 'X-Tenant-ID',
    subdomainEnabled: process.env.REACT_APP_SUBDOMAIN_ENABLED === 'true',
    defaultTheme: 'light',
  },

  // Application
  app: {
    name: 'StrateKaz',
    version: process.env.REACT_APP_VERSION || '1.0.0',
    environment: process.env.NODE_ENV,
    supportEmail: 'soporte@stratekaz.com',
    companyName: 'StrateKaz SAS',
  },

  // Features Flags
  features: {
    darkMode: process.env.REACT_APP_FEATURE_DARK_MODE !== 'false',
    multiLanguage: process.env.REACT_APP_FEATURE_MULTI_LANGUAGE === 'true',
    analytics: process.env.REACT_APP_FEATURE_ANALYTICS === 'true',
    chat: process.env.REACT_APP_FEATURE_CHAT === 'true',
    notifications: process.env.REACT_APP_FEATURE_NOTIFICATIONS !== 'false',
  },

  // External Services
  services: {
    stripe: {
      publicKey: process.env.REACT_APP_STRIPE_PUBLIC_KEY || '',
    },
    googleAnalytics: {
      trackingId: process.env.REACT_APP_GA_TRACKING_ID || '',
    },
    sentry: {
      dsn: process.env.REACT_APP_SENTRY_DSN || '',
    },
  },

  // Storage
  storage: {
    prefix: 'stratekaz_',
    type: 'localStorage', // or 'sessionStorage'
  },

  // UI Configuration
  ui: {
    defaultLanguage: 'es',
    availableLanguages: ['es', 'en'],
    dateFormat: 'DD/MM/YYYY',
    timeFormat: 'HH:mm',
    currency: 'COP',
    pagination: {
      defaultPageSize: 20,
      pageSizeOptions: [10, 20, 50, 100],
    },
  },

  // Routes
  routes: {
    public: {
      home: '/',
      login: '/login',
      register: '/register',
      portfolio: '/portfolio',
      freeAccess: '/acceso-gratuito',
    },
    private: {
      dashboard: '/dashboard',
      profile: '/profile',
      settings: '/settings',
    },
  },

  // Development Tools
  dev: {
    enableReduxDevTools: isDevelopment,
    enableReactQueryDevTools: isDevelopment,
    logLevel: isDevelopment ? 'debug' : 'error',
  },
};

// Helper functions
export const getApiUrl = (endpoint) => {
  const baseURL = config.api.baseURL;
  return `${baseURL}${endpoint}`;
};

export const getTenantFromSubdomain = () => {
  if (!config.tenant.subdomainEnabled) return null;
  
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  if (parts.length >= 3) {
    return parts[0];
  }
  
  return null;
};

export const getStorageKey = (key) => {
  return `${config.storage.prefix}${key}`;
};

export const isFeatureEnabled = (feature) => {
  return config.features[feature] || false;
};

export default config;