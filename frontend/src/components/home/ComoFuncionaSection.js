// frontend/src/components/home/ComoFuncionaSection.js
import React from 'react';
import '../../styles/home.css';

const ComoFuncionaSection = () => {
  return (
    <section id="como-funciona" className="como-funciona-section py-5">
      <div className="container">
        <div className="row g-4">
          <h2 className="titulo-seccion">¿Cómo funciona StrateKaz?</h2>
          <p className="subtitulo-seccion">
            Funciona como un ecosistema digital enfocado en el cumplimiento de los Objetivos Organizacionales
          </p>
          
          <div className="row g-4">
            <div className="col-md-4">
              <div className="tarjeta">
                <div className="paso-number">1</div>
                <div className="icono-estandar-rosa">
                  <i className="fas fa-user-plus"></i>
                </div>
                <h4 className="titulo-tarjeta">Regístrate</h4>
                <p className="subtitulo-tarjeta">Crea tu cuenta como consultor independiente, empresa directa o empresa de consultoría en menos de 2 minutos.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="tarjeta">
                <div className="paso-number">2</div>
                <div className="icono-estandar-rosa">
                  <i className="fas fa-cogs"></i>
                </div>
                <h4 className="titulo-tarjeta">Configura</h4>
                <p className="subtitulo-tarjeta">Registra tus empresas, seleciona los roles de tu equipo o selecciona los módulos que vayas a trabajar en tu actividad empresarial.</p>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="tarjeta">
                <div className="paso-number">3</div>
                <div className="icono-estandar-rosa">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h4 className="titulo-tarjeta">Gestiona</h4>
                <p className="subtitulo-tarjeta">Diseña y delega actividades para el cumplimiento de tus sistemas de gestión con nuestra interfaz intuitiva y herramientas especializadas.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComoFuncionaSection;