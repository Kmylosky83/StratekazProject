import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, FileText, AlertTriangle, CheckCircle, Users, Target, TrendingUp, Activity, Award, Clock, Download, Save, Play, Pause, ChevronRight, Info, Menu, X, Home, ClipboardList, BarChart3, Settings, HelpCircle } from 'lucide-react';

// Configuración de colores y estilos
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

// Componente principal para integración con ToolContainer
const DiagnosticoISO9001 = ({ initialData, onDataChange, pillar, toolId }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [diagnosticData, setDiagnosticData] = useState({});
  const [currentSection, setCurrentSection] = useState('context');
  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    sector: '',
    size: '',
    contact: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', text: '' });
  const [actionPlans, setActionPlans] = useState([]);

  // Cargar datos iniciales del ToolContainer
  useEffect(() => {
    if (initialData) {
      setDiagnosticData(initialData.diagnosticData || {});
      setCompanyInfo(initialData.companyInfo || {});
      setActionPlans(initialData.actionPlans || []);
    }
  }, [initialData]);

  // Notificar cambios al ToolContainer
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
      const score = calculateSectionScore(key);
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
            status: 'Pendiente',
            responsible: '',
            deadline: ''
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

  const getPieData = () => {
    const completed = Object.keys(diagnosticData).length;
    const total = Object.values(DIAGNOSTIC_QUESTIONS).flat().length;
    return [
      { name: 'Completado', value: completed, color: COLORS.success },
      { name: 'Pendiente', value: total - completed, color: COLORS.warning }
    ];
  };

  // Módulos de navegación
  const modules = [
    { id: 'dashboard', name: 'Dashboard', icon: Home },
    { id: 'diagnostic', name: 'Diagnóstico ISO 9001', icon: ClipboardList },
    { id: 'reports', name: 'Informes y KPIs', icon: BarChart3 },
    { id: 'actions', name: 'Plan de Acción', icon: Target },
    { id: 'settings', name: 'Configuración', icon: Settings }
  ];

  // Componente Dashboard
  const Dashboard = () => {
    const globalScore = calculateGlobalScore();
    const maturityLevel = 
      globalScore >= 90 ? 'Optimizado' :
      globalScore >= 75 ? 'Gestionado' :
      globalScore >= 60 ? 'Definido' :
      globalScore >= 40 ? 'Básico' : 'Inicial';

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Puntuación Global ISO 9001</h3>
              <Award className="w-8 h-8" style={{ color: COLORS.primary }} />
            </div>
            <div className="text-4xl font-bold" style={{ color: COLORS.primary }}>
              {globalScore.toFixed(1)}%
            </div>
            <p className="text-gray-600 mt-2">Nivel de Madurez: {maturityLevel}</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Progreso del Diagnóstico</h3>
              <Activity className="w-8 h-8" style={{ color: COLORS.info }} />
            </div>
            <div className="text-4xl font-bold" style={{ color: COLORS.info }}>
              {((Object.keys(diagnosticData).length / Object.values(DIAGNOSTIC_QUESTIONS).flat().length) * 100).toFixed(0)}%
            </div>
            <p className="text-gray-600 mt-2">Preguntas completadas</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Acciones Pendientes</h3>
              <AlertTriangle className="w-8 h-8" style={{ color: COLORS.warning }} />
            </div>
            <div className="text-4xl font-bold" style={{ color: COLORS.warning }}>
              {actionPlans.filter(a => a.status === 'Pendiente').length}
            </div>
            <p className="text-gray-600 mt-2">Requieren atención</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Cumplimiento por Sección</h3>
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
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Análisis Comparativo</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={getBarData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="puntuación" fill={COLORS.primary} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Estado del Sistema de Gestión</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Object.entries(ISO_SECTIONS).map(([key, section]) => {
              const score = calculateSectionScore(key);
              const Icon = section.icon;
              const color = score >= 80 ? COLORS.success : score >= 60 ? COLORS.warning : COLORS.danger;
              
              return (
                <div key={key} className="text-center p-4 border rounded-lg">
                  <Icon className="w-12 h-12 mx-auto mb-2" style={{ color }} />
                  <h4 className="font-semibold text-sm">{section.name}</h4>
                  <p className="text-2xl font-bold mt-2" style={{ color }}>
                    {score.toFixed(0)}%
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  // Componente Diagnóstico
  const Diagnostic = () => {
    const sections = Object.keys(ISO_SECTIONS);
    const currentSectionIndex = sections.indexOf(currentSection);
    const questions = DIAGNOSTIC_QUESTIONS[currentSection];

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
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Diagnóstico ISO 9001:2015</h2>
            <button
              onClick={() => {
                setModalContent({
                  title: 'Guía del Diagnóstico',
                  text: 'Complete cada sección evaluando el nivel de cumplimiento de su organización. Use la escala de 0 (No implementado) a 5 (Totalmente implementado y optimizado). El sistema calculará automáticamente su puntuación y generará un plan de acción personalizado.'
                });
                setShowModal(true);
              }}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <HelpCircle className="w-6 h-6" style={{ color: COLORS.primary }} />
            </button>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progreso de la sección</span>
              <span>{((Object.keys(diagnosticData).filter(k => questions.some(q => q.id === k)).length / questions.length) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-300"
                style={{ 
                  width: `${(Object.keys(diagnosticData).filter(k => questions.some(q => q.id === k)).length / questions.length) * 100}%`,
                  backgroundColor: COLORS.primary 
                }}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {sections.map((sectionKey) => {
              const section = ISO_SECTIONS[sectionKey];
              const Icon = section.icon;
              const isActive = currentSection === sectionKey;
              const score = calculateSectionScore(sectionKey);
              
              return (
                <button
                  key={sectionKey}
                  onClick={() => setCurrentSection(sectionKey)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isActive ? 'text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  style={{ backgroundColor: isActive ? COLORS.primary : undefined }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.name}</span>
                  {score > 0 && (
                    <span className="text-xs font-bold">{score.toFixed(0)}%</span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              {React.createElement(ISO_SECTIONS[currentSection].icon, { className: "w-6 h-6", style: { color: COLORS.primary } })}
              {ISO_SECTIONS[currentSection].name}
            </h3>

            {questions.map((question, index) => (
              <div key={question.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-2">
                      {index + 1}. {question.question}
                    </h4>
                    <p className="text-sm text-gray-600">{question.help}</p>
                  </div>
                  <button
                    onClick={() => {
                      setModalContent({
                        title: 'Información adicional',
                        text: question.help
                      });
                      setShowModal(true);
                    }}
                    className="ml-4 p-1 rounded-full hover:bg-gray-100"
                  >
                    <Info className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium mr-4">Nivel de cumplimiento:</span>
                  {[0, 1, 2, 3, 4, 5].map(value => (
                    <button
                      key={value}
                      onClick={() => handleResponse(question.id, value)}
                      className={`w-12 h-12 rounded-lg font-semibold transition-all ${
                        diagnosticData[question.id] === value
                          ? 'text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      style={{
                        backgroundColor: diagnosticData[question.id] === value ? COLORS.primary : undefined
                      }}
                    >
                      {value}
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  0 = No implementado | 5 = Totalmente implementado y optimizado
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={prevSection}
              disabled={currentSectionIndex === 0}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              Sección anterior
            </button>

            {currentSectionIndex === sections.length - 1 ? (
              <button
                onClick={generateActionPlan}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90"
                style={{ backgroundColor: COLORS.primary }}
              >
                Generar Plan de Acción
                <Target className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={nextSection}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90"
                style={{ backgroundColor: COLORS.primary }}
              >
                Siguiente sección
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
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
    <div className="space-y-6">
      {/* Navegación de módulos */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex flex-wrap gap-2">
          {modules.slice(0, 2).map(module => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => setActiveModule(module.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeModule === module.id 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{ 
                  backgroundColor: activeModule === module.id ? COLORS.primary : undefined 
                }}
              >
                <Icon className="w-5 h-5" />
                <span>{module.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido del módulo */}
      {renderModule()}

      {/* Modal de ayuda */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold" style={{ color: COLORS.primary }}>
                {modalContent.title}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-800"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto">
              <p className="text-gray-700">{modalContent.text}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticoISO9001;