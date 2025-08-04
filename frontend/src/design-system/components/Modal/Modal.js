// Modal Component - Design System
// Sistema completo de modales reutilizables

import React, { useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { createPortal } from 'react-dom';
import { Icon } from '../../icons';
import { H3, H4, Text } from '../Typography';
import { Button } from '../Button';

// Animaciones
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { 
    opacity: 0;
    transform: translate(-50%, -60%) scale(0.9);
  }
  to { 
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const slideOut = keyframes`
  from { 
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to { 
    opacity: 0;
    transform: translate(-50%, -60%) scale(0.9);
  }
`;

// Overlay de fondo
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: ${props => props.theme.zIndex.modal || 1000};
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease-out;
  
  ${props => props.closing && css`
    animation: fadeIn 0.2s ease-out reverse;
  `}
`;

// Tamaños de modal
const modalSizes = {
  xs: css`
    width: 90%;
    max-width: 400px;
  `,
  
  small: css`
    width: 90%;
    max-width: 500px;
  `,
  
  medium: css`
    width: 90%;
    max-width: 600px;
  `,
  
  large: css`
    width: 90%;
    max-width: 800px;
  `,
  
  xl: css`
    width: 90%;
    max-width: 1000px;
  `,
  
  full: css`
    width: 95%;
    height: 95%;
    max-width: none;
    max-height: none;
  `
};

// Contenedor del modal
const ModalContainer = styled.div`
  background: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.borderRadius.large};
  box-shadow: ${props => props.theme.shadows.modal || '0 25px 50px -12px rgba(0, 0, 0, 0.25)'};
  position: relative;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${slideIn} 0.3s ease-out;
  
  ${props => modalSizes[props.size || 'medium']}
  
  ${props => props.closing && css`
    animation: ${slideOut} 0.2s ease-out;
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
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
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

// Hook para bloquear scroll del body
const useBodyScrollLock = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
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