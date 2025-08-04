// Sistema de Diseño - Tokens para Overlays y Modales
// Valores específicos para componentes que se superponen

export const overlays = {
  // Backgrounds de overlay
  backgrounds: {
    light: 'rgba(255, 255, 255, 0.8)',
    dark: 'rgba(0, 0, 0, 0.6)',
    darker: 'rgba(0, 0, 0, 0.8)',
    primary: 'rgba(236, 38, 143, 0.1)',
    success: 'rgba(40, 167, 69, 0.1)',
    warning: 'rgba(255, 193, 7, 0.1)',
    danger: 'rgba(220, 53, 69, 0.1)'
  },
  
  // Blur effects
  backdrop: {
    none: 'none',
    light: 'blur(2px)',
    medium: 'blur(4px)',
    heavy: 'blur(8px)',
    intense: 'blur(12px)'
  },
  
  // Tamaños de modal
  modalSizes: {
    xs: { width: '90%', maxWidth: '400px' },
    sm: { width: '90%', maxWidth: '500px' },
    md: { width: '90%', maxWidth: '600px' },
    lg: { width: '90%', maxWidth: '800px' },
    xl: { width: '90%', maxWidth: '1000px' },
    full: { width: '95%', height: '95%', maxWidth: 'none', maxHeight: 'none' }
  },
  
  // Iconos de estado (usando Lucide)
  statusIcons: {
    success: 'check-circle',
    error: 'x-circle',
    warning: 'alert-triangle',
    info: 'info',
    question: 'help-circle',
    close: 'x'
  },
  
  // Posiciones de toast/notification
  positions: {
    topLeft: { top: '1rem', left: '1rem' },
    topRight: { top: '1rem', right: '1rem' },
    topCenter: { top: '1rem', left: '50%', transform: 'translateX(-50%)' },
    bottomLeft: { bottom: '1rem', left: '1rem' },
    bottomRight: { bottom: '1rem', right: '1rem' },
    bottomCenter: { bottom: '1rem', left: '50%', transform: 'translateX(-50%)' }
  }
};

export default overlays;