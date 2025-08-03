// frontend/src/pages/AccesoGratuitoPage.js
import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Button, Card, CardBody, ToolIcon, H3, Text } from '../design-system/components';
import { Award, HardHat, Navigation, Lightbulb } from 'lucide-react';

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
                  <Card variant="tool" className="h-100">
                    <CardBody className="text-center p-4 d-flex flex-column">
                      <ToolIcon backgroundColor="#3498db" className="mb-3">
                        <Award size={48} color="white" />
                      </ToolIcon>
                      <H3 variant="card" className="fw-bold mb-3">ISO 9001</H3>
                      <Text variant="cardSubtitle" className="flex-grow-1">
                        Sistema de Gestión de Calidad. Herramientas básicas para implementar ISO 9001 en tu organización.
                      </Text>
                      <Button variant="card" className="active mt-auto">
                        Acceder Gratis
                      </Button>
                    </CardBody>
                  </Card>
                </div>

                <div className="col-lg-3 col-md-6">
                  <Card variant="tool" className="h-100">
                    <CardBody className="text-center p-4 d-flex flex-column">
                      <ToolIcon backgroundColor="#e74c3c" className="mb-3">
                        <HardHat size={48} color="white" />
                      </ToolIcon>
                      <H3 variant="card" className="fw-bold mb-3">SG-SST</H3>
                      <Text variant="cardSubtitle" className="flex-grow-1">
                        Sistema de Gestión de Seguridad y Salud en el Trabajo. Cumple con la normatividad colombiana.
                      </Text>
                      <Button variant="card" className="active mt-auto">
                        Acceder Gratis
                      </Button>
                    </CardBody>
                  </Card>
                </div>

                <div className="col-lg-3 col-md-6">
                  <Card variant="tool" className="h-100">
                    <CardBody className="text-center p-4 d-flex flex-column">
                      <ToolIcon backgroundColor="#f39c12" className="mb-3">
                        <Navigation size={48} color="white" />
                      </ToolIcon>
                      <H3 variant="card" className="fw-bold mb-3">PESV</H3>
                      <Text variant="cardSubtitle" className="flex-grow-1">
                        Plan Estratégico de Seguridad Vial. Herramientas para implementar y gestionar la seguridad vial.
                      </Text>
                      <Button variant="card" className="active mt-auto">
                        Acceder Gratis
                      </Button>
                    </CardBody>
                  </Card>
                </div>

                <div className="col-lg-3 col-md-6">
                  <Card variant="tool" className="h-100">
                    <CardBody className="text-center p-4 d-flex flex-column">
                      <ToolIcon backgroundColor="#9b59b6" className="mb-3">
                        <Lightbulb size={48} color="white" />
                      </ToolIcon>
                      <H3 variant="card" className="fw-bold mb-3">Innovación</H3>
                      <Text variant="cardSubtitle" className="flex-grow-1">
                        Herramientas de innovación empresarial. Metodologías para fomentar la creatividad y mejora continua.
                      </Text>
                      <Button variant="card" className="active mt-auto">
                        Acceder Gratis
                      </Button>
                    </CardBody>
                  </Card>
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