// Diagnóstico ISO 9001:2015 - Herramienta de evaluación de cumplimiento
// Integrado con el sistema de recursos gratuitos de StrateKaz

import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, FileText, AlertTriangle, CheckCircle, Users, Target, TrendingUp, Activity, Award, Clock, Download, Save, ChevronRight, Info, HelpCircle, Home, ClipboardList } from 'lucide-react';

// Styled Components con Design System
const ToolWrapper = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.surface || '#f8f9fa'};
  position: relative;
`;

const LogoContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  img {
    height: 40px;
    width: auto;
  }
`;

const MainContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 80px 20px 40px;
  
  @media (max-width: ${props => props.theme.breakpoints?.tablet || '768px'}) {
    padding: 100px 15px 30px;
  }
`;

const DiagnosticHeader = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.spacing?.s8 || '40px'};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors?.primary || '#ec268f'};
  font-size: ${props => props.theme.typography?.fontSizes?.hero || '2.5rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.bold || '700'};
  margin-bottom: ${props => props.theme.spacing?.s2 || '8px'};
  
  @media (max-width: ${props => props.theme.breakpoints?.mobile || '576px'}) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  font-size: ${props => props.theme.typography?.fontSizes?.base || '1rem'};
  margin-bottom: ${props => props.theme.spacing?.s4 || '16px'};
`;

const ModulesContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing?.s4 || '16px'};
  margin-bottom: ${props => props.theme.spacing?.s6 || '24px'};
  
  @media (max-width: ${props => props.theme.breakpoints?.tablet || '768px'}) {
    flex-direction: column;
  }
`;

const Sidebar = styled.aside`
  width: 280px;
  background: ${props => props.theme.colors?.white || '#ffffff'};
  border-radius: ${props => props.theme.borderRadius?.large || '12px'};
  box-shadow: ${props => props.theme.shadows?.card || '0 2px 8px rgba(0,0,0,0.1)'};
  padding: ${props => props.theme.spacing?.s4 || '16px'};
  height: fit-content;
  position: sticky;
  top: 20px;
  
  @media (max-width: ${props => props.theme.breakpoints?.tablet || '768px'}) {
    width: 100%;
    position: static;
  }
`;

const MainContent = styled.main`
  flex: 1;
  background: ${props => props.theme.colors?.white || '#ffffff'};
  border-radius: ${props => props.theme.borderRadius?.large || '12px'};
  box-shadow: ${props => props.theme.shadows?.card || '0 2px 8px rgba(0,0,0,0.1)'};
  padding: ${props => props.theme.spacing?.s6 || '24px'};
`;

const SectionButton = styled.button`
  width: 100%;
  padding: ${props => props.theme.spacing?.s3 || '12px'};
  margin-bottom: ${props => props.theme.spacing?.s2 || '8px'};
  border: 1px solid ${props => props.active ? props.theme.colors?.primary || '#ec268f' : props.theme.colors?.border || '#e5e7eb'};
  background: ${props => props.active ? props.theme.colors?.primary || '#ec268f' : 'transparent'};
  color: ${props => props.active ? 'white' : props.theme.colors?.text || '#1f2937'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s2 || '8px'};
  font-size: ${props => props.theme.typography?.fontSizes?.sm || '0.875rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.medium || '500'};
  
  &:hover {
    border-color: ${props => props.theme.colors?.primary || '#ec268f'};
    background: ${props => props.active ? props.theme.colors?.primary || '#ec268f' : `${props.theme.colors?.primary || '#ec268f'}10`};
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const QuestionCard = styled.div`
  padding: ${props => props.theme.spacing?.s4 || '16px'};
  margin-bottom: ${props => props.theme.spacing?.s4 || '16px'};
  border: 1px solid ${props => props.theme.colors?.border || '#e5e7eb'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  background: ${props => props.theme.colors?.backgroundLight || '#f9fafb'};
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing?.s3 || '12px'};
`;

const QuestionText = styled.h4`
  color: ${props => props.theme.colors?.text || '#1f2937'};
  font-size: ${props => props.theme.typography?.fontSizes?.base || '1rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.semiBold || '600'};
  flex: 1;
  margin: 0;
`;

const HelpText = styled.p`
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  font-size: ${props => props.theme.typography?.fontSizes?.sm || '0.875rem'};
  margin: ${props => props.theme.spacing?.s2 || '8px'} 0;
`;

const ScoreButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing?.s2 || '8px'};
  margin-top: ${props => props.theme.spacing?.s3 || '12px'};
  flex-wrap: wrap;
`;

const ScoreButton = styled.button`
  width: 48px;
  height: 48px;
  border: 2px solid ${props => props.selected ? props.theme.colors?.primary || '#ec268f' : props.theme.colors?.border || '#e5e7eb'};
  background: ${props => props.selected ? props.theme.colors?.primary || '#ec268f' : 'white'};
  color: ${props => props.selected ? 'white' : props.theme.colors?.text || '#1f2937'};
  border-radius: ${props => props.theme.borderRadius?.small || '6px'};
  cursor: pointer;
  font-weight: ${props => props.theme.typography?.fontWeights?.bold || '700'};
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    border-color: ${props => props.theme.colors?.primary || '#ec268f'};
  }
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${props => props.theme.spacing?.s6 || '24px'};
  padding-top: ${props => props.theme.spacing?.s4 || '16px'};
  border-top: 1px solid ${props => props.theme.colors?.border || '#e5e7eb'};
