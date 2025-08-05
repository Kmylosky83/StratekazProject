// Form Components - Design System
// Sistema completo de formularios reutilizables

import React from 'react';
import styled, { css } from 'styled-components';
import { Icon } from '../../icons';
import { Text, Small } from '../Typography';

// Contenedor de formulario
export const Form = styled.form`
  width: 100%;
  
  ${props => props.inline && css`
    display: flex;
    align-items: end;
    gap: ${props => props.theme.spacing.s3};
    flex-wrap: wrap;
  `}
`;

// Grupo de campo (field + label + error)
const FieldGroupContainer = styled.div`
  margin-bottom: ${props => props.spacing || props.theme.spacing.s4};
  
  ${props => props.inline && css`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.s3};
    margin-bottom: ${props => props.theme.spacing.s2};
  `}
  
  ${props => props.horizontal && css`
    display: grid;
    grid-template-columns: ${props.labelWidth || '150px'} 1fr;
    gap: ${props => props.theme.spacing.s3};
    align-items: start;
    
    @media (max-width: ${props => props.theme.breakpoints.mobile}) {
      grid-template-columns: 1fr;
    }
  `}
`;

export const FormGroup = ({ children, ...props }) => (
  <FieldGroupContainer {...props}>
    {children}
  </FieldGroupContainer>
);

// Label
const LabelElement = styled.label`
  display: block;
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  margin-bottom: ${props => props.theme.spacing.s2};
  line-height: 1.4;
  
  ${props => props.required && css`
    &::after {
      content: ' *';
      color: ${props => props.theme.colors.danger || '#dc3545'};
    }
  `}
  
  ${props => props.inline && css`
    margin-bottom: 0;
    margin-right: ${props => props.theme.spacing.s2};
  `}
  
  ${props => props.disabled && css`
    color: ${props => props.theme.colors.muted};
    cursor: not-allowed;
  `}
`;

export const Label = ({ children, required, ...props }) => (
  <LabelElement required={required} {...props}>
    {children}
  </LabelElement>
);

// Estados de input
const inputStates = {
  default: css`
    border-color: ${props => props.theme.colors.border};
    
    &:focus {
      border-color: ${props => props.theme.colors.primary};
      box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
    }
  `,
  
  error: css`
    border-color: ${props => props.theme.colors.danger || '#dc3545'};
    
    &:focus {
      border-color: ${props => props.theme.colors.danger || '#dc3545'};
      box-shadow: 0 0 0 3px ${props => props.theme.colors.danger || '#dc3545'}20;
    }
  `,
  
  success: css`
    border-color: ${props => props.theme.colors.success || '#28a745'};
    
    &:focus {
      border-color: ${props => props.theme.colors.success || '#28a745'};
      box-shadow: 0 0 0 3px ${props => props.theme.colors.success || '#28a745'}20;
    }
  `
};

// Tamaños de input
const inputSizes = {
  small: css`
    padding: ${props => props.theme.spacing.s2} ${props => props.theme.spacing.s3};
    font-size: ${props => props.theme.typography.fontSizes.sm};
    min-height: 32px;
  `,
  
  medium: css`
    padding: ${props => props.theme.spacing.s3} ${props => props.theme.spacing.s4};
    font-size: ${props => props.theme.typography.fontSizes.base};
    min-height: 40px;
  `,
  
  large: css`
    padding: ${props => props.theme.spacing.s4} ${props => props.theme.spacing.s5};
    font-size: ${props => props.theme.typography.fontSizes.lg};
    min-height: 48px;
  `
};

// Base para inputs
const InputBase = styled.input`
  width: 100%;
  border: 2px solid;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  transition: ${props => props.theme.transitions.normal};
  outline: none;
  
  /* Aplicar tamaño */
  ${props => inputSizes[props.size || 'medium']}
  
  /* Aplicar estado */
  ${props => inputStates[props.state || 'default']}
  
  &::placeholder {
    color: ${props => props.theme.colors.muted};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.backgroundLight || '#f8f9fa'};
    color: ${props => props.theme.colors.muted};
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  ${props => props.fullWidth && css`
    width: 100%;
  `}
`;

// Input con icono
const InputWithIconContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputIcon = styled.div`
  position: absolute;
  ${props => props.position === 'right' ? 'right' : 'left'}: ${props => props.theme.spacing.s3};
  color: ${props => props.theme.colors.muted};
  pointer-events: none;
  z-index: 1;
`;

