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
  X as XIcon,
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
  
  // Estados
  check: Check,
  checkCircle: CheckCircle,
  x: XIcon,
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
  externalLink: ExternalLink,
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