// PilarModuleTemplate - Template base reutilizable para módulos de pilares
// Proporciona estructura consistente y usa design system correctamente

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Grid, Card_Selection, Button } from '../../../design-system/components';
import { Users } from 'lucide-react';

const ModuleContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const ModuleHeader = styled.div`
  background: ${props => props.theme.colors?.white};
  border: 1px solid ${props => props.theme.colors?.border};
  border-radius: ${props => props.theme.borderRadius?.large};
  padding: ${props => props.theme.spacing?.s8};
  margin-bottom: ${props => props.theme.spacing?.s8};
  text-align: center;
`;

const ModuleTitle = styled.h1`
  color: ${props => props.theme.colors?.text};
  font-size: ${props => props.theme.typography?.fontSizes?.pageTitle};
  font-weight: ${props => props.theme.typography?.fontWeights?.bold};
  margin: 0 0 ${props => props.theme.spacing?.s4} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${props => props.theme.spacing?.s3};
`;

const ModuleDescription = styled.p`
  color: ${props => props.theme.colors?.textMuted};
  font-size: ${props => props.theme.typography?.fontSizes?.large};
  margin: 0 0 ${props => props.theme.spacing?.s6} 0;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.6;
`;

const CustomSection = styled.div`
  margin: ${props => props.theme.spacing?.s6} 0;
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors?.text};
  font-size: ${props => props.theme.typography?.fontSizes?.sectionTitle};
  font-weight: ${props => props.theme.typography?.fontWeights?.semibold};
  margin: ${props => props.theme.spacing?.s8} 0 ${props => props.theme.spacing?.s6} 0;
`;

const ToolsGrid = styled(Grid)`
  margin-bottom: ${props => props.theme.spacing?.s8};
`;

const ComingSoonSection = styled.div`
  background: ${props => props.theme.colors?.gray100};
  border: 2px dashed ${props => props.theme.colors?.border};
  border-radius: ${props => props.theme.borderRadius?.large};
  padding: ${props => props.theme.spacing?.s8};
  text-align: center;
  margin-top: ${props => props.theme.spacing?.s8};
`;

const ComingSoonTitle = styled.h3`
  color: ${props => props.theme.colors?.text};
  font-size: ${props => props.theme.typography?.fontSizes?.cardTitle};
  font-weight: ${props => props.theme.typography?.fontWeights?.semibold};
  margin: 0 0 ${props => props.theme.spacing?.s4} 0;
`;

const ComingSoonDescription = styled.p`
  color: ${props => props.theme.colors?.textMuted};
  margin: 0 0 ${props => props.theme.spacing?.s6} 0;
`;

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing?.s2};
  justify-content: center;
  margin-bottom: ${props => props.theme.spacing?.s6};
`;

const Chip = styled.div`
  background: ${props => props.theme.colors?.white};
  padding: ${props => props.theme.spacing?.s2} ${props => props.theme.spacing?.s4};
  border-radius: 20px;
  font-size: ${props => props.theme.typography?.fontSizes?.small};
  color: ${props => props.theme.colors?.textMuted};
  border: 1px solid ${props => props.theme.colors?.border};
`;

const PilarModuleTemplate = ({
  icon: IconComponent,
  title,
  description,
  customSection,
  availableTools,
  upcomingTools,
  pilarId,
  gridColumns = 3
}) => {
  const navigate = useNavigate();

  const handleToolClick = (tool) => {
    if (tool.available) {
      navigate(`/herramientas/${tool.pillar}/${tool.id}`);
    }
  };

  return (
    <ModuleContainer>
      <ModuleHeader>
        <ModuleTitle>
          <IconComponent size={32} />
          {title}
        </ModuleTitle>
        <ModuleDescription>
          {description}
        </ModuleDescription>

        {customSection && (
          <CustomSection>
            {customSection}
          </CustomSection>
        )}
      </ModuleHeader>

      <SectionTitle>
        Herramientas Disponibles ({availableTools.length}/10)
      </SectionTitle>
      
      <ToolsGrid 
        columns={gridColumns} 
        tablet={gridColumns > 2 ? 2 : 1} 
        mobile={1} 
        gap="large"
      >
        {availableTools.map((tool) => {
          const ToolIconComponent = tool.icon;
          return (
            <Card_Selection
              key={tool.id}
              title={tool.title}
              description={tool.description}
              icon={<ToolIconComponent size={32} />}
              selected={false}
              disabled={!tool.available}
              onClick={() => handleToolClick(tool)}
            />
          );
        })}
      </ToolsGrid>

      {upcomingTools && upcomingTools.length > 0 && (
        <ComingSoonSection>
          <ComingSoonTitle>Próximas Herramientas</ComingSoonTitle>
          <ComingSoonDescription>
            Estamos desarrollando {upcomingTools.length} herramientas adicionales para completar 
            el conjunto de 10 recursos especializados.
          </ComingSoonDescription>
          
          <ChipContainer>
            {upcomingTools.map((tool, index) => (
              <Chip key={index}>
                {tool}
              </Chip>
            ))}
          </ChipContainer>

          <Button
            variant="outline"
            size="medium"
            onClick={() => navigate('/register')}
          >
            <Users size={16} />
            Regístrate para Actualizaciones
          </Button>
        </ComingSoonSection>
      )}
    </ModuleContainer>
  );
};

export default PilarModuleTemplate;