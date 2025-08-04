/**
 * Componentes de Autenticación - Sistema de Diseño StrateKaz
 * Contenedores específicos para páginas de Login y Register
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  AuthContainer,
  AuthCard,
  AuthHeader,
  AuthContent,
  AuthFooter,
  AuthTitle,
  AuthSubtitle,
  AuthProgressBar,
  AuthNavButtons
} from './Auth.styled';

/**
 * Container principal para páginas de autenticación
 */
export const Container_Auth = ({ children, ...props }) => {
  return (
    <AuthContainer {...props}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            {children}
          </div>
        </div>
      </div>
    </AuthContainer>
  );
};

/**
 * Card principal para formularios de auth
 */
export const Auth_Card = ({ children, ...props }) => {
  return (
    <AuthCard {...props}>
      {children}
    </AuthCard>
  );
};

/**
 * Header de formularios de auth
 */
export const Auth_Header = ({ title, subtitle, progress, ...props }) => {
  return (
    <AuthHeader {...props}>
      {title && <AuthTitle>{title}</AuthTitle>}
      {subtitle && <AuthSubtitle>{subtitle}</AuthSubtitle>}
      {progress !== undefined && (
        <AuthProgressBar>
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          />
        </AuthProgressBar>
      )}
    </AuthHeader>
  );
};

/**
 * Contenido principal del formulario
 */
export const Auth_Content = ({ children, ...props }) => {
  return (
    <AuthContent {...props}>
      {children}
    </AuthContent>
  );
};

/**
 * Footer con botones de navegación
 */
export const Auth_Footer = ({ children, ...props }) => {
  return (
    <AuthFooter {...props}>
      {children}
    </AuthFooter>
  );
};

/**
 * Contenedor para botones de navegación
 */
export const Auth_NavButtons = ({ leftButton, rightButton, ...props }) => {
  return (
    <AuthNavButtons {...props}>
      <div className="nav-left">
        {leftButton}
      </div>
      <div className="nav-right">
        {rightButton}
      </div>
    </AuthNavButtons>
  );
};

// PropTypes
Container_Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

Auth_Card.propTypes = {
  children: PropTypes.node.isRequired,
};

Auth_Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  progress: PropTypes.number,
};

Auth_Content.propTypes = {
  children: PropTypes.node.isRequired,
};

Auth_Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

Auth_NavButtons.propTypes = {
  leftButton: PropTypes.node,
  rightButton: PropTypes.node,
};