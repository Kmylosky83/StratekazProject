/**
 * Componente ThemeCustomizer - Personalización de tema en tiempo real
 * Para administradores de tenant
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { 
  Palette, 
  Sun, 
  Moon, 
  Settings, 
  Save, 
  RotateCcw, 
  Eye,
  Sliders
} from 'lucide-react';

import { useTheme } from '../../themes/ThemeProvider';
import { validateColor } from '../../themes/themeUtils';
import { Card_Standard } from '../Card';

// Contenedor principal
const CustomizerContainer = styled.div`
  position: fixed;
  top: 50%;
  right: ${props => props.isOpen ? '0' : '-400px'};
  transform: translateY(-50%);
  width: 400px;
  max-height: 90vh;
  background: ${props => props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.elevated};
  border-radius: ${props => props.theme.borderRadius.large} 0 0 ${props => props.theme.borderRadius.large};
  transition: right ${props => props.theme.transitions.normal};
  z-index: ${props => props.theme.zIndex.modal};
  overflow-y: auto;
`;

// Botón de toggle
const ToggleButton = styled.button`
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  background: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  border-radius: ${props => props.theme.borderRadius.medium} 0 0 ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    background: ${props => props.theme.colors.primaryDark};
    transform: translateY(-50%) scale(1.05);
  }
`;

// Input de color personalizado
const ColorInput = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
  margin-bottom: ${props => props.theme.spacing.s4};
`;

const ColorPreview = styled.div`
  width: 40px;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.color};
  border: 2px solid ${props => props.theme.colors.border};
  cursor: pointer;
`;

const ColorInputField = styled.input`
  flex: 1;
  padding: ${props => props.theme.spacing.s3};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.small};
  font-family: monospace;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
  
  &:invalid {
    border-color: ${props => props.theme.colors.danger};
  }
`;

// Sección del customizer
const Section = styled.div`
  padding: ${props => props.theme.spacing.s6};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.s4} 0;
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
`;

// Toggle switch
const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
`;

const ToggleSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.checked ? props.theme.colors.primary : '#ccc'};
  transition: ${props => props.theme.transitions.normal};
  border-radius: 34px;
  
  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: ${props => props.checked ? '30px' : '4px'};
    bottom: 4px;
    background: white;
    transition: ${props => props.theme.transitions.normal};
    border-radius: 50%;
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  opacity: 0;
  width: 0;
  height: 0;
`;

// Botones de acción
const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s3};
  justify-content: space-between;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: ${props => props.theme.spacing.s3} ${props => props.theme.spacing.s4};
  border: 1px solid ${props => props.variant === 'primary' ? 'transparent' : props.theme.colors.border};
  background: ${props => props.variant === 'primary' ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.variant === 'primary' ? 'white' : props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.medium};
  cursor: pointer;
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  transition: ${props => props.theme.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing.s2};
  
  &:hover {
    background: ${props => 
      props.variant === 'primary' 
        ? props.theme.colors.primaryDark 
        : props.theme.colors.surface
    };
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Presets de colores
const ColorPresets = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${props => props.theme.spacing.s3};
  margin-top: ${props => props.theme.spacing.s4};
`;

const PresetColor = styled.div`
  width: 100%;
  height: 40px;
  border-radius: ${props => props.theme.borderRadius.medium};
  background: ${props => props.color};
  cursor: pointer;
  border: 2px solid ${props => props.selected ? props.theme.colors.primary : 'transparent'};
  transition: ${props => props.theme.transitions.normal};
  
  &:hover {
    transform: scale(1.05);
    border-color: ${props => props.theme.colors.primary};
  }
`;

/**
 * Componente principal ThemeCustomizer
 */