const InputWithIconElement = styled(InputBase)`
  ${props => props.iconPosition === 'left' && css`
    padding-left: ${props => props.theme.spacing.s10};
  `}
  
  ${props => props.iconPosition === 'right' && css`
    padding-right: ${props => props.theme.spacing.s10};
  `}
`;

export const Input = ({ icon, iconPosition = 'left', ...props }) => {
  if (icon) {
    return (
      <InputWithIconContainer>
        <InputIcon position={iconPosition}>
          <Icon name={icon} size={16} />
        </InputIcon>
        <InputWithIconElement iconPosition={iconPosition} {...props} />
      </InputWithIconContainer>
    );
  }
  
  return <InputBase {...props} />;
};

// Textarea
export const Textarea = styled.textarea`
  width: 100%;
  border: 2px solid;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  transition: ${props => props.theme.transitions.normal};
  outline: none;
  resize: vertical;
  min-height: 80px;
  
  /* Aplicar tamaño */
  ${props => inputSizes[props.size || 'medium']}
  
  /* Aplicar estado */
  ${props => inputStates[props.state || 'default']}
  
  &::placeholder {
    color: ${props => props.theme.colors.muted};
  }
  
  &:disabled {
    background: ${props => props.theme.colors.backgroundLight || '#f8f9fa'};
    color: ${props => props.theme.colors.muted};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

// Select
export const Select = styled.select`
  width: 100%;
  border: 2px solid;
  border-radius: ${props => props.theme.borderRadius.medium};
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  background: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.text};
  transition: ${props => props.theme.transitions.normal};
  outline: none;
  cursor: pointer;
  
  /* Aplicar tamaño */
  ${props => inputSizes[props.size || 'medium']}
  
  /* Aplicar estado */
  ${props => inputStates[props.state || 'default']}
  
  &:disabled {
    background: ${props => props.theme.colors.backgroundLight || '#f8f9fa'};
    color: ${props => props.theme.colors.muted};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

// Checkbox
const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
  cursor: pointer;
  
  ${props => props.disabled && css`
    cursor: not-allowed;
    opacity: 0.7;
  `}
`;

const CheckboxInput = styled.input`
  width: 18px;
  height: 18px;
  accent-color: ${props => props.theme.colors.primary};
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`;

const CheckboxLabel = styled(Text)`
  cursor: pointer;
  margin: 0;
  font-size: ${props => props.theme.typography.fontSizes.sm};
  
  ${props => props.disabled && css`
    cursor: not-allowed;
    color: ${props => props.theme.colors.muted};
  `}
`;

export const Checkbox = ({ label, disabled, ...props }) => (
  <CheckboxContainer disabled={disabled}>
    <CheckboxInput type="checkbox" disabled={disabled} {...props} />
    {label && <CheckboxLabel disabled={disabled}>{label}</CheckboxLabel>}
  </CheckboxContainer>
);

// Radio
export const Radio = ({ label, disabled, ...props }) => (
  <CheckboxContainer disabled={disabled}>
    <CheckboxInput type="radio" disabled={disabled} {...props} />
    {label && <CheckboxLabel disabled={disabled}>{label}</CheckboxLabel>}
  </CheckboxContainer>
);

// Mensaje de error
export const FieldError = styled(Small)`
  color: ${props => props.theme.colors.danger || '#dc3545'};
  margin-top: ${props => props.theme.spacing.s1};
  display: block;
`;

// Texto de ayuda
export const FieldHelp = styled(Small)`
  color: ${props => props.theme.colors.muted};
  margin-top: ${props => props.theme.spacing.s1};
  display: block;
`;

// Componente completo de campo
export const FormField = ({
  label,
  error,
  help,
  required,
  children,
  horizontal,
  labelWidth,
  ...props
}) => (
  <FormGroup horizontal={horizontal} labelWidth={labelWidth} {...props}>
    {label && (
      <Label required={required} disabled={children?.props?.disabled}>
        {label}
      </Label>
    )}
    <div>
      {children}
      {error && <FieldError>{error}</FieldError>}
      {help && !error && <FieldHelp>{help}</FieldHelp>}
    </div>
  </FormGroup>
);

// Export FormContainer components
export { FormContainer, StepContainer, StepTitle, SelectionGrid } from './FormContainer';

export default Form;