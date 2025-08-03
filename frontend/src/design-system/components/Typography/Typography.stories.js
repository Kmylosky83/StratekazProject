// Storybook stories para los componentes de Typography
import React from 'react';
import { H1, H2, H3, Heading, Text, Paragraph } from './index';

// Configuración del story para Headings
export default {
  title: 'Design System/Typography',
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

// Stories para Headings
export const Headings = () => (
  <div>
    <H1 variant="hero">Título Hero (H1)</H1>
    <H2 variant="section">Título de Sección (H2)</H2>
    <H3 variant="card">Título de Tarjeta (H3)</H3>
    
    <hr style={{ margin: '2rem 0' }} />
    
    <Heading variant="heroSubtitle">Subtítulo Hero</Heading>
    <Text variant="sectionSubtitle">Subtítulo de Sección</Text>
    <Text variant="cardSubtitle">Subtítulo de Tarjeta</Text>
  </div>
);

// Stories para Text
export const TextVariants = () => (
  <div>
    <Text variant="base">Texto base - Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
    <Text variant="muted">Texto apagado - Información secundaria que complementa el contenido principal.</Text>
    <Text variant="note">Texto de nota - Información adicional en cursiva para aclaraciones.</Text>
    <Text variant="small">Texto pequeño - Detalles menores y información de apoyo.</Text>
    <Text variant="feature">Texto de característica - Descripción de funcionalidades principales.</Text>
    <Text variant="body">Texto de cuerpo - Contenido principal de párrafos largos.</Text>
  </div>
);

// Tamaños de texto
export const TextSizes = () => (
  <div>
    <Text size="xs">Texto extra pequeño (xs)</Text>
    <Text size="sm">Texto pequeño (sm)</Text>
    <Text size="base">Texto base (base)</Text>
    <Text size="lg">Texto grande (lg)</Text>
    <Text size="xl">Texto extra grande (xl)</Text>
  </div>
);

// Pesos de texto
export const TextWeights = () => (
  <div>
    <Text weight="light">Texto ligero (300)</Text>
    <Text weight="normal">Texto normal (400)</Text>
    <Text weight="medium">Texto medio (500)</Text>
    <Text weight="semibold">Texto semi-bold (600)</Text>
    <Text weight="bold">Texto bold (700)</Text>
  </div>
);

// Ejemplo de hero section
export const HeroExample = () => (
  <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
    <H1 variant="hero" style={{ marginBottom: '1rem' }}>
      Stratek <span style={{ color: '#ec268f' }}>Design System</span>
    </H1>
    <Text variant="heroSubtitle" style={{ marginBottom: '2rem' }}>
      Un sistema de diseño completo para crear experiencias consistentes y escalables
    </Text>
    <Text variant="base">
      Diseñado para equipos de desarrollo que buscan mantener la coherencia visual
      y acelerar el proceso de creación de interfaces.
    </Text>
  </div>
);

// Ejemplo de sección de contenido
export const ContentExample = () => (
  <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
    <H2 variant="section">Acerca de Nuestros Servicios</H2>
    <Text variant="sectionSubtitle" style={{ marginBottom: '2rem' }}>
      Ofrecemos soluciones integrales para el crecimiento de su organización
    </Text>
    
    <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
      <div>
        <H3 variant="card">Consultoría Especializada</H3>
        <Text variant="cardSubtitle" style={{ marginBottom: '1rem' }}>
          Expertos en sistemas de gestión
        </Text>
        <Text variant="body">
          Nuestro equipo de consultores certificados le ayudará a implementar
          sistemas de gestión robustos y eficientes.
        </Text>
      </div>
      
      <div>
        <H3 variant="card">Capacitación Continua</H3>
        <Text variant="cardSubtitle" style={{ marginBottom: '1rem' }}>
          Formación para su equipo
        </Text>
        <Text variant="body">
          Programas de capacitación diseñados para fortalecer las competencias
          de su personal en las últimas metodologías.
        </Text>
      </div>
    </div>
    
    <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
      <Text variant="note">
        Nota: Todos nuestros servicios están respaldados por más de 20 años de experiencia
        en el sector empresarial.
      </Text>
    </div>
  </div>
);

// Jerarquía tipográfica
export const TypographyHierarchy = () => (
  <div style={{ padding: '1rem' }}>
    <H1 variant="hero">Nivel 1 - Hero Title</H1>
    <Text variant="heroSubtitle">Subtítulo del hero para contexto adicional</Text>
    
    <H2 variant="section" style={{ marginTop: '3rem' }}>Nivel 2 - Section Title</H2>
    <Text variant="sectionSubtitle">Subtítulo de sección que explica el contenido</Text>
    
    <H3 variant="card" style={{ marginTop: '2rem' }}>Nivel 3 - Card Title</H3>
    <Text variant="cardSubtitle">Subtítulo de tarjeta más específico</Text>
    
    <Text variant="body" style={{ marginTop: '1rem' }}>
      Este es el texto de cuerpo principal que se usa para párrafos largos y contenido
      extenso. Mantiene una buena legibilidad y espaciado.
    </Text>
    
    <Text variant="base" style={{ marginTop: '1rem' }}>
      Texto base utilizado para contenido general y elementos informativos.
    </Text>
    
    <Text variant="small" style={{ marginTop: '1rem' }}>
      Texto pequeño para detalles, metadata y información secundaria.
    </Text>
  </div>
);

// Responsive typography
export const ResponsiveExample = () => (
  <div style={{ padding: '1rem' }}>
    <div style={{ marginBottom: '2rem' }}>
      <h4>Desktop View</h4>
      <div style={{ border: '2px solid #e0e0e0', padding: '2rem', borderRadius: '8px' }}>
        <H1 variant="hero">Título Responsive</H1>
        <Text variant="heroSubtitle">Se adapta automáticamente al tamaño de pantalla</Text>
      </div>
    </div>
    
    <Text variant="note">
      Los componentes de tipografía incluyen breakpoints responsive automáticos.
      En pantallas pequeñas, los tamaños se reducen proporcionalmente.
    </Text>
  </div>
);