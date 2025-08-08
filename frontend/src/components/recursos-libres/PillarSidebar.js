// PillarSidebar - Menú lateral para navegación de pilares y herramientas
// Implementación profesional con animaciones suaves y design system

import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { X, ChevronRight, Wrench, FileText, Shield, Lightbulb, Factory } from 'lucide-react';
import { Button } from '../../design-system/components';

// Animaciones
const slideInRight = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const fadeInStagger = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const iconPulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

// Styled Components
const SidebarOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: ${props => props.theme.zIndex.modal};
  opacity: ${props => props.$isOpen ? 1 : 0};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 420px;
  max-width: 90vw;
  background: ${props => props.theme.card?.background || props.theme.colors.white};
  box-shadow: ${props => props.theme.shadows.elevated};
  z-index: ${props => props.theme.zIndex.modal + 1};
  transform: translateX(${props => props.$isOpen ? '0' : '100%'});
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${props => props.$isOpen ? slideInRight : 'none'} 0.4s ease-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const SidebarHeader = styled.div`
  padding: ${props => props.theme.spacing.s6};
  border-bottom: 1px solid ${props => props.theme.colors.borderSubtle};
  background: ${props => props.theme.card?.background || props.theme.colors.backgroundLight};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.s3};
`;

const SidebarTitle = styled.h2`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  margin: 0;
`;

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    background: ${props => props.theme.colors.danger};
    color: ${props => props.theme.colors.white};
    border-color: ${props => props.theme.colors.danger};
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const PillarInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s4};
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: ${props => props.theme.borderRadius.large};
  border: 1px solid ${props => props.theme.colors.border};
  margin-top: ${props => props.theme.spacing.s3};
`;

const PillarIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.large};
  color: ${props => props.theme.buttonPrimary?.text || props.theme.colors.white};
  animation: ${iconPulse} 2s ease-in-out infinite;
  box-shadow: ${props => props.theme.shadows.button || '0 4px 12px rgba(0, 0, 0, 0.1)'};
`;

const PillarDetails = styled.div`
  flex: 1;
`;

const PillarName = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  margin: 0 0 ${props => props.theme.spacing.s1} 0;
`;

const PillarDescription = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  margin: 0;
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: ${props => props.theme.spacing.s6};
  overflow-y: auto;
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.surface};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary}30;
    border-radius: 3px;
    
    &:hover {
      background: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary}50;
    }
  }
`;

const ToolsSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.s6};
`;

const SectionTitle = styled.h4`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  margin: 0 0 ${props => props.theme.spacing.s4} 0;
  padding-bottom: ${props => props.theme.spacing.s2};
  border-bottom: 1px solid ${props => props.theme.colors.borderSubtle};
`;

const ToolsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s2};
`;

const ToolCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s4};
  background: ${props => props.theme.card?.background || props.theme.colors.white};
  border: 1px solid ${props => props.theme.card?.border || props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  animation: ${fadeInStagger} 0.5s ease-out;
  animation-delay: ${props => props.$index * 0.1}s;
  animation-fill-mode: both;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: ${props => props.theme.colors.hover};
    transition: left 0.6s ease;
  }
  
  &:hover {
    background: ${props => props.theme.colors.backgroundLight};
    border-color: ${props => props.theme.colors.primary};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.cardHover || props.theme.shadows.card};
    
    &::before {
      left: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ToolIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary}10;
  border-radius: ${props => props.theme.borderRadius.medium};
  color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
  transition: all 0.3s ease;
  
  ${ToolCard}:hover & {
    background: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
    color: ${props => props.theme.buttonPrimary?.text || props.theme.colors.white};
    transform: scale(1.1);
  }
`;

const ToolInfo = styled.div`
  flex: 1;
`;

const ToolName = styled.h5`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  margin: 0 0 ${props => props.theme.spacing.s1} 0;
`;

const ToolDescription = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  margin: 0;
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

const ToolArrow = styled.div`
  color: ${props => props.theme.colors.textMuted};
  transition: all 0.3s ease;
  
  ${ToolCard}:hover & {
    color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
    transform: translateX(4px);
  }
`;

const SidebarFooter = styled.div`
  padding: ${props => props.theme.spacing.s6};
  border-top: 1px solid ${props => props.theme.colors.borderSubtle};
  background: ${props => props.theme.colors.backgroundLight};
`;

const FooterText = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  text-align: center;
  margin: 0 0 ${props => props.theme.spacing.s3} 0;
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

// Configuración de pilares
const PILLAR_CONFIG = {
  iso: {
    name: 'ISO 9001 | 45001 | 14001',
    description: 'Sistemas de Gestión Integrados - Calidad, Seguridad y Ambiente',
    icon: Shield,
    color: '#2563eb'
  },
  sgsst: {
    name: 'SG-SST',
    description: 'Sistema de Gestión de Seguridad y Salud en el Trabajo',
    icon: Factory,
    color: '#dc2626'
  },
  pesv: {
    name: 'PESV',
    description: 'Plan Estratégico de Seguridad Vial',
    icon: Wrench,
    color: '#059669'
  },
  innovation: {
    name: 'Innovación: Transformación Digital',
    description: 'Soluciones tecnológicas para la gestión moderna',
    icon: Lightbulb,
    color: '#7c3aed'
  }
};

const PillarSidebar = ({ 
  isOpen, 
  onClose, 
  selectedPillar, 
  tools = [], 
  onToolSelect 
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setTimeout(() => setIsAnimating(false), 400);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleToolClick = (tool) => {
    if (onToolSelect) {
      onToolSelect(tool);
    }
    onClose();
  };

  const pillarConfig = PILLAR_CONFIG[selectedPillar];
  const IconComponent = pillarConfig?.icon || Wrench;

  if (!isOpen && !isAnimating) return null;

  return (
    <>
      <SidebarOverlay $isOpen={isOpen} onClick={onClose} />
      <SidebarContainer $isOpen={isOpen}>
        <SidebarHeader>
          <HeaderTop>
            <SidebarTitle>Herramientas Disponibles</SidebarTitle>
            <CloseButton onClick={onClose}>
              <X size={20} />
            </CloseButton>
          </HeaderTop>
          
          {pillarConfig && (
            <PillarInfo>
              <PillarIcon>
                <IconComponent size={28} />
              </PillarIcon>
              <PillarDetails>
                <PillarName>{pillarConfig.name}</PillarName>
                <PillarDescription>{pillarConfig.description}</PillarDescription>
              </PillarDetails>
            </PillarInfo>
          )}
        </SidebarHeader>

        <SidebarContent>
          <ToolsSection>
            <SectionTitle>Herramientas Gratuitas</SectionTitle>
            <ToolsList>
              {tools.map((tool, index) => (
                <ToolCard
                  key={tool.id}
                  $index={index}
                  onClick={() => handleToolClick(tool)}
                >
                  <ToolIcon>
                    <FileText size={20} />
                  </ToolIcon>
                  <ToolInfo>
                    <ToolName>{tool.name}</ToolName>
                    <ToolDescription>{tool.description}</ToolDescription>
                  </ToolInfo>
                  <ToolArrow>
                    <ChevronRight size={20} />
                  </ToolArrow>
                </ToolCard>
              ))}
              
              {tools.length === 0 && (
                <ToolCard $index={0}>
                  <ToolIcon>
                    <Wrench size={20} />
                  </ToolIcon>
                  <ToolInfo>
                    <ToolName>Próximamente</ToolName>
                    <ToolDescription>
                      Estamos preparando herramientas increíbles para este pilar
                    </ToolDescription>
                  </ToolInfo>
                </ToolCard>
              )}
            </ToolsList>
          </ToolsSection>
        </SidebarContent>

        <SidebarFooter>
          <FooterText>
            Todas las herramientas incluyen export a PDF y Excel sin límites
          </FooterText>
          <Button 
            variant="outline" 
            size="medium" 
            onClick={onClose}
            style={{ width: '100%' }}
          >
            Cerrar
          </Button>
        </SidebarFooter>
      </SidebarContainer>
    </>
  );
};

export default PillarSidebar;