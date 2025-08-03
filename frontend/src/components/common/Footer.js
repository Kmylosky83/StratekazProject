// frontend/src/components/common/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer bg-light border-top mt-5">
      <div className="container py-5">
        <div className="row">
          {/* Brand and Description */}
          <div className="col-lg-4 mb-4">
            <h5 className="fw-bold text-primary mb-3">StrateKaz</h5>
            <p className="text-muted">
              Suite empresarial completa para la gestión, optimización y crecimiento 
              de tu negocio. Herramientas profesionales al alcance de todos.
            </p>
            <div className="social-links">
              <a href="#" className="text-muted me-3">
                <i className="fab fa-linkedin fs-5"></i>
              </a>
              <a href="#" className="text-muted me-3">
                <i className="fab fa-twitter fs-5"></i>
              </a>
              <a href="#" className="text-muted me-3">
                <i className="fab fa-facebook fs-5"></i>
              </a>
              <a href="#" className="text-muted">
                <i className="fab fa-instagram fs-5"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Navegación</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-muted text-decoration-none">Inicio</Link>
              </li>
              <li className="mb-2">
                <Link to="/acceso-gratuito" className="text-muted text-decoration-none">Acceso Gratuito</Link>
              </li>
              <li className="mb-2">
                <Link to="/portfolio" className="text-muted text-decoration-none">Portafolio</Link>
              </li>
              <li className="mb-2">
                <Link to="/register" className="text-muted text-decoration-none">Crear Cuenta</Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Servicios</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">ISO 9001</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">SG-SST</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">PESV</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Innovación</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Soporte</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Centro de Ayuda</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Documentación</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Contacto</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-muted text-decoration-none">Estado del Servicio</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h6 className="fw-bold mb-3">Contacto</h6>
            <ul className="list-unstyled">
              <li className="mb-2 text-muted">
                <i className="fas fa-envelope me-2"></i>
                info@stratekaz.com
              </li>
              <li className="mb-2 text-muted">
                <i className="fas fa-phone me-2"></i>
                +57 (1) 234-5678
              </li>
              <li className="mb-2 text-muted">
                <i className="fas fa-map-marker-alt me-2"></i>
                Bogotá, Colombia
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4" />

        {/* Bottom section */}
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-muted mb-0">
              &copy; {new Date().getFullYear()} StrateKaz. Todos los derechos reservados.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="#" className="text-muted text-decoration-none me-3">Términos de Uso</a>
            <a href="#" className="text-muted text-decoration-none me-3">Política de Privacidad</a>
            <a href="#" className="text-muted text-decoration-none">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;