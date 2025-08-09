// DiagnosticoISO9001 - Herramienta de diagnóstico ISO 9001:2015
// Template profesional integrado con RecursosLibresLayout y sidebar
// Última actualización: 2025-01-09 - VERSION 3.0 CON SIDEBAR Y LAYOUT

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Award, Activity, AlertTriangle, Users, Target, TrendingUp, CheckCircle, HelpCircle, Home, ClipboardList, Info, X, ChevronRight, ArrowLeft } from 'lucide-react';
import { Button, Card, Grid } from '../../../design-system/components';
import { Text } from '../../../design-system/components/Typography';
import RecursosLibresLayout from '../../../design-system/components/Layout/RecursosLibresLayout';
import ISO9001Sidebar from '../../../components/recursos-libres/ISO9001Sidebar';

// Styled Components para la herramienta
const ToolContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s6};
  max-width: ${props => props.theme.componentMeasures.content?.maxWidth || '1200px'};
  margin: 0 auto;
`;

const ToolHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.s6};
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.s4};
`;

const ToolTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
`;

const ToolTitleText = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.pageTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ToolActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s3};
  flex-wrap: wrap;
`;

const ModuleNavigation = styled(Card)`
  padding: ${props => props.theme.spacing.s4};
`;

const ModuleButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.s2};
`;

const ModuleButton = styled(Button)`
  ${props => props.isActive && `
    background: ${props.theme.colors.primary};
    color: ${props.theme.colors.white};
    border-color: ${props.theme.colors.primary};
  `}
`;

const KPIGrid = styled(Grid)`
  margin-bottom: ${props => props.theme.spacing.s6};
`;

const KPICard = styled(Card)`
  padding: ${props => props.theme.spacing.s6};
  text-align: center;
`;

const KPIValue = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.pageTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.color || props.theme.colors.primary};
  margin: ${props => props.theme.spacing.s2} 0;
  display: block;
`;

const KPILabel = styled(Text)`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  margin: 0;
  display: block;
`;

const ChartCard = styled(Card)`
  padding: ${props => props.theme.spacing.s6};
`;

const ChartTitle = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.s4};
  display: block;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.theme.componentMeasures.card?.minWidth || '200px'}, 1fr));
  gap: ${props => props.theme.spacing.s4};
  margin-top: ${props => props.theme.spacing.s4};
`;

const SectionStatusCard = styled.div`
  background: ${props => props.theme.colors.surfaceSubtle};
  border: 1px solid ${props => props.theme.colors.borderSubtle};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  text-align: center;
  transition: all ${props => props.theme.transitions.fast} ease;

  &:hover {
    box-shadow: ${props => props.theme.shadows.cardHover};
  }
`;

const SectionIcon = styled.div`
  color: ${props => props.color || props.theme.colors.primary};
  margin: 0 auto ${props => props.theme.spacing.s2};
  display: flex;
  justify-content: center;
`;

const SectionName = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
  display: block;
`;

const SectionScore = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.color || props.theme.colors.primary};
  margin: 0;
  display: block;
`;

const DiagnosticSection = styled(Card)`
  padding: ${props => props.theme.spacing.s6};
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${props => props.theme.spacing.s6};
`;

const SectionTitle = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.sectionTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.text};
  margin: 0;
  display: block;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: ${props => props.theme.componentMeasures.progressBar?.height || '8px'};
  background: ${props => props.theme.colors.borderSubtle};
  border-radius: ${props => props.theme.borderRadius.full};
  margin: ${props => props.theme.spacing.s4} 0 ${props => props.theme.spacing.s6} 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: ${props => props.theme.colors.primary};
  border-radius: ${props => props.theme.borderRadius.full};
  width: ${props => props.progress}%;
  transition: width ${props => props.theme.transitions.medium} ease;
`;

const SectionTabsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(${props => props.theme.componentMeasures.card?.minWidth || '200px'}, 1fr));
  gap: ${props => props.theme.spacing.s2};
  margin-bottom: ${props => props.theme.spacing.s6};
