// Sistema de Iconos - Lucide React
// Iconos estandarizados para todo el proyecto

import {
  // Navegación y UI
  Menu,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  Home,
  Settings,
  Target,
  
  // Usuario y autenticación
  User,
  Users,
  UserCircle,
  LogIn,
  LogOut,
  UserPlus,
  
  // Documentos y archivos
  FileText,
  File,
  Download,
  Upload,
  Clipboard,
  ClipboardList,
  
  // Dashboard y analytics
  BarChart3,
  BarChart2,
  PieChart,
  TrendingUp,
  Activity,
  Database,
  
  // Herramientas
  Wrench,
  Cog,
  GraduationCap,
  BookOpen,
  Presentation,
  
  // Negocios e industria
  Briefcase,
  Building2,
  
  // Comunicación
  Mail,
  MessageCircle,
  Phone,
  
  // Estados y acciones
  Check,
  CheckCircle,
  AlertCircle,
  Info,
  Plus,
  Minus,
  Edit,
  Trash2,
  
  // Industria y certificaciones
  Award,
  Shield,
  Car,
  HardHat,
  Zap,
  Building,
  
  // Multimedia
  Play,
  Pause,
  Camera,
  Image,
  
  // Social
  ExternalLink,
  Share,
  
  // Tiempo
  Clock,
  Calendar,
  
  // Redes sociales (iconos genéricos)
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  MessageCircle as WhatsApp,
  
  // Otros
  Search,
  Filter,
  MoreHorizontal,
  MoreVertical,
  Eye,
  EyeOff,
  Bell,
  Star,
  Heart,
  Bookmark,
  Lock
} from 'lucide-react';

// Iconos personalizados para redes sociales
const XSocialIcon = ({ size = 20, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const TikTokIcon = ({ size = 20, color = 'currentColor', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    {...props}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// Mapeo de iconos por categoría para fácil acceso
export const Icons = {
  // Navegación
  menu: Menu,
  close: X,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronUp: ChevronUp,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  home: Home,
  target: Target,
  
  // Usuario
  user: User,
  users: Users,
  userCircle: UserCircle,
  login: LogIn,
  logout: LogOut,
  userPlus: UserPlus,
  
  // Documentos
  fileText: FileText,
  file: File,
  download: Download,
  upload: Upload,
  clipboard: Clipboard,
  clipboardList: ClipboardList,
  
  // Dashboard
  barChart: BarChart3,
  barChart2: BarChart2,
  pieChart: PieChart,
  trendingUp: TrendingUp,
  activity: Activity,
  database: Database,
  
  // Herramientas
  wrench: Wrench,
  tool: Wrench,  // Usando Wrench como tool
  settings: Cog,
  graduation: GraduationCap,
  book: BookOpen,
  bookOpen: BookOpen,
  presentation: Presentation,
  
  // Negocios
  briefcase: Briefcase,
  
  // Comunicación
  mail: Mail,
  message: MessageCircle,
  phone: Phone,
  
  // Redes sociales
  linkedin: Linkedin,
  twitter: Twitter,
  x: XSocialIcon, // Icono específico de X
  facebook: Facebook,
  instagram: Instagram,
  whatsapp: WhatsApp,
  tiktok: TikTokIcon, // Icono específico de TikTok
  externalLink: ExternalLink,
  
  // Estados
  check: Check,
  checkCircle: CheckCircle,
  xClose: X,
  alert: AlertCircle,
  info: Info,
  plus: Plus,
  minus: Minus,
  edit: Edit,
  trash: Trash2,
  
  // Industria
  award: Award,
  shield: Shield,
  car: Car,
  hardHat: HardHat,
  zap: Zap,
  building: Building,
  
  // Multimedia
  play: Play,
  pause: Pause,
  camera: Camera,
  image: Image,
  
  // Social
  share: Share,
  
  // Tiempo
  clock: Clock,
  calendar: Calendar,
  
  // Otros
  search: Search,
  filter: Filter,
  moreHorizontal: MoreHorizontal,
  moreVertical: MoreVertical,
  eye: Eye,
  eyeOff: EyeOff,
  bell: Bell,
  star: Star,
  heart: Heart,
  bookmark: Bookmark,
  lock: Lock
};

// Componente Icon reutilizable
export const Icon = ({ name, size = 20, color, className, ...props }) => {
  const IconComponent = Icons[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found in Icons collection`);
    return null;
  }
  
  return (
    <IconComponent 
      size={size} 
      color={color}
      className={className}
      {...props}
    />
  );
};

export default Icons;