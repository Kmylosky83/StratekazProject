// Modal Component - Design System
// Sistema completo de modales reutilizables

import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { createPortal } from 'react-dom';
import { Icon } from '../../icons';
import { H3, H4, Text } from '../Typography';
import { Button } from '../Button';
import { base } from '../../tokens/base';
import { overlays } from '../../tokens/overlays';

// Animaciones mejoradas para evitar parpadeo
const fadeIn = keyframes`
  from { 
    opacity: 0; 
    visibility: hidden;
  }
  to { 
    opacity: 1; 
    visibility: visible;
  }
`;

const slideIn = keyframes`
  from { 
    opacity: 0;
    visibility: hidden;
    transform: translateY(20px) scale(0.95);
  }
  to { 
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
  }
`;

const slideOut = keyframes`
  from { 
    opacity: 1;
    visibility: visible;
    transform: translateY(0) scale(1);
  }
  to { 
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px) scale(0.98);
  }
`;

// Overlay de fondo - Optimizado para evitar parpadeo y saltos
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.theme.overlays?.backgrounds?.dark || overlays.backgrounds.dark};
  backdrop-filter: ${props => props.theme.overlays?.backdrop?.medium || overlays.backdrop.medium};
  z-index: ${props => props.theme.base?.zIndex?.modal || props.theme.zIndex?.modal || base.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overscroll-behavior: contain;
  /* Evitar parpadeo inicial */
  opacity: 0;
  visibility: hidden;
  transform: scale(1);
  animation: ${fadeIn} ${props => props.theme.base?.duration?.fast || base.duration.fast} ${props => props.theme.base?.easing?.easeOut || base.easing.easeOut} forwards;
  
  ${props => props.closing && css`
    animation: fadeIn ${props => props.theme.base?.duration?.fast || base.duration.fast} ${props => props.theme.base?.easing?.easeOut || base.easing.easeOut} reverse forwards;
  `}
`;

// Tamaños de modal usando tokens
const modalSizes = {
  xs: css`
    width: ${props => props.theme.overlays?.modalSizes?.xs?.width || overlays.modalSizes.xs.width};
    max-width: ${props => props.theme.overlays?.modalSizes?.xs?.maxWidth || overlays.modalSizes.xs.maxWidth};
  `,
  
  small: css`
    width: ${props => props.theme.overlays?.modalSizes?.sm?.width || overlays.modalSizes.sm.width};
    max-width: ${props => props.theme.overlays?.modalSizes?.sm?.maxWidth || overlays.modalSizes.sm.maxWidth};
  `,
  
  medium: css`
    width: ${props => props.theme.overlays?.modalSizes?.md?.width || overlays.modalSizes.md.width};
    max-width: ${props => props.theme.overlays?.modalSizes?.md?.maxWidth || overlays.modalSizes.md.maxWidth};
  `,
  
  large: css`
    width: ${props => props.theme.overlays?.modalSizes?.lg?.width || overlays.modalSizes.lg.width};
    max-width: ${props => props.theme.overlays?.modalSizes?.lg?.maxWidth || overlays.modalSizes.lg.maxWidth};
  `,
  
  xl: css`
    width: ${props => props.theme.overlays?.modalSizes?.xl?.width || overlays.modalSizes.xl.width};
    max-width: ${props => props.theme.overlays?.modalSizes?.xl?.maxWidth || overlays.modalSizes.xl.maxWidth};
  `,
  
  full: css`
    width: ${props => props.theme.overlays?.modalSizes?.full?.width || overlays.modalSizes.full.width};
    height: ${props => props.theme.overlays?.modalSizes?.full?.height || overlays.modalSizes.full.height};
    max-width: ${props => props.theme.overlays?.modalSizes?.full?.maxWidth || overlays.modalSizes.full.maxWidth};
    max-height: ${props => props.theme.overlays?.modalSizes?.full?.maxHeight || overlays.modalSizes.full.maxHeight};
  `
};

// Contenedor del modal - Optimizado para evitar parpadeo
const ModalContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.base?.borderRadius?.large || props.theme.borderRadius?.large || base.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.modal || '0 25px 50px -12px rgba(0, 0, 0, 0.25)'};
  position: relative;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  /* Evitar parpadeo inicial */
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px) scale(0.95);
  animation: ${slideIn} ${props => props.theme.base?.duration?.normal || base.duration.normal} ${props => props.theme.base?.easing?.easeOut || base.easing.easeOut} forwards;
  
  ${props => modalSizes[props.size || 'medium']}
  
  ${props => props.closing && css`
    animation: ${slideOut} ${props => props.theme.base?.duration?.fast || base.duration.fast} ${props => props.theme.base?.easing?.easeOut || base.easing.easeOut} forwards;
  `}
  
  ${props => props.centered && css`
    text-align: center;
  `}
`;

// Header del modal
const ModalHeader = styled.div`
  padding: ${props => props.theme.spacing.s6} ${props => props.theme.spacing.s6} 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: ${props => props.noBorder ? 'none' : `1px solid ${props.theme.colors.border}`};
  padding-bottom: ${props => props.noBorder ? '0' : props.theme.spacing.s4};
  margin-bottom: ${props => props.noBorder ? '0' : props.theme.spacing.s4};
  flex-shrink: 0;
`;

const ModalTitle = styled(H3)`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeights.medium}; /* Menos invasivo */
  font-size: 1.5rem; /* Tamaño más moderado */
  line-height: 1.4; /* Mejor legibilidad */
  letter-spacing: -0.01em; /* Espaciado más refinado */
  opacity: 0.95; /* Ligeramente menos intenso */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.muted};
  cursor: pointer;
  padding: ${props => props.theme.spacing.s2};
  border-radius: ${props => props.theme.borderRadius.small};
  transition: ${props => props.theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: ${props => props.theme.colors.hover};
    color: ${props => props.theme.colors.text};
  }
`;

// Body del modal
const ModalBody = styled.div`
  padding: 0 ${props => props.theme.spacing.s6};
  flex: 1;
  overflow-y: auto;
  
  ${props => props.noPadding && css`
    padding: 0;
  `}
`;

// Footer del modal
const ModalFooter = styled.div`
  padding: ${props => props.theme.spacing.s4} ${props => props.theme.spacing.s6} ${props => props.theme.spacing.s6};
  border-top: ${props => props.noBorder ? 'none' : `1px solid ${props.theme.colors.border}`};
  display: flex;
  gap: ${props => props.theme.spacing.s3};
  justify-content: ${props => props.align || 'flex-end'};
  flex-shrink: 0;
  
  ${props => props.centered && css`
    justify-content: center;
  `}
  
  ${props => props.spaceBetween && css`
    justify-content: space-between;
  `}
`;

// Hook para manejar el escape key
const useEscapeKey = (onClose) => {
  useEffect(() => {
    if (!onClose) return;
    
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);
};

// Hook para bloquear scroll del body mejorado - sin saltos
const useBodyScrollLock = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      const body = document.body;
      const html = document.documentElement;
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      
      // Guardar estilos originales
      const originalBodyOverflow = body.style.overflow;
      const originalBodyPaddingRight = body.style.paddingRight;
      const originalHtmlOverflow = html.style.overflow;
      
      // Método más suave: solo overflow hidden sin position fixed
      // Esto evita el salto de la página
      body.style.overflow = 'hidden';
      html.style.overflow = 'hidden';
      
      // Agregar padding solo si hay scrollbar visible
      if (scrollBarWidth > 0) {
        const currentPadding = parseInt(window.getComputedStyle(body).paddingRight, 10) || 0;
        body.style.paddingRight = `${currentPadding + scrollBarWidth}px`;
      }
      
      return () => {
        // Restaurar estilos originales
        body.style.overflow = originalBodyOverflow || '';
        body.style.paddingRight = originalBodyPaddingRight || '';
        html.style.overflow = originalHtmlOverflow || '';
      };
    }
  }, [isOpen]);
};

// Componente Modal principal
export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  centered = false,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className,
  ...props
}) => {
  const [closing, setClosing] = React.useState(false);

  // Hooks
  useBodyScrollLock(isOpen);
  useEscapeKey(closeOnEscape ? onClose : null);

  // Función para cerrar con animación
  const handleClose = () => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 200);
  };

  // Click en overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <ModalOverlay onClick={handleOverlayClick} closing={closing}>
      <ModalContainer 
        size={size} 
        centered={centered} 
        closing={closing}
        className={className}
        {...props}
      >
        {(title || showCloseButton) && (
          <ModalHeader noBorder={!title}>
            {title && <ModalTitle>{title}</ModalTitle>}
            {showCloseButton && (
              <CloseButton onClick={handleClose} aria-label="Cerrar modal">
                <Icon name="x" size={20} />
              </CloseButton>
            )}
          </ModalHeader>
        )}
        {children}
      </ModalContainer>
    </ModalOverlay>
  );

  // Renderizar en portal
  return createPortal(modalContent, document.body);
};

// Componentes de partes del modal
export { ModalBody, ModalFooter };

// Modal de confirmación predefinido
export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirmar acción",
  message = "¿Estás seguro de que deseas continuar?",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "danger",
  ...props
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small" centered {...props}>
      <ModalBody>
        <Text style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {message}
        </Text>
      </ModalBody>
      <ModalFooter centered>
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant={variant} onClick={handleConfirm}>
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

// Modal de alerta predefinido
export const AlertModal = ({
  isOpen,
  onClose,
  title = "Información",
  message,
  buttonText = "Entendido",
  variant = "primary",
  ...props
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="small" centered {...props}>
      <ModalBody>
        <Text style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          {message}
        </Text>
      </ModalBody>
      <ModalFooter centered>
        <Button variant={variant} onClick={onClose}>
          {buttonText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default Modal;