`;

const SectionTab = styled(Button)`
  ${props => props.isActive && `
    background: ${props.theme.colors.primary};
    color: ${props.theme.colors.white};
    border-color: ${props.theme.colors.primary};
  `}
  ${props => props.score > 0 && !props.isActive && `
    position: relative;
    &::after {
      content: '${props.score}%';
      position: absolute;
      top: ${props => props.theme.spacing.s1 ? `-${props.theme.spacing.s1}` : '-8px'};
      right: ${props => props.theme.spacing.s1 ? `-${props.theme.spacing.s1}` : '-8px'};
      background: ${props.theme.colors.success};
      color: ${props.theme.colors.white};
      font-size: ${props.theme.typography.fontSizes.note};
      font-weight: ${props.theme.typography.fontWeights.bold};
      padding: ${props.theme.spacing.s1} ${props.theme.spacing.s2};
      border-radius: ${props.theme.borderRadius.full};
      min-width: ${props.theme.componentMeasures.badge?.minWidth || '20px'};
      text-align: center;
    }
  `}
`;

const QuestionWrapper = styled.div`
  background: ${props => props.theme.colors.surfaceSubtle};
  border: 1px solid ${props => props.theme.colors.borderSubtle};
  border-radius: ${props => props.theme.borderRadius.medium};
  padding: ${props => props.theme.spacing.s4};
  margin-bottom: ${props => props.theme.spacing.s4};
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.s4};
`;

const QuestionText = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  color: ${props => props.theme.colors.text};
  margin: 0 0 ${props => props.theme.spacing.s2} 0;
  display: block;
  flex: 1;
`;

const QuestionHelp = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  margin: 0;
  display: block;
`;

const RatingWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
  margin-top: ${props => props.theme.spacing.s3};
  flex-wrap: wrap;
`;

const RatingLabel = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  margin-right: ${props => props.theme.spacing.s4};
  white-space: nowrap;
`;

const RatingButton = styled.button`
  width: ${props => props.theme.componentMeasures.button?.height || '48px'};
  height: ${props => props.theme.componentMeasures.button?.height || '48px'};
  border-radius: ${props => props.theme.borderRadius.medium};
  border: 1px solid ${props => props.$isSelected ? props.theme.colors.primary : props.theme.colors.borderSubtle};
  background: ${props => props.$isSelected ? props.theme.colors.primary : props.theme.colors.surface};
  color: ${props => props.$isSelected ? props.theme.colors.white : props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast} ease;

  &:hover {
    background: ${props => props.$isSelected ? props.theme.colors.primary : props.theme.colors.surfaceSubtle};
    border-color: ${props => props.theme.colors.primary};
  }
`;

const RatingScale = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.note};
  color: ${props => props.theme.colors.textMuted};
  margin-top: ${props => props.theme.spacing.s2};
  display: block;
  width: 100%;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${props => props.theme.spacing.s6};
  gap: ${props => props.theme.spacing.s3};
  flex-wrap: wrap;
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.colors.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${props => props.theme.zIndex.modal};
  padding: ${props => props.theme.spacing.s4};
`;

const ModalContent = styled(Card)`
  width: 100%;
  max-width: ${props => props.theme.componentMeasures.modal?.maxWidth || '600px'};
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.s4};
  border-bottom: 1px solid ${props => props.theme.colors.borderSubtle};
`;

const ModalTitle = styled(Text)`
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin: 0;
`;

const ModalBody = styled.div`
  padding: ${props => props.theme.spacing.s6};
  overflow-y: auto;
  flex: 1;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: ${props => props.theme.spacing.s1};
  border-radius: ${props => props.theme.borderRadius.small};
  color: ${props => props.theme.colors.textMuted};
  transition: all ${props => props.theme.transitions.fast} ease;

  &:hover {
    background: ${props => props.theme.colors.surfaceSubtle};
    color: ${props => props.theme.colors.text};
  }
`;

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

// Preguntas de diagnóstico por sección (mantengo las mismas para consistencia)
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
      weight: 2,
      type: 'scale'
    },
    {
      id: 'pf2',
      question: '¿Se ejecutan auditorías internas planificadas?',
      help: 'Programa de auditorías, criterios, métodos, registros.',
      weight: 1.5,
      type: 'scale'
    },
    {
      id: 'pf3',
      question: '¿La dirección revisa el SGC periódicamente?',
      help: 'Revisiones planificadas con entradas y salidas definidas.',
      weight: 1.5,
      type: 'scale'
    }
  ],
  improvement: [
    {
      id: 'im1',
      question: '¿Se identifican y seleccionan oportunidades de mejora?',
      help: 'Mejora de productos, servicios, procesos y del SGC.',
      weight: 2,
      type: 'scale'
    },
    {
      id: 'im2',
      question: '¿Se gestionan las no conformidades y acciones correctivas?',
      help: 'Identificación, análisis de causas, implementación de acciones.',
      weight: 2,
      type: 'scale'
    },
    {
      id: 'im3',
      question: '¿Existe mejora continua del SGC?',
      help: 'Pertinencia, adecuación y eficacia del sistema.',
      weight: 1.5,
      type: 'scale'
    }
  ]
};

// Sidebar personalizado se maneja en ISO9001Sidebar component

// Componente principal  
const DiagnosticoISO9001 = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState('dashboard');
  const [diagnosticData, setDiagnosticData] = useState({});
  const [currentSection, setCurrentSection] = useState('context');
  const [actionPlans, setActionPlans] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '' });

  // Log para verificar que se está cargando la nueva versión
  useEffect(() => {
    console.log('🚀 Diagnóstico ISO 9001 V3.0 - Layout profesional con sidebar cargado');
    console.log('Active module:', activeModule);
  }, []);

  // Log para cambios de módulo
  useEffect(() => {
    console.log('Módulo cambiado a:', activeModule);
  }, [activeModule]);

  // Cargar datos desde localStorage directamente
  useEffect(() => {
    // LIMPIEZA DE VERSIÓN ANTERIOR - eliminar después de la migración
    if (window.localStorage.getItem('stratekaz_iso_diagnostico-9001')) {
      console.log('🧹 Limpiando datos de versión anterior del diagnóstico ISO 9001');
      window.localStorage.removeItem('stratekaz_iso_diagnostico-9001');
    }
    
    // Cargar datos guardados
    try {
      const savedData = localStorage.getItem('stratekaz_iso_diagnostico-9001_v3');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setDiagnosticData(parsedData.diagnosticData || {});
        setActionPlans(parsedData.actionPlans || []);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);

  // Guardar cambios automáticamente
  useEffect(() => {
    const dataToSave = {
      diagnosticData,
      actionPlans,
      timestamp: new Date().toISOString()
    };
    
    try {
      localStorage.setItem('stratekaz_iso_diagnostico-9001_v3', JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [diagnosticData, actionPlans]);

  // Calcular puntuación por sección
  const calculateSectionScore = (sectionId) => {
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
  };

  // Calcular puntuación global
  const calculateGlobalScore = () => {
    let totalScore = 0;
    Object.entries(ISO_SECTIONS).forEach(([key, section]) => {
      const sectionScore = calculateSectionScore(key);
      totalScore += sectionScore * section.weight;
    });
    return totalScore;
  };

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
            action: `Mejorar: ${q.help}`,
            priority: response === 0 ? 'Alta' : response === 1 ? 'Media' : 'Baja',
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

  // Manejar respuesta del diagnóstico
  const handleResponse = (questionId, value) => {
    setDiagnosticData(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Datos para gráficos
  const getRadarData = () => {
    return Object.entries(ISO_SECTIONS).map(([key, section]) => ({
      section: section.name,
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

  // Manejar navegación del sidebar
  const handleModuleChange = (moduleId) => {
    setActiveModule(moduleId);
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
      <ToolContainer>
        <ToolHeader>
          <ToolTitle>
            <Award size={32} color={theme.colors.primary} />
            <ToolTitleText>Dashboard ISO 9001</ToolTitleText>
          </ToolTitle>
          <ToolActions>
            <Button
              variant="primary"
              size="medium"
              onClick={() => setActiveModule('diagnostic')}
              icon={<ClipboardList size={20} />}
            >
              Iniciar Diagnóstico
            </Button>
          </ToolActions>
        </ToolHeader>

        <KPIGrid columns={3} tablet={2} mobile={1} gap="large">
          <KPICard>
            <Award size={32} color={theme.colors.primary} />
            <KPIValue color={theme.colors.primary}>
              {globalScore.toFixed(1)}%
            </KPIValue>
            <KPILabel>Puntuación Global ISO 9001</KPILabel>
            <Text fontSize="sm" color="textMuted" style={{ marginTop: theme.spacing.s2 }}>
              Nivel de Madurez: {maturityLevel}
            </Text>
          </KPICard>

          <KPICard>
            <Activity size={32} color={theme.colors.info} />
            <KPIValue color={theme.colors.info}>
              {((Object.keys(diagnosticData).length / Object.values(DIAGNOSTIC_QUESTIONS).flat().length) * 100).toFixed(0)}%
            </KPIValue>
            <KPILabel>Progreso del Diagnóstico</KPILabel>
            <Text fontSize="sm" color="textMuted" style={{ marginTop: theme.spacing.s2 }}>
              Preguntas completadas
            </Text>
          </KPICard>

          <KPICard>
            <AlertTriangle size={32} color={theme.colors.warning} />
            <KPIValue color={theme.colors.warning}>
              {actionPlans.filter(a => a.status === 'Pendiente').length}
            </KPIValue>
            <KPILabel>Acciones Pendientes</KPILabel>
            <Text fontSize="sm" color="textMuted" style={{ marginTop: theme.spacing.s2 }}>
              Requieren atención
            </Text>
          </KPICard>
        </KPIGrid>

        <Grid columns={2} tablet={1} mobile={1} gap="large">
          <ChartCard>
            <ChartTitle>Cumplimiento por Sección</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={getRadarData()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="section" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar 
                  name="Puntuación" 
                  dataKey="score" 
                  stroke={theme.colors.primary} 
                  fill={theme.colors.primary} 
                  fillOpacity={0.6} 
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard>
            <ChartTitle>Análisis Comparativo</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getBarData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="puntuación" fill={theme.colors.primary} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        <ChartCard>
          <ChartTitle>Estado del Sistema de Gestión</ChartTitle>
          <SectionGrid>
            {Object.entries(ISO_SECTIONS).map(([key, section]) => {
              const score = calculateSectionScore(key);
              const Icon = section.icon;
              const color = score >= 80 ? theme.colors.success : score >= 60 ? theme.colors.warning : theme.colors.danger;
              
              return (
                <SectionStatusCard key={key}>
                  <SectionIcon color={color}>
                    <Icon size={48} />
                  </SectionIcon>
                  <SectionName>{section.name}</SectionName>
                  <SectionScore color={color}>
                    {score.toFixed(0)}%
                  </SectionScore>
                </SectionStatusCard>
              );
            })}
          </SectionGrid>
        </ChartCard>
      </ToolContainer>
    );
  };

  // Componente Diagnóstico
  const Diagnostic = () => {
    const sections = Object.keys(ISO_SECTIONS);
    const currentSectionIndex = sections.indexOf(currentSection);
    const questions = DIAGNOSTIC_QUESTIONS[currentSection];
    const sectionProgress = (Object.keys(diagnosticData).filter(k => questions.some(q => q.id === k)).length / questions.length) * 100;

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
      <ToolContainer>
        <DiagnosticSection>
          <SectionHeader>
            <SectionTitle>Diagnóstico ISO 9001:2015</SectionTitle>
            <div style={{ display: 'flex', gap: theme.spacing.s2 }}>
              <IconButton
                onClick={() => {
                  setModalContent({
                    title: 'Guía del Diagnóstico',
                    text: 'Complete cada sección evaluando el nivel de cumplimiento de su organización. Use la escala de 0 (No implementado) a 5 (Totalmente implementado y optimizado). El sistema calculará automáticamente su puntuación y generará un plan de acción personalizado.'
                  });
                  setShowModal(true);
                }}
              >
                <HelpCircle size={24} />
              </IconButton>
              <Button
                variant="outline"
                size="medium"
                onClick={() => setActiveModule('dashboard')}
                icon={<Home size={20} />}
              >
                Dashboard
              </Button>
            </div>
          </SectionHeader>

          <div>
            <Text fontSize="sm" color="textMuted" style={{ marginBottom: theme.spacing.s2 }}>
              Progreso de la sección: {sectionProgress.toFixed(0)}%
            </Text>
            <ProgressBar>
              <ProgressFill progress={sectionProgress} />
            </ProgressBar>
          </div>

          <SectionTabsWrapper>
            {sections.map((sectionKey) => {
              const section = ISO_SECTIONS[sectionKey];
              const Icon = section.icon;
              const isActive = currentSection === sectionKey;
              const score = calculateSectionScore(sectionKey);
              
              return (
                <SectionTab
                  key={sectionKey}
                  variant={isActive ? "primary" : "outline"}
                  size="small"
                  onClick={() => setCurrentSection(sectionKey)}
                  isActive={isActive}
                  score={score > 0 ? score.toFixed(0) : 0}
                  icon={<Icon size={16} />}
                >
                  {section.name}
                </SectionTab>
              );
            })}
          </SectionTabsWrapper>

          <div style={{ marginBottom: theme.spacing.s6 }}>
            <Text fontSize="cardTitle" fontWeight="semibold" color="text" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: theme.spacing.s2,
              marginBottom: theme.spacing.s4 
            }}>
              {React.createElement(ISO_SECTIONS[currentSection].icon, { size: 24, color: theme.colors.primary })}
              {ISO_SECTIONS[currentSection].name}
            </Text>

            {questions.map((question, index) => (
              <QuestionWrapper key={question.id}>
                <QuestionHeader>
                  <div style={{ flex: 1 }}>
                    <QuestionText>
                      {index + 1}. {question.question}
                    </QuestionText>
                    <QuestionHelp>{question.help}</QuestionHelp>
                  </div>
                  <IconButton
                    onClick={() => {
                      setModalContent({
                        title: 'Información adicional',
                        text: question.help
                      });
                      setShowModal(true);
                    }}
                  >
                    <Info size={20} />
                  </IconButton>
                </QuestionHeader>

                <RatingWrapper>
                  <RatingLabel>Nivel de cumplimiento:</RatingLabel>
                  {[0, 1, 2, 3, 4, 5].map(value => (
                    <RatingButton
                      key={value}
                      onClick={() => handleResponse(question.id, value)}
                      $isSelected={diagnosticData[question.id] === value}
                    >
                      {value}
                    </RatingButton>
                  ))}
                </RatingWrapper>
                <RatingScale>
                  0 = No implementado | 5 = Totalmente implementado y optimizado
                </RatingScale>
              </QuestionWrapper>
            ))}
          </div>

          <NavigationButtons>
            <Button
              variant="outline"
              onClick={prevSection}
              disabled={currentSectionIndex === 0}
              icon={<ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />}
            >
              Sección anterior
            </Button>

            {currentSectionIndex === sections.length - 1 ? (
              <Button
                variant="primary"
                onClick={generateActionPlan}
                icon={<Target size={16} />}
              >
                Generar Plan de Acción
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={nextSection}
                icon={<ChevronRight size={16} />}
              >
                Siguiente sección
              </Button>
            )}
          </NavigationButtons>
        </DiagnosticSection>
      </ToolContainer>
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

  // Renderizar con sidebar personalizado
  // console.log('🎯 Renderizando diagnóstico ISO 9001 V3.0:');
  // console.log('  - activeModule:', activeModule);
  
  // Crear el sidebar personalizado
  const customSidebarElement = (
    <ISO9001Sidebar 
      isOpen={false}
      onClose={() => {}}
      activeModule={activeModule}
      onModuleChange={handleModuleChange}
    />
  );

  return (
    <RecursosLibresLayout
      pageTitle="Diagnóstico ISO 9001:2015"
      pageSubtitle="Evalúa el cumplimiento de tu Sistema de Gestión de Calidad"
      customSidebar={customSidebarElement}
      renderCustomSidebar={(sidebarProps) => (
        <ISO9001Sidebar 
          {...sidebarProps}
          activeModule={activeModule}
          onModuleChange={handleModuleChange}
        />
      )}
    >
      {renderModule()}

      {/* Modal de ayuda */}
      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>{modalContent.title}</ModalTitle>
              <IconButton onClick={() => setShowModal(false)}>
                <X size={24} />
              </IconButton>
            </ModalHeader>
            <ModalBody>
              <Text color="text">{modalContent.text}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </RecursosLibresLayout>
  );
};

export default DiagnosticoISO9001;