`;

const NavButton = styled.button`
  padding: ${props => props.theme.spacing?.s3 || '12px'} ${props => props.theme.spacing?.s4 || '16px'};
  border: none;
  background: ${props => props.variant === 'primary' ? props.theme.colors?.primary || '#ec268f' : props.theme.colors?.backgroundLight || '#f3f4f6'};
  color: ${props => props.variant === 'primary' ? 'white' : props.theme.colors?.text || '#1f2937'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  cursor: pointer;
  font-weight: ${props => props.theme.typography?.fontWeights?.medium || '500'};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing?.s2 || '8px'};
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${props => props.theme.spacing?.s4 || '16px'};
  margin-bottom: ${props => props.theme.spacing?.s6 || '24px'};
`;

const MetricCard = styled.div`
  background: ${props => props.theme.colors?.white || '#ffffff'};
  border: 1px solid ${props => props.theme.colors?.border || '#e5e7eb'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  padding: ${props => props.theme.spacing?.s4 || '16px'};
  box-shadow: ${props => props.theme.shadows?.sm || '0 1px 3px rgba(0,0,0,0.1)'};
`;

const MetricHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing?.s2 || '8px'};
`;

const MetricTitle = styled.h3`
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  font-size: ${props => props.theme.typography?.fontSizes?.sm || '0.875rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.medium || '500'};
  margin: 0;
`;

const MetricValue = styled.div`
  font-size: ${props => props.theme.typography?.fontSizes?.hero || '2.5rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.bold || '700'};
  color: ${props => props.color || props.theme.colors?.primary || '#ec268f'};
`;

const MetricLabel = styled.p`
  color: ${props => props.theme.colors?.textMuted || '#6b7280'};
  font-size: ${props => props.theme.typography?.fontSizes?.sm || '0.875rem'};
  margin: ${props => props.theme.spacing?.s1 || '4px'} 0 0;
`;

const ChartContainer = styled.div`
  background: ${props => props.theme.colors?.white || '#ffffff'};
  border: 1px solid ${props => props.theme.colors?.border || '#e5e7eb'};
  border-radius: ${props => props.theme.borderRadius?.medium || '8px'};
  padding: ${props => props.theme.spacing?.s4 || '16px'};
  margin-bottom: ${props => props.theme.spacing?.s4 || '16px'};
  box-shadow: ${props => props.theme.shadows?.sm || '0 1px 3px rgba(0,0,0,0.1)'};
`;

const ChartTitle = styled.h3`
  color: ${props => props.theme.colors?.text || '#1f2937'};
  font-size: ${props => props.theme.typography?.fontSizes?.cardTitle || '1.25rem'};
  font-weight: ${props => props.theme.typography?.fontWeights?.semiBold || '600'};
  margin: 0 0 ${props => props.theme.spacing?.s4 || '16px'};
`;

// Configuración de colores
const COLORS = {
  primary: '#ec268f',
  secondary: '#000000',
  accent: '#f4ec25',
  background: '#f8f9fa',
  cardBg: '#ffffff',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
  info: '#3b82f6'
};

// Estructura de secciones ISO 9001:2015
const ISO_SECTIONS = {
  context: { id: 'context', name: 'Contexto de la Organización', weight: 0.15, icon: Users },
  leadership: { id: 'leadership', name: 'Liderazgo', weight: 0.20, icon: Award },
  planning: { id: 'planning', name: 'Planificación', weight: 0.15, icon: Target },
  support: { id: 'support', name: 'Apoyo', weight: 0.15, icon: Users },
  operation: { id: 'operation', name: 'Operación', weight: 0.25, icon: Activity },
  performance: { id: 'performance', name: 'Evaluación del Desempeño', weight: 0.05, icon: TrendingUp },
  improvement: { id: 'improvement', name: 'Mejora', weight: 0.05, icon: CheckCircle }
};

// Preguntas de diagnóstico por sección
const DIAGNOSTIC_QUESTIONS = {
  context: [
    {
      id: 'ctx1',
      question: '¿La organización ha determinado las cuestiones externas e internas relevantes para su propósito?',
      help: 'Incluye factores legales, tecnológicos, competitivos, de mercado, culturales, sociales y económicos.',
      weight: 2,
      type: 'scale'
    },
    {
      id: 'ctx2',
      question: '¿Se han identificado las partes interesadas y sus requisitos?',
      help: 'Clientes, proveedores, empleados, accionistas, entidades reguladoras, etc.',
      weight: 2,
      type: 'scale'
    },
    {
      id: 'ctx3',
      question: '¿Está definido el alcance del sistema de gestión de calidad?',
      help: 'Límites y aplicabilidad del SGC considerando productos, servicios y ubicaciones.',
      weight: 1.5,
      type: 'scale'
    }
  ],
  leadership: [
    {
      id: 'ld1',
      question: '¿La alta dirección demuestra liderazgo y compromiso con el SGC?',
      help: 'Asumiendo responsabilidad, asegurando recursos, comunicando la importancia.',
      weight: 2.5,
      type: 'scale'
    },
    {
      id: 'ld2',
      question: '¿Existe una política de calidad establecida y comunicada?',
      help: 'Apropiada al propósito, incluye compromisos de cumplimiento y mejora continua.',
      weight: 2,
      type: 'scale'
    },
    {
      id: 'ld3',
      question: '¿Se han asignado roles, responsabilidades y autoridades?',
      help: 'Claramente definidos, comunicados y entendidos en toda la organización.',
      weight: 1.5,
      type: 'scale'
    }
  ],
  planning: [
    {
      id: 'pl1',
      question: '¿Se han identificado y evaluado los riesgos y oportunidades?',
      help: 'Con acciones planificadas para abordarlos e integradas en los procesos.',
      weight: 2.5,
      type: 'scale'
    },
    {
      id: 'pl2',
      question: '¿Se han establecido objetivos de calidad medibles?',
      help: 'Coherentes con la política, medibles, monitoreados y actualizados.',
      weight: 2,
      type: 'scale'
    },
    {
      id: 'pl3',
      question: '¿Existe planificación de cambios en el SGC?',
      help: 'Considerando propósito, integridad del sistema y disponibilidad de recursos.',
      weight: 1.5,
      type: 'scale'
    }
  ],
  support: [
    {
      id: 'sp1',
      question: '¿Se han determinado y proporcionado los recursos necesarios?',
      help: 'Personas, infraestructura, ambiente de trabajo, recursos de seguimiento.',
      weight: 2,
      type: 'scale'
    },
    {
      id: 'sp2',
      question: '¿Existe gestión de competencias del personal?',
      help: 'Determinación de competencias, formación, toma de conciencia.',
      weight: 2,
      type: 'scale'
    },
    {
      id: 'sp3',
      question: '¿Se mantiene información documentada apropiada?',
      help: 'Creación, actualización y control de documentos y registros.',
      weight: 1.5,
      type: 'scale'
    }
  ],
  operation: [
    {
      id: 'op1',
      question: '¿Existe planificación y control operacional de procesos?',
      help: 'Criterios para procesos, control de acuerdo a criterios, información documentada.',
      weight: 3,
      type: 'scale'
    },
    {
      id: 'op2',
      question: '¿Se gestionan adecuadamente los requisitos de productos/servicios?',
      help: 'Comunicación con cliente, determinación y revisión de requisitos.',
      weight: 2.5,
      type: 'scale'
    },
    {
      id: 'op3',
      question: '¿Existe control de procesos, productos y servicios externos?',
      help: 'Evaluación y selección de proveedores, criterios definidos.',
      weight: 2,
      type: 'scale'
    }
  ],
  performance: [
    {
      id: 'pf1',
      question: '¿Se realiza seguimiento, medición, análisis y evaluación?',
      help: 'Qué medir, métodos, cuándo, análisis de resultados.',
      weight: 2.5,
      type: 'scale'
    },
    {
      id: 'pf2',
      question: '¿Se realizan auditorías internas planificadas?',
      help: 'Programa de auditoría, criterios, métodos, informes.',
      weight: 2,
      type: 'scale'
    },
    {
      id: 'pf3',
      question: '¿La dirección revisa el SGC periódicamente?',
      help: 'Revisiones planificadas con entradas y salidas definidas.',
      weight: 2,
      type: 'scale'
    }
  ],
  improvement: [
    {
      id: 'im1',
      question: '¿Se determinan oportunidades de mejora?',
      help: 'Mejora de productos/servicios, prevención de efectos no deseados.',
      weight: 2,
      type: 'scale'
    },
    {
      id: 'im2',
      question: '¿Existe gestión de no conformidades y acciones correctivas?',
      help: 'Reacción, evaluación, acción, revisión de eficacia.',
      weight: 2.5,
      type: 'scale'
    },
    {
      id: 'im3',
      question: '¿Se evidencia mejora continua del SGC?',
      help: 'Pertinencia, adecuación y eficacia del sistema.',
      weight: 1.5,
      type: 'scale'
    }
  ]
};

// Componente principal
const DiagnosticoISO9001 = ({ initialData, onDataChange, pillar, toolId }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [diagnosticData, setDiagnosticData] = useState(initialData?.diagnosticData || {});
  const [currentSection, setCurrentSection] = useState('context');
  const [companyInfo, setCompanyInfo] = useState(initialData?.companyInfo || {
    name: '',
    sector: '',
    size: '',
    contact: ''
  });
  const [actionPlans, setActionPlans] = useState(initialData?.actionPlans || []);

  // Efecto para guardar datos cuando cambien
  useEffect(() => {
    if (onDataChange) {
      const dataToSave = {
        diagnosticData,
        companyInfo,
        actionPlans,
        timestamp: new Date().toISOString()
      };
      onDataChange(dataToSave);
    }
  }, [diagnosticData, companyInfo, actionPlans, onDataChange]);

  // Calcular puntuación por sección
  const calculateSectionScore = useCallback((sectionId) => {
    const questions = DIAGNOSTIC_QUESTIONS[sectionId];
    if (!questions) return 0;

    let totalWeight = 0;
    let weightedScore = 0;

    questions.forEach(q => {
      const response = diagnosticData[q.id];
      if (response !== undefined) {
        totalWeight += q.weight;
        weightedScore += (response / 5) * q.weight;
      }
    });

    return totalWeight > 0 ? (weightedScore / totalWeight) * 100 : 0;
  }, [diagnosticData]);

  // Calcular puntuación global
  const calculateGlobalScore = useCallback(() => {
    let totalScore = 0;
    Object.entries(ISO_SECTIONS).forEach(([key, section]) => {
      const sectionScore = calculateSectionScore(key);
      totalScore += sectionScore * section.weight;
    });
    return totalScore;
  }, [calculateSectionScore]);

  // Generar plan de acción automático
  const generateActionPlan = () => {
    const plans = [];
    Object.entries(ISO_SECTIONS).forEach(([key, section]) => {
      const questions = DIAGNOSTIC_QUESTIONS[key];
      
      questions.forEach(q => {
        const response = diagnosticData[q.id] || 0;
        if (response < 3) {
          plans.push({
            id: `${q.id}_action`,
            section: section.name,
            question: q.question,
            currentScore: response,
            priority: response === 0 ? 'Alta' : response === 1 ? 'Media' : 'Baja',
            action: `Implementar acciones para: ${q.question}`,
            responsible: '',
            deadline: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            status: 'Pendiente'
          });
        }
      });
    });
    
    setActionPlans(plans.sort((a, b) => {
      const priorityOrder = { 'Alta': 0, 'Media': 1, 'Baja': 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }));
  };

  // Datos para gráficos
  const getRadarData = () => {
    return Object.entries(ISO_SECTIONS).map(([key, section]) => ({
      section: section.name.split(' ')[0],
      score: calculateSectionScore(key),
      fullMark: 100
    }));
  };

  const getBarData = () => {
    return Object.entries(ISO_SECTIONS).map(([key, section]) => ({
      name: section.name.split(' ')[0],
      puntuación: calculateSectionScore(key)
    }));
  };

  // Navegación al home
  const handleLogoClick = () => {
    window.location.href = '/';
  };

  // Componente Dashboard
  const Dashboard = () => {
    const globalScore = calculateGlobalScore();
    const maturityLevel = 
      globalScore >= 90 ? 'Optimizado' :
      globalScore >= 75 ? 'Gestionado' :
      globalScore >= 60 ? 'Definido' :
      globalScore >= 40 ? 'Básico' : 'Inicial';

    return (
      <>
        <DashboardGrid>
          <MetricCard>
            <MetricHeader>
              <MetricTitle>Puntuación Global ISO 9001</MetricTitle>
              <Award size={24} style={{ color: COLORS.primary }} />
            </MetricHeader>
            <MetricValue color={COLORS.primary}>
              {globalScore.toFixed(1)}%
            </MetricValue>
            <MetricLabel>Nivel de Madurez: {maturityLevel}</MetricLabel>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <MetricTitle>Progreso del Diagnóstico</MetricTitle>
              <Activity size={24} style={{ color: COLORS.info }} />
            </MetricHeader>
            <MetricValue color={COLORS.info}>
              {((Object.keys(diagnosticData).length / Object.values(DIAGNOSTIC_QUESTIONS).flat().length) * 100).toFixed(0)}%
            </MetricValue>
            <MetricLabel>Preguntas completadas</MetricLabel>
          </MetricCard>

          <MetricCard>
            <MetricHeader>
              <MetricTitle>Acciones Pendientes</MetricTitle>
              <AlertTriangle size={24} style={{ color: COLORS.warning }} />
            </MetricHeader>
            <MetricValue color={COLORS.warning}>
              {actionPlans.filter(a => a.status === 'Pendiente').length}
            </MetricValue>
            <MetricLabel>Requieren atención</MetricLabel>
          </MetricCard>
        </DashboardGrid>

        <ChartContainer>
          <ChartTitle>Cumplimiento por Sección</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={getRadarData()}>
              <PolarGrid />
              <PolarAngleAxis dataKey="section" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar 
                name="Puntuación" 
                dataKey="score" 
                stroke={COLORS.primary} 
                fill={COLORS.primary} 
                fillOpacity={0.6} 
              />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>

        <ChartContainer>
          <ChartTitle>Análisis Comparativo</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={getBarData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="puntuación" fill={COLORS.primary} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </>
    );
  };

  // Componente Diagnóstico
  const Diagnostic = () => {
    const sections = Object.keys(ISO_SECTIONS);
    const currentSectionIndex = sections.indexOf(currentSection);
    const questions = DIAGNOSTIC_QUESTIONS[currentSection];

    const handleResponse = (questionId, value) => {
      setDiagnosticData(prev => ({
        ...prev,
        [questionId]: value
      }));
    };

    const nextSection = () => {
      if (currentSectionIndex < sections.length - 1) {
        setCurrentSection(sections[currentSectionIndex + 1]);
      }
    };

    const prevSection = () => {
      if (currentSectionIndex > 0) {
        setCurrentSection(sections[currentSectionIndex - 1]);
      }
    };

    return (
      <>
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ color: COLORS.primary, marginBottom: '16px' }}>
            {ISO_SECTIONS[currentSection].name}
          </h2>
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>Progreso de la sección</span>
              <span>{((Object.keys(diagnosticData).filter(k => questions.some(q => q.id === k)).length / questions.length) * 100).toFixed(0)}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#e5e7eb', borderRadius: '4px', overflow: 'hidden' }}>
              <div 
                style={{ 
                  width: `${(Object.keys(diagnosticData).filter(k => questions.some(q => q.id === k)).length / questions.length) * 100}%`,
                  height: '100%',
                  background: COLORS.primary,
                  transition: 'width 0.3s ease'
                }}
              />
            </div>
          </div>
        </div>

        {questions.map((question, index) => (
          <QuestionCard key={question.id}>
            <QuestionHeader>
              <QuestionText>
                {index + 1}. {question.question}
              </QuestionText>
            </QuestionHeader>
            <HelpText>{question.help}</HelpText>
            <ScoreButtons>
              <span style={{ marginRight: '16px', fontWeight: '500' }}>Nivel:</span>
              {[0, 1, 2, 3, 4, 5].map(value => (
                <ScoreButton
                  key={value}
                  selected={diagnosticData[question.id] === value}
                  onClick={() => handleResponse(question.id, value)}
                >
                  {value}
                </ScoreButton>
              ))}
            </ScoreButtons>
            <div style={{ marginTop: '8px', fontSize: '0.75rem', color: '#6b7280' }}>
              0 = No implementado | 5 = Totalmente implementado y optimizado
            </div>
          </QuestionCard>
        ))}

        <NavigationButtons>
          <NavButton
            onClick={prevSection}
            disabled={currentSectionIndex === 0}
          >
            <ChevronRight style={{ transform: 'rotate(180deg)' }} size={20} />
            Sección anterior
          </NavButton>

          {currentSectionIndex === sections.length - 1 ? (
            <NavButton
              variant="primary"
              onClick={generateActionPlan}
            >
              Generar Plan de Acción
              <Target size={20} />
            </NavButton>
          ) : (
            <NavButton
              variant="primary"
              onClick={nextSection}
            >
              Siguiente sección
              <ChevronRight size={20} />
            </NavButton>
          )}
        </NavigationButtons>
      </>
    );
  };

  // Renderizar módulo activo
  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'diagnostic':
        return <Diagnostic />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ToolWrapper>
      <LogoContainer onClick={handleLogoClick}>
        <img 
          src="https://i.postimg.cc/KcnFLv8g/logo-png-1.png" 
          alt="StrateKaz Logo"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTUwIDQwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IGZpbGw9IiNlYzI2OGYiIHdpZHRoPSIxNTAiIGhlaWdodD0iNDAiIHJ4PSI4Ii8+PHRleHQgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9ImJvbGQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9Ijc1IiB5PSIyNiI+U3RyYXRlS2F6PC90ZXh0Pjwvc3ZnPg==';
          }}
        />
      </LogoContainer>

      <MainContainer>
        <DiagnosticHeader>
          <Title>Diagnóstico ISO 9001:2015</Title>
          <Subtitle>Evalúa el nivel de cumplimiento de tu Sistema de Gestión de Calidad</Subtitle>
        </DiagnosticHeader>

        <ModulesContainer>
          <Sidebar>
            <h3 style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Navegación</h3>
            
            <SectionButton
              active={activeModule === 'dashboard'}
              onClick={() => setActiveModule('dashboard')}
            >
              <Home size={20} />
              Dashboard
            </SectionButton>

            <SectionButton
              active={activeModule === 'diagnostic'}
              onClick={() => setActiveModule('diagnostic')}
            >
              <ClipboardList size={20} />
              Diagnóstico
            </SectionButton>

            {activeModule === 'diagnostic' && (
              <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
                <h4 style={{ marginBottom: '12px', fontSize: '0.9rem', color: '#6b7280' }}>Secciones ISO</h4>
                {Object.entries(ISO_SECTIONS).map(([key, section]) => {
                  const Icon = section.icon;
                  const score = calculateSectionScore(key);
                  return (
                    <SectionButton
                      key={key}
                      active={currentSection === key}
                      onClick={() => setCurrentSection(key)}
                      style={{ fontSize: '0.85rem', padding: '10px' }}
                    >
                      <Icon size={18} />
                      <span style={{ flex: 1, textAlign: 'left' }}>{section.name}</span>
                      {score > 0 && (
                        <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>
                          {score.toFixed(0)}%
                        </span>
                      )}
                    </SectionButton>
                  );
                })}
              </div>
            )}

            <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
                Herramienta gratuita by StrateKaz
              </p>
            </div>
          </Sidebar>

          <MainContent>
            {renderModule()}
          </MainContent>
        </ModulesContainer>
      </MainContainer>
    </ToolWrapper>
  );
};

export default DiagnosticoISO9001;