export const ThemeCustomizer = ({ 
  isOpen = false, 
  onToggle, 
  allowedFeatures = ['colors', 'darkMode', 'presets'],
  onSave,
  onReset 
}) => {
  const {
    currentTheme,
    isDarkMode,
    toggleDarkMode,
    updateTenantColors,
    tenantConfig,
    isLoading
  } = useTheme();

  // Estados locales
  const [localColors, setLocalColors] = useState({
    primary: currentTheme.colors.primary,
    secondary: currentTheme.colors.secondary,
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Presets de colores populares
  const colorPresets = [
    { name: 'StrateKaz', primary: '#ec268f', secondary: '#333333' },
    { name: 'Ocean', primary: '#0ea5e9', secondary: '#0f172a' },
    { name: 'Forest', primary: '#10b981', secondary: '#064e3b' },
    { name: 'Sunset', primary: '#f59e0b', secondary: '#92400e' },
    { name: 'Purple', primary: '#8b5cf6', secondary: '#581c87' },
    { name: 'Rose', primary: '#f43f5e', secondary: '#881337' },
    { name: 'Teal', primary: '#14b8a6', secondary: '#134e4a' },
    { name: 'Indigo', primary: '#6366f1', secondary: '#312e81' },
  ];

  // Manejar cambio de color
  const handleColorChange = (colorType, value) => {
    if (validateColor(value)) {
      const newColors = { ...localColors, [colorType]: value };
      setLocalColors(newColors);
      setHasChanges(true);
      
      if (previewMode) {
        updateTenantColors(newColors);
      }
    }
  };

  // Aplicar preset
  const applyPreset = (preset) => {
    setLocalColors({
      primary: preset.primary,
      secondary: preset.secondary,
    });
    setHasChanges(true);
    
    if (previewMode) {
      updateTenantColors({
        primary: preset.primary,
        secondary: preset.secondary,
      });
    }
  };

  // Guardar cambios
  const handleSave = async () => {
    await updateTenantColors(localColors);
    setHasChanges(false);
    if (onSave) onSave(localColors);
  };

  // Resetear cambios
  const handleReset = () => {
    const originalColors = {
      primary: tenantConfig?.primary_color || '#ec268f',
      secondary: tenantConfig?.secondary_color || '#333333',
    };
    setLocalColors(originalColors);
    updateTenantColors(originalColors);
    setHasChanges(false);
    if (onReset) onReset();
  };

  return (
    <CustomizerContainer isOpen={isOpen}>
      <ToggleButton onClick={onToggle}>
        <Settings size={24} />
      </ToggleButton>
      
      <Section>
        <SectionTitle>
          <Palette size={20} />
          Personalización de Tema
        </SectionTitle>
        
        {tenantConfig && (
          <p style={{ 
            fontSize: '0.875rem', 
            color: currentTheme.colors.textMuted,
            margin: '0 0 1rem 0'
          }}>
            Personalizando tema para: <strong>{tenantConfig.name}</strong>
          </p>
        )}
      </Section>

      {allowedFeatures.includes('darkMode') && (
        <Section>
          <SectionTitle>
            {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            Modo Oscuro
          </SectionTitle>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Activar modo oscuro</span>
            <ToggleSwitch>
              <HiddenCheckbox 
                checked={isDarkMode} 
                onChange={toggleDarkMode} 
              />
              <ToggleSlider checked={isDarkMode} />
            </ToggleSwitch>
          </div>
        </Section>
      )}

      {allowedFeatures.includes('colors') && (
        <Section>
          <SectionTitle>
            <Palette size={20} />
            Colores
          </SectionTitle>
          
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span>Vista previa en tiempo real</span>
              <ToggleSwitch>
                <HiddenCheckbox 
                  checked={previewMode} 
                  onChange={(e) => setPreviewMode(e.target.checked)} 
                />
                <ToggleSlider checked={previewMode} />
              </ToggleSwitch>
            </div>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Color Primario
            </label>
            <ColorInput>
              <ColorPreview color={localColors.primary} />
              <ColorInputField
                type="text"
                value={localColors.primary}
                onChange={(e) => handleColorChange('primary', e.target.value)}
                placeholder="#ec268f"
              />
            </ColorInput>
          </div>

          <div>
            <label style={{ 
              display: 'block', 
              marginBottom: '0.5rem',
              fontWeight: '500'
            }}>
              Color Secundario
            </label>
            <ColorInput>
              <ColorPreview color={localColors.secondary} />
              <ColorInputField
                type="text"
                value={localColors.secondary}
                onChange={(e) => handleColorChange('secondary', e.target.value)}
                placeholder="#333333"
              />
            </ColorInput>
          </div>
        </Section>
      )}

      {allowedFeatures.includes('presets') && (
        <Section>
          <SectionTitle>
            <Eye size={20} />
            Presets
          </SectionTitle>
          
          <ColorPresets>
            {colorPresets.map((preset, index) => (
              <PresetColor
                key={index}
                color={preset.primary}
                title={preset.name}
                selected={localColors.primary === preset.primary}
                onClick={() => applyPreset(preset)}
              />
            ))}
          </ColorPresets>
        </Section>
      )}

      <Section>
        <ActionButtons>
          <ActionButton 
            onClick={handleReset}
            disabled={!hasChanges || isLoading}
          >
            <RotateCcw size={16} />
            Resetear
          </ActionButton>
          
          <ActionButton 
            variant="primary"
            onClick={handleSave}
            disabled={!hasChanges || isLoading}
          >
            <Save size={16} />
            {isLoading ? 'Guardando...' : 'Guardar'}
          </ActionButton>
        </ActionButtons>
      </Section>
    </CustomizerContainer>
  );
};

// PropTypes
ThemeCustomizer.propTypes = {
  isOpen: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
  allowedFeatures: PropTypes.arrayOf(PropTypes.oneOf(['colors', 'darkMode', 'presets'])),
  onSave: PropTypes.func,
  onReset: PropTypes.func,
};

export default ThemeCustomizer;