// Storybook stories para el componente Button
import React from 'react';
import { Button } from './Button';
import { ArrowRight, Download, Settings } from '../../icons';

// Configuración del story
export default {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'cta', 'text', 'card'],
    },
    size: {
      control: 'select',
      options: ['small', 'regular', 'large', 'cta'],
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
    },
  },
};

// Story por defecto
export const Primary = {
  args: {
    variant: 'primary',
    children: 'Botón Primario',
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    children: 'Botón Secundario',
  },
};

export const CTA = {
  args: {
    variant: 'cta',
    children: '¡Comenzar Ahora!',
  },
};

export const Text = {
  args: {
    variant: 'text',
    children: 'Enlace de Texto',
  },
};

export const Card = {
  args: {
    variant: 'card',
    children: 'Seleccionar',
  },
};

export const CardActive = {
  args: {
    variant: 'card',
    className: 'active',
    children: 'Seleccionado',
  },
};

// Diferentes tamaños
export const Sizes = () => (
  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
    <Button size="small">Pequeño</Button>
    <Button size="regular">Regular</Button>
    <Button size="large">Grande</Button>
    <Button size="cta">CTA</Button>
  </div>
);

// Con iconos
export const WithIcons = () => (
  <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
    <Button variant="primary">
      Continuar <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
    </Button>
    <Button variant="secondary">
      <Download size={16} style={{ marginRight: '0.5rem' }} /> Descargar
    </Button>
    <Button variant="text">
      <Settings size={16} style={{ marginRight: '0.5rem' }} /> Configuración
    </Button>
  </div>
);

// Estados
export const States = () => (
  <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
    <div>
      <h4>Normal</h4>
      <Button variant="primary">Estado Normal</Button>
    </div>
    <div>
      <h4>Deshabilitado</h4>
      <Button variant="primary" disabled>Estado Deshabilitado</Button>
    </div>
    <div>
      <h4>Tarjeta Activa</h4>
      <Button variant="card" className="active">Tarjeta Activa</Button>
    </div>
  </div>
);

// Todas las variantes
export const AllVariants = () => (
  <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
    <Button variant="primary">Primario</Button>
    <Button variant="secondary">Secundario</Button>
    <Button variant="cta">CTA</Button>
    <Button variant="text">Texto</Button>
    <Button variant="card">Tarjeta</Button>
    <Button variant="card" className="active">Tarjeta Activa</Button>
  </div>
);

// Ejemplo de implementación
export const RealExample = () => (
  <div style={{ 
    padding: '2rem', 
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '12px',
    color: 'white'
  }}>
    <h2 style={{ marginBottom: '1rem' }}>¿Listo para comenzar?</h2>
    <p style={{ marginBottom: '2rem', opacity: 0.9 }}>
      Únete a miles de empresas que ya confían en nuestra plataforma
    </p>
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Button variant="cta" size="large">
        Empezar Gratis <ArrowRight size={20} style={{ marginLeft: '0.5rem' }} />
      </Button>
      <Button variant="secondary" size="large">
        Ver Demo
      </Button>
    </div>
  </div>
);