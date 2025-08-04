// Sistema de Diseño - Índice de Componentes
// Punto central de exportación de todos los componentes del design system

// Componentes de Button
export { default as Button } from './Button';

// Componentes de Typography
export { 
  Heading, 
  H1, 
  H2, 
  H3, 
  H4, 
  H5, 
  H6,
  Text,
  Paragraph,
  Span,
  Small
} from './Typography';

// Componentes de Card
export { 
  Card,
  Card_Informativa,
  Card_Selection,
  Card_Stat,
  Card_Action,
  Card_Standard,
  Card_Loading,
  Card_Error,
  Card_Feature,
  Card_Interaccion,
  CardGrid,
  CardBody,
  ToolIcon
} from './Card';

// Componentes de Layout
export { Container, Grid, Row, Col } from './Layout';

// Componentes de Header
export { Header } from './Header';

// HeroSection movido a components/home (no es un componente genérico reutilizable)
// export { HeroSection } from './HeroSection';  // Ahora está en components/home

// Componentes de Footer
export { default as Footer } from './Footer/Footer';

// Componentes de ErrorBoundary
export { default as ErrorBoundary } from './ErrorBoundary/ErrorBoundary';

// Componentes de Section
export { Section, SectionHeader, SectionContent, SectionDivider } from './Section';

// Componentes de Modal
export { Modal, ModalBody, ModalFooter, ConfirmModal, AlertModal } from './Modal/Modal';

// Componentes de Form
export { 
  Form, 
  FormGroup, 
  FormField, 
  Label, 
  Input, 
  Textarea, 
  Select, 
  Checkbox, 
  Radio, 
  FieldError, 
  FieldHelp 
} from './Form/Form';

// Componentes de Logo
export {
  Logo,
  Logo_Custom,
  Logo_Header,
  Logo_Footer,
  Logo_Sidebar,
  Logo_Loading
} from './Logo';

// Componentes de Auth
export {
  Container_Auth,
  Auth_Card,
  Auth_Header,
  Auth_Content,
  Auth_Footer,
  Auth_NavButtons
} from './Auth';