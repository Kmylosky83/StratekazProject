// frontend/src/components/home/CaracteristicasSection.js
import React from 'react';
import { GitBranch, Activity, CheckSquare, PieChart } from 'lucide-react';

const CaracteristicasSection = () => {
  return (
    <section id="caracteristicas" className="caracteristicas-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="titulo-seccion">Características Principales</h2>
          <p className="subtitulo-seccion">Todo lo que necesitas para lograr un verdadero cambio en tu Organización</p>
        </div>
        
        <div className="row g-4">
          <div className="col-md-6 col-lg-3">
            <div className="tarjeta">
              <div className="icono-estandar-gris">
                <GitBranch size={32} />
              </div>
              <h4 className="titulo-tarjeta">Sistemas Integrados</h4>
              <p className="subtitulo-tarjeta">Gestiona múltiples normativas en una única plataforma, evitando duplicidades.</p>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="tarjeta">
              <div className="icono-estandar-gris">
                <Activity size={32} />
              </div>
              <h4 className="titulo-tarjeta">Trazabilidad</h4>
              <p className="subtitulo-tarjeta">Mantén el control de toda la información de tus sistemas de gestión.</p>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="tarjeta">
              <div className="icono-estandar-gris">
                <CheckSquare size={32} />
              </div>
              <h4 className="titulo-tarjeta">Automatización</h4>
              <p className="subtitulo-tarjeta">Reduce el trabajo manual con formularios y reportes automáticos.</p>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="tarjeta">
              <div className="icono-estandar-gris">
                <PieChart size={32} />
              </div>
              <h4 className="titulo-tarjeta">Análisis en tiempo real</h4>
              <p className="subtitulo-tarjeta">Toma decisiones basadas en datos y verifica el avance de tus sistemas de gestión a un click de distancia.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaracteristicasSection;