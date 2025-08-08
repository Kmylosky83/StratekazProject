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
export default function ISO9001DiagnosticTool() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
  const [workflowStep, setWorkflowStep] = useState(0);
  const [actionPlans, setActionPlans] = useState([]);

  // Inicializar datos del localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('iso9001_diagnostic');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setDiagnosticData(parsed.diagnosticData || {});
      setCompanyInfo(parsed.companyInfo || {});
      setActionPlans(parsed.actionPlans || []);
    }
  }, []);

  // Guardar en localStorage
  const saveToLocalStorage = useCallback(() => {
    const dataToSave = {
      diagnosticData,
      companyInfo,
      actionPlans,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('iso9001_diagnostic', JSON.stringify(dataToSave));
  }, [diagnosticData, companyInfo, actionPlans]);

  // Auto-guardado cada 2 segundos
  useEffect(() => {
    const timer = setInterval(saveToLocalStorage, 2000);
    return () => clearInterval(timer);
  }, [saveToLocalStorage]);

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

  // Componente de ayuda modal
  const HelpModal = () => (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-60 items-center justify-center p-4 z-50 ${showModal ? 'flex' : 'hidden'}`}
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
  );

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

  // Componente Informes
  const Reports = () => {
    const globalScore = calculateGlobalScore();
    const data = getRadarData();

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Informes y KPIs ISO 9001</h2>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                <Download className="w-4 h-4" />
                Exportar PDF
              </button>
              <button
                onClick={saveToLocalStorage}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90"
                style={{ backgroundColor: COLORS.primary }}
              >
                <Save className="w-4 h-4" />
                Guardar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Información de la Empresa</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Empresa:</dt>
                  <dd className="text-lg">{companyInfo.name || 'No especificada'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Sector:</dt>
                  <dd className="text-lg">{companyInfo.sector || 'No especificado'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Fecha del diagnóstico:</dt>
                  <dd className="text-lg">{new Date().toLocaleDateString('es-ES')}</dd>
                </div>
              </dl>
            </div>

            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Resumen Ejecutivo</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Puntuación Global:</span>
                  <div className="text-3xl font-bold" style={{ color: COLORS.primary }}>
                    {globalScore.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">Nivel de Madurez:</span>
                  <div className="text-xl font-semibold">
                    {globalScore >= 90 ? 'Optimizado' :
                     globalScore >= 75 ? 'Gestionado' :
                     globalScore >= 60 ? 'Definido' :
                     globalScore >= 40 ? 'Básico' : 'Inicial'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Análisis Detallado por Sección</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3">Sección ISO 9001</th>
                    <th className="text-center p-3">Puntuación</th>
                    <th className="text-center p-3">Nivel</th>
                    <th className="text-center p-3">Gaps Identificados</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(ISO_SECTIONS).map(([key, section]) => {
                    const score = calculateSectionScore(key);
                    const questions = DIAGNOSTIC_QUESTIONS[key];
                    const gaps = questions.filter(q => (diagnosticData[q.id] || 0) < 3).length;
                    
                    return (
                      <tr key={key} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{section.name}</td>
                        <td className="text-center p-3">
                          <span 
                            className="font-bold"
                            style={{ 
                              color: score >= 80 ? COLORS.success : score >= 60 ? COLORS.warning : COLORS.danger 
                            }}
                          >
                            {score.toFixed(1)}%
                          </span>
                        </td>
                        <td className="text-center p-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            score >= 80 ? 'bg-green-100 text-green-800' :
                            score >= 60 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {score >= 80 ? 'Alto' : score >= 60 ? 'Medio' : 'Bajo'}
                          </span>
                        </td>
                        <td className="text-center p-3">{gaps}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Distribución de Cumplimiento</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Alto (>80%)', value: data.filter(d => d.score >= 80).length, color: COLORS.success },
                      { name: 'Medio (60-80%)', value: data.filter(d => d.score >= 60 && d.score < 80).length, color: COLORS.warning },
                      { name: 'Bajo (<60%)', value: data.filter(d => d.score < 60).length, color: COLORS.danger }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Evolución del Diagnóstico</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getRadarData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="section" angle={-45} textAnchor="end" height={80} />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke={COLORS.primary} 
                    strokeWidth={2}
                    dot={{ fill: COLORS.primary, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Componente Plan de Acción
  const ActionPlans = () => {
    const updateActionPlan = (id, field, value) => {
      setActionPlans(prev => prev.map(plan => 
        plan.id === id ? { ...plan, [field]: value } : plan
      ));
    };

    const priorities = {
      'Alta': { color: COLORS.danger, icon: AlertTriangle },
      'Media': { color: COLORS.warning, icon: Clock },
      'Baja': { color: COLORS.info, icon: Info }
    };

    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Plan de Acción ISO 9001</h2>
            <button
              onClick={generateActionPlan}
              className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90"
              style={{ backgroundColor: COLORS.primary }}
            >
              <Target className="w-4 h-4" />
              Regenerar Plan
            </button>
          </div>

          {actionPlans.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">No hay planes de acción generados.</p>
              <p className="text-sm text-gray-400 mt-2">Complete el diagnóstico para generar automáticamente un plan de acción.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-red-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-red-700">Prioridad Alta</span>
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="text-2xl font-bold text-red-600 mt-2">
                    {actionPlans.filter(p => p.priority === 'Alta').length}
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-yellow-700">Prioridad Media</span>
                    <Clock className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-yellow-600 mt-2">
                    {actionPlans.filter(p => p.priority === 'Media').length}
                  </div>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-blue-700">Prioridad Baja</span>
                    <Info className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mt-2">
                    {actionPlans.filter(p => p.priority === 'Baja').length}
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="text-left p-3">Sección</th>
                      <th className="text-left p-3">Acción Requerida</th>
                      <th className="text-center p-3">Prioridad</th>
                      <th className="text-left p-3">Responsable</th>
                      <th className="text-center p-3">Fecha Límite</th>
                      <th className="text-center p-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {actionPlans.map(plan => {
                      const PriorityIcon = priorities[plan.priority].icon;
                      return (
                        <tr key={plan.id} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{plan.section}</td>
                          <td className="p-3">
                            <div className="text-sm">{plan.action}</div>
                            <div className="text-xs text-gray-500 mt-1">{plan.question}</div>
                          </td>
                          <td className="text-center p-3">
                            <span 
                              className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium"
                              style={{ 
                                backgroundColor: `${priorities[plan.priority].color}20`,
                                color: priorities[plan.priority].color
                              }}
                            >
                              <PriorityIcon className="w-3 h-3" />
                              {plan.priority}
                            </span>
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={plan.responsible}
                              onChange={(e) => updateActionPlan(plan.id, 'responsible', e.target.value)}
                              className="w-full px-2 py-1 border rounded text-sm"
                              placeholder="Asignar..."
                            />
                          </td>
                          <td className="text-center p-3">
                            <input
                              type="date"
                              value={plan.deadline}
                              onChange={(e) => updateActionPlan(plan.id, 'deadline', e.target.value)}
                              className="px-2 py-1 border rounded text-sm"
                            />
                          </td>
                          <td className="text-center p-3">
                            <select
                              value={plan.status}
                              onChange={(e) => updateActionPlan(plan.id, 'status', e.target.value)}
                              className="px-2 py-1 border rounded text-sm"
                            >
                              <option value="Pendiente">Pendiente</option>
                              <option value="En Proceso">En Proceso</option>
                              <option value="Completado">Completado</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Componente Configuración
  const SettingsComponent = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Configuración de la Empresa</h2>
          
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre de la Empresa
              </label>
              <input
                type="text"
                value={companyInfo.name}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="Ingrese el nombre de la empresa"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sector Industrial
              </label>
              <select
                value={companyInfo.sector}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, sector: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Seleccione un sector</option>
                <option value="Manufactura">Manufactura</option>
                <option value="Servicios">Servicios</option>
                <option value="Salud">Salud</option>
                <option value="Tecnología">Tecnología</option>
                <option value="Construcción">Construcción</option>
                <option value="Alimentos">Alimentos y Bebidas</option>
                <option value="Educación">Educación</option>
                <option value="Otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tamaño de la Empresa
              </label>
              <select
                value={companyInfo.size}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, size: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Seleccione el tamaño</option>
                <option value="1-10">1-10 empleados</option>
                <option value="11-50">11-50 empleados</option>
                <option value="51-200">51-200 empleados</option>
                <option value="201-500">201-500 empleados</option>
                <option value="500+">Más de 500 empleados</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email de Contacto
              </label>
              <input
                type="email"
                value={companyInfo.contact}
                onChange={(e) => setCompanyInfo(prev => ({ ...prev, contact: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="email@empresa.com"
              />
            </div>

            <div className="pt-4">
              <button
                onClick={saveToLocalStorage}
                className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:opacity-90"
                style={{ backgroundColor: COLORS.primary }}
              >
                <Save className="w-4 h-4" />
                Guardar Configuración
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-4">Gestión de Datos</h3>
          <div className="space-y-4">
            <button
              onClick={() => {
                const data = {
                  companyInfo,
                  diagnosticData,
                  actionPlans,
                  globalScore: calculateGlobalScore(),
                  sectionScores: Object.keys(ISO_SECTIONS).reduce((acc, key) => ({
                    ...acc,
                    [key]: calculateSectionScore(key)
                  }), {}),
                  exportDate: new Date().toISOString()
                };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `ISO9001_Diagnostic_${companyInfo.name || 'Export'}_${new Date().toISOString().split('T')[0]}.json`;
                a.click();
              }}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              <Download className="w-4 h-4" />
              Exportar Datos (JSON)
            </button>

            <button
              onClick={() => {
                if (window.confirm('¿Está seguro de que desea borrar todos los datos? Esta acción no se puede deshacer.')) {
                  localStorage.removeItem('iso9001_diagnostic');
                  setDiagnosticData({});
                  setCompanyInfo({ name: '', sector: '', size: '', contact: '' });
                  setActionPlans([]);
                  setCurrentSection('context');
                }
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              <AlertTriangle className="w-4 h-4" />
              Borrar Todos los Datos
            </button>
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
      case 'reports':
        return <Reports />;
      case 'actions':
        return <ActionPlans />;
      case 'settings':
        return <SettingsComponent />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className={`w-64 bg-white shadow-lg flex-col justify-between ${sidebarOpen ? 'flex' : 'hidden md:flex'} absolute md:relative h-full z-20`}>
        <div>
          <div className="p-4 border-b h-16 flex items-center justify-between">
            <img 
              src="https://i.postimg.cc/KcnFLv8g/logo-png-1.png" 
              alt="Logo Stratekaz" 
              className="h-8"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/150x40/ec268f/ffffff?text=Stratekaz';
              }}
            />
            <button
              onClick={() => setSidebarOpen(false)}
              className="md:hidden"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-grow p-4 space-y-2">
            {modules.map(module => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    setActiveModule(module.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center p-2 rounded-md hover:bg-gray-100 ${
                    activeModule === module.id ? 'bg-pink-50 text-pink-600 font-bold border-l-4 border-pink-600' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{module.name}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t">
          <p className="text-xs text-gray-500 text-center">Creado por Stratekaz SAS</p>
          <p className="text-xs text-gray-500 text-center">© 2024. Todos los derechos reservados.</p>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-md h-16 flex justify-between items-center px-6">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden mr-4 text-gray-600 hover:text-pink-500"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold" style={{ color: COLORS.primary }}>
              {modules.find(m => m.id === activeModule)?.name || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          <div className="container mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>

      {/* Modal de ayuda */}
      <HelpModal />
    </div>
  );
}