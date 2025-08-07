// features/auth/index.js
// Export all auth-related components and services

// Pages
export { default as LoginPage } from './pages/LoginPage';
export { default as RegisterPage } from './pages/RegisterPage';

// Components
export { default as LoginForm } from './components/LoginForm';
export { default as RegisterForm } from './components/RegisterForm';
export { default as CompleteProfileForm } from './components/CompleteProfileForm';

// Services
export { default as authService } from './services/authService';

// Hooks
export { default as useAuth } from './hooks/useAuth';