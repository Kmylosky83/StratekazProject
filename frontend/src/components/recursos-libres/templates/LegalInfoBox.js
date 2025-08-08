// LegalInfoBox - Componente para mostrar información legal/normativa
// Usa design system consistente

import React from 'react';
import styled from 'styled-components';

const InfoBox = styled.div`
  background: ${props => {
    // Mapear tipos a colores del theme
    const typeColors = {
      sgsst: props.theme.colors?.danger,
      pesv: props.theme.colors?.secondary,
      iso: props.theme.colors?.info,
      default: props.theme.colors?.primary
    };
    return typeColors[props.type] || typeColors.default;
  }};
  color: ${props => props.theme.colors?.white};
  border-radius: ${props => props.theme.borderRadius?.medium};
  padding: ${props => props.theme.spacing?.s4};
  margin: ${props => props.theme.spacing?.s6} 0;
  text-align: left;
`;

const InfoTitle = styled.h3`
  font-size: ${props => props.theme.typography?.fontSizes?.cardTitle};
  font-weight: ${props => props.theme.typography?.fontWeights?.semibold};
  margin: 0 0 ${props => props.theme.spacing?.s2} 0;
`;

const InfoText = styled.p`
  opacity: 0.95;
  margin: 0;
  font-size: ${props => props.theme.typography?.fontSizes?.base};
  line-height: 1.5;
`;

const LegalInfoBox = ({ type = 'default', title, children }) => {
  return (
    <InfoBox type={type}>
      <InfoTitle>{title}</InfoTitle>
      <InfoText>{children}</InfoText>
    </InfoBox>
  );
};

export default LegalInfoBox;