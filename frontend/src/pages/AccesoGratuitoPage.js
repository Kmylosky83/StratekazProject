// frontend/src/pages/AccesoGratuitoPage.js
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const AccesoGratuitoPage = () => {
  const isAuthenticated = false; // This should come from AuthContext
  const userName = ""; // This should come from AuthContext

  return (
    <div className="acceso-gratuito-page">
      <Header isAuthenticated={isAuthenticated} userName={userName} />
      
      <main className="acceso-gratuito-container py-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* Grid 1x4 para las 4 herramientas principales */}
              <div className="row g-4">
                <div className="col-lg-3 col-md-6">
                  <div className="tarjeta-herramienta h-100">
                    <div className="card-body text-center p-4 d-flex flex-column">
                      <div className="tool-icon mb-3" style={{ backgroundColor: '#3498db' }}>
                        <i className="fas fa-certificate text-white fs-1"></i>
                      </div>
                      <h5 className="fw-bold mb-3">ISO 9001</h5>
                      <p className="subtitulo-tarjeta flex-grow-1">
                        Sistema de Gestión de Calidad. Herramientas básicas para implementar ISO 9001 en tu organización.
                      </p>
                      <button className="boton-tarjeta activo mt-auto">
                        Acceder Gratis
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6">
                  <div className="tarjeta-herramienta h-100">
                    <div className="card-body text-center p-4 d-flex flex-column">
                      <div className="tool-icon mb-3" style={{ backgroundColor: '#e74c3c' }}>
                        <i className="fas fa-hard-hat text-white fs-1"></i>
                      </div>
                      <h5 className="fw-bold mb-3">SG-SST</h5>
                      <p className="subtitulo-tarjeta flex-grow-1">
                        Sistema de Gestión de Seguridad y Salud en el Trabajo. Cumple con la normatividad colombiana.
                      </p>
                      <button className="boton-tarjeta activo mt-auto">
                        Acceder Gratis
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6">
                  <div className="tarjeta-herramienta h-100">
                    <div className="card-body text-center p-4 d-flex flex-column">
                      <div className="tool-icon mb-3" style={{ backgroundColor: '#f39c12' }}>
                        <i className="fas fa-road text-white fs-1"></i>
                      </div>
                      <h5 className="fw-bold mb-3">PESV</h5>
                      <p className="subtitulo-tarjeta flex-grow-1">
                        Plan Estratégico de Seguridad Vial. Herramientas para implementar y gestionar la seguridad vial.
                      </p>
                      <button className="boton-tarjeta activo mt-auto">
                        Acceder Gratis
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3 col-md-6">
                  <div className="tarjeta-herramienta h-100">
                    <div className="card-body text-center p-4 d-flex flex-column">
                      <div className="tool-icon mb-3" style={{ backgroundColor: '#9b59b6' }}>
                        <i className="fas fa-lightbulb text-white fs-1"></i>
                      </div>
                      <h5 className="fw-bold mb-3">Innovación</h5>
                      <p className="subtitulo-tarjeta flex-grow-1">
                        Herramientas de innovación empresarial. Metodologías para fomentar la creatividad y mejora continua.
                      </p>
                      <button className="boton-tarjeta activo mt-auto">
                        Acceder Gratis
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccesoGratuitoPage;