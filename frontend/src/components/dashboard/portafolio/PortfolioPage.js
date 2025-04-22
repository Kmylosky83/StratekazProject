import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Award, Shield, Briefcase, BarChart2, 
  Users, BookOpen, TrendingUp, CheckCircle, ChevronRight 
} from 'lucide-react';

const PortfolioPage = () => {
  const [activeTab, setActiveTab] = useState('consultoria');
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Efecto para detectar scroll y añadir animación al header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Datos para sección de servicios
  const servicios = {
    consultoria: [
      {
        icon: <Award size={32} />,
        title: "Sistemas de Gestión",
        description: "Implementación y certificación de sistemas de gestión basados en normas ISO 9001, ISO 45001, ISO 14001 e ISO/IEC 17020.",
        features: [
          "Diagnóstico inicial y planificación",
          "Desarrollo y documentación de sistemas",
          "Formación de auditores internos",
          "Acompañamiento en auditoría de certificación"
        ]
      },
      {
        icon: <Shield size={32} />,
        title: "SG-SST y PESV",
        description: "Diseño e implementación de Sistemas de Gestión de Seguridad y Salud en el Trabajo y Planes Estratégicos de Seguridad Vial.",
        features: [
          "Evaluación del cumplimiento legal",
          "Identificación de peligros y valoración de riesgos",
          "Planes de emergencia y contingencia",
          "Indicadores de gestión y mejora continua"
        ]
      },
      {
        icon: <Briefcase size={32} />,
        title: "Gestión Estratégica",
        description: "Desarrollo de estrategias empresariales para la optimización de procesos y mejora de resultados.",
        features: [
          "Análisis organizacional y diagnóstico",
          "Planificación estratégica",
          "Definición de KPIs y objetivos",
          "Seguimiento y control de resultados"
        ]
      }
    ],
    capacitacion: [
      {
        icon: <BarChart2 size={32} />,
        title: "Análisis de Datos",
        description: "Formación para equipos en extracción de valor de los datos para toma de decisiones basadas en evidencia.",
        features: [
          "Análisis descriptivo y predictivo",
          "Visualización efectiva de datos",
          "Dashboards para control y seguimiento",
          "Interpretación y toma de decisiones"
        ]
      },
      {
        icon: <Users size={32} />,
        title: "Liderazgo y Trabajo en Equipo",
        description: "Desarrollo de habilidades para la gestión eficiente de equipos de alto rendimiento.",
        features: [
          "Liderazgo disruptivo",
          "Comunicación efectiva",
          "Gestión de conflictos",
          "Motivación y engagement"
        ]
      },
      {
        icon: <BookOpen size={32} />,
        title: "Formación en Sistemas de Gestión",
        description: "Capacitación especializada en implementación y auditoría de sistemas de gestión.",
        features: [
          "Interpretación de requisitos normativos",
          "Auditoría interna de sistemas de gestión",
          "Gestión documental eficiente",
          "Medición y seguimiento de procesos"
        ]
      }
    ],
    coaching: [
      {
        icon: <TrendingUp size={32} />,
        title: "Coaching Gerencial",
        description: "Acompañamiento personalizado para directivos y equipos de alta dirección.",
        features: [
          "Definición de visión y metas",
          "Desarrollo de competencias directivas",
          "Gestión del cambio organizacional",
          "Balance vida-trabajo"
        ]
      },
      {
        icon: <CheckCircle size={32} />,
        title: "Coaching en PNL",
        description: "Aplicación de técnicas de Programación Neurolingüística para el desarrollo personal y profesional.",
        features: [
          "Comunicación efectiva",
          "Gestión emocional",
          "Establecimiento y logro de objetivos",
          "Romper limitaciones y creencias"
        ]
      }
    ]
  };

  // Datos para sección de casos de éxito
  const casosExito = [
    {
      empresa: "Sociedad de Mejoras Públicas",
      logo: "/api/placeholder/80/80",
      descripcion: "Implementación de Sistema Integrado de Gestión (ISO 9001, ISO 45001, ISO 14001)",
      resultado: "Certificación SGS mantenida desde 2019 hasta la actualidad"
    },
    {
      empresa: "Fianzacrédito",
      logo: "/api/placeholder/80/80",
      descripcion: "Desarrollo e implementación de Sistema de Gestión de Calidad ISO 9001:2015",
      resultado: "Certificación ICONTEC desde 2020, mejora en indicadores de satisfacción del cliente"
    },
    {
      empresa: "Certiretie",
      logo: "/api/placeholder/80/80",
      descripcion: "Implementación de Sistema de Gestión según ISO/IEC 17020",
      resultado: "Acreditación ONAC desde 2022, posicionamiento como organismo de inspección reconocido"
    }
  ];

  // Estadísticas destacadas
  const estadisticas = [
    { valor: "+20", texto: "Años de experiencia" },
    { valor: "17", texto: "Sistemas de gestión implementados" },
    { valor: "+30", texto: "Auditorías realizadas" },
    { valor: "+2000", texto: "Personas capacitadas" }
  ];

  // Testimonios
  const testimonios = [
    {
      nombre: "Laura Martínez",
      cargo: "Gerente General",
      empresa: "Fianzacrédito",
      contenido: "La implementación del Sistema de Gestión de Calidad ha sido fundamental para mejorar nuestros procesos y la satisfacción de nuestros clientes.",
      avatar: "/api/placeholder/60/60"
    },
    {
      nombre: "Carlos Rodríguez",
      cargo: "Director de Operaciones",
      empresa: "Sociedad de Mejoras Públicas",
      contenido: "El acompañamiento y experticia durante la implementación del Sistema Integrado de Gestión fue clave para lograr la certificación en tiempo récord.",
      avatar: "/api/placeholder/60/60"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con efecto parallax */}
      <header className={`relative bg-gradient-to-r from-blue-600 to-blue-400 text-white py-16 transition-all duration-500 ${isScrolled ? 'py-12' : 'py-20'}`}>
        <div className="absolute inset-0 bg-[url('/api/placeholder/1200/400')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Soluciones Estratégicas Empresariales</h1>
            <p className="text-xl opacity-90 mb-8">
              Impulse la eficiencia, innovación y crecimiento sostenible de su organización con estrategias personalizadas que integran Inteligencia Artificial, Tecnología y procesos optimizados.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="/contacto" className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all flex items-center">
                Solicitar Consulta <ArrowRight className="ml-2" size={18} />
              </a>
              <a href="#servicios" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-6 py-3 rounded-lg font-medium transition-all">
                Explorar Servicios
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Sección de estadísticas */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {estadisticas.map((stat, index) => (
              <div key={index} className="text-center p-4">
                <p className="text-4xl font-bold text-blue-600 mb-2">{stat.valor}</p>
                <p className="text-gray-600">{stat.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de presentación */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="/api/placeholder/600/600" 
                alt="Camilo Rubiano - Estratega Empresarial" 
                className="rounded-xl shadow-lg w-full max-w-md mx-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Camilo Rubiano Bustos</h2>
              <h3 className="text-xl text-blue-600 font-medium mb-4">Estratega Empresarial</h3>
              <p className="text-gray-600 mb-6">
                Administrador de Empresas e Ingeniero Industrial, Especialista en Gerencia de Mercadeo y 
                Diagnóstico y Análisis Organizacional, con más de 20 años de experiencia en la industria. 
                Mi formación dual me permite abordar desafíos complejos con una combinación de innovación 
                técnica y estrategia empresarial.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Implementación de Sistemas de Gestión</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Auditoría y Mejora Continua</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Formación y Desarrollo de Equipos</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-500 mr-3 mt-1 flex-shrink-0" size={20} />
                  <p className="text-gray-700">Coaching Gerencial y PNL</p>
                </div>
              </div>
              <a href="/perfil" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
                Conocer más sobre mi trayectoria <ChevronRight className="ml-1" size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de servicios con tabs */}
      <section id="servicios" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Portafolio de Servicios</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Soluciones personalizadas para impulsar el crecimiento sostenible de su organización
              a través de estrategias integrales y herramientas de gestión innovadoras.
            </p>
          </div>
          
          {/* Tabs de navegación */}
          <div className="flex justify-center mb-10">
            <div className="bg-gray-100 rounded-lg inline-flex p-1">
              <button 
                className={`px-5 py-2 rounded-md font-medium transition-all ${activeTab === 'consultoria' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveTab('consultoria')}
              >
                Consultoría
              </button>
              <button 
                className={`px-5 py-2 rounded-md font-medium transition-all ${activeTab === 'capacitacion' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveTab('capacitacion')}
              >
                Capacitación
              </button>
              <button 
                className={`px-5 py-2 rounded-md font-medium transition-all ${activeTab === 'coaching' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-200'}`}
                onClick={() => setActiveTab('coaching')}
              >
                Coaching
              </button>
            </div>
          </div>
          
          {/* Contenido de los tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicios[activeTab].map((servicio, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all p-6">
                <div className="bg-blue-100 text-blue-600 w-16 h-16 flex items-center justify-center rounded-full mb-6">
                  {servicio.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{servicio.title}</h3>
                <p className="text-gray-600 mb-6">{servicio.description}</p>
                <ul className="space-y-2">
                  {servicio.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <ChevronRight className="text-blue-500 mr-2 mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <a href="/contacto" className="text-blue-600 font-medium hover:text-blue-800 inline-flex items-center">
                    Solicitar información <ArrowRight className="ml-2" size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de casos de éxito */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Casos de Éxito</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Descubra cómo hemos ayudado a organizaciones a implementar sistemas de gestión
              eficientes y mejorar su desempeño.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {casosExito.map((caso, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <img src={caso.logo} alt={caso.empresa} className="w-16 h-16 rounded-full mr-4" />
                  <h3 className="text-xl font-bold text-gray-800">{caso.empresa}</h3>
                </div>
                <p className="text-gray-600 mb-4">{caso.descripcion}</p>
                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-1 rounded-full mr-3">
                      <CheckCircle className="text-green-600" size={16} />
                    </div>
                    <p className="text-green-800 text-sm font-medium">{caso.resultado}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <a href="/testimonios" className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800">
              Ver todos los casos de éxito <ChevronRight className="ml-1" size={18} />
            </a>
          </div>
        </div>
      </section>

      {/* Sección de testimonios */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Lo que dicen nuestros clientes</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              La satisfacción de nuestros clientes es nuestra mayor recompensa y motivación para seguir mejorando.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonios.map((testimonio, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                <div className="flex items-center mb-4">
                  <img src={testimonio.avatar} alt={testimonio.nombre} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{testimonio.nombre}</h3>
                    <p className="text-sm text-gray-600">{testimonio.cargo}, {testimonio.empresa}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonio.contenido}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de metodología */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nuestra Metodología</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Un enfoque estructurado y adaptable para asegurar resultados óptimos en cada proyecto.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 max-w-5xl mx-auto">
            <div className="flex-1 relative">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative z-10">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">1</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Diagnóstico</h3>
                <p className="text-gray-600">Evaluación exhaustiva del estado actual para identificar fortalezas, debilidades y oportunidades de mejora.</p>
              </div>
              <div className="hidden md:block absolute w-full h-1 bg-blue-200 top-1/2 left-full z-0"></div>
            </div>
            
            <div className="flex-1 relative">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative z-10">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">2</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Planificación</h3>
                <p className="text-gray-600">Diseño de estrategias personalizadas y plan de acción adaptado a las necesidades específicas.</p>
              </div>
              <div className="hidden md:block absolute w-full h-1 bg-blue-200 top-1/2 left-full z-0"></div>
            </div>
            
            <div className="flex-1 relative">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative z-10">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">3</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Implementación</h3>
                <p className="text-gray-600">Ejecución de acciones definidas en el plan, con acompañamiento constante y adaptabilidad.</p>
              </div>
              <div className="hidden md:block absolute w-full h-1 bg-blue-200 top-1/2 left-full z-0"></div>
            </div>
            
            <div className="flex-1">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative z-10">
                <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold mb-4">4</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Seguimiento</h3>
                <p className="text-gray-600">Monitoreo continuo, medición de resultados y ajustes para garantizar el logro de objetivos propuestos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de llamada a la acción */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">¿Listo para transformar su organización?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Permítame acompañarle en el proceso de implementación de sistemas de gestión
            y mejora continua para alcanzar sus objetivos empresariales.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/contacto" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg font-medium transition-all">
              Solicitar Consulta
            </a>
            <a href="/registro" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 rounded-lg font-medium transition-all">
              Registrarse
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;