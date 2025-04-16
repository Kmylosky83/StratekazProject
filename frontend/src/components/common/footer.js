// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section py-5">
      <div className="container">
        <div className="row mx-0">
          {/* Columna StrateKaz (Logo y descripción) */}
          <div className="col-md-3">
            <div className="footer-logo mb-3">
              <img src="/images/logo.png" alt="StrateKaz" className="img-fluid" style={{maxHeight: '45px'}} />
            </div>
            <p className="footer-description">
              Es un desarrollo de @Kmylosky, potenciado con "CLAUDE IA" que busca la automatización de los sistemas de gestión y aporta valor a las organizaciones.
            </p>
            <div className="social-icons mt-3 d-flex justify-content-start">
             <a href="https://www.facebook.com/Kmylosky" className="social-icon" title="Facebook"><i className="fab fa-facebook-f"></i></a>
             <a href="https://twitter.com/Kmylosky" className="social-icon" title="Twitter"><i className="fab fa-twitter"></i></a>
             <a href="https://www.instagram.com/Stratekaz" className="social-icon" title="Instagram"><i className="fab fa-instagram"></i></a>
             <a href="https://www.tiktok.com/Kmylosky" className="social-icon" title="TikTok"><i className="fab fa-tiktok"></i></a>
             <a href="https://wa.me/573115351944" className="social-icon" title="WhatsApp"><i className="fab fa-whatsapp"></i></a>
           </div>
         </div>
         
         {/* Línea vertical */}
         <div className="col-auto d-flex align-items-center px-0">
           <div className="footer-divider-vertical"></div>
         </div>
         
         {/* Columna Enlaces */}
         <div className="col">
           <h5 className="footer-heading">Enlaces</h5>
           <ul className="footer-links text-left">
             <li><Link to="/">Inicio</Link></li>
             <li><a href="/#caracteristicas">Características</a></li>
             <li><a href="/#como-funciona">Cómo Funciona</a></li>
             <li><Link to="/login">Iniciar Sesión</Link></li>
             <li><Link to="/register">Registrarse</Link></li>
           </ul>
         </div>
         
         {/* Línea vertical */}
         <div className="col-auto d-flex align-items-center px-0">
           <div className="footer-divider-vertical"></div>
         </div>
         
         {/* Columna Contacto */}
         <div className="col">
           <h5 className="footer-heading">Contacto</h5>
           <ul className="footer-contact text-left">
             <li>
               <i className="fas fa-envelope"></i>
               <span>info@stratekaz.com</span>
             </li>
             <li>
               <i className="fas fa-phone-alt"></i>
               <span>+57 (311) 535-1944</span>
             </li>
             <li>
               <i className="fas fa-map-marker-alt"></i>
               <span>Cúcuta, Colombia</span>
             </li>
           </ul>
         </div>
       </div>
       
       <hr className="footer-divider my-4" />
       
       <div className="d-flex justify-content-between align-items-center flex-wrap">
         <div>
           <p className="copyright mb-0">© 2025 StrateKaz. Marca @Kmylosky. Todos los derechos reservados.</p>
         </div>
         <div className="footer-policies">
           <a href="#" className="me-3">Términos y Condiciones</a>
           <a href="#">Política de Privacidad</a>
         </div>
       </div>
     </div>
   </footer>
 );
};

export default Footer;