/**
 * Componente Card unificado - Sistema de Diseño StrateKaz
 * Maneja todos los tipos de tarjetas con un API consistente
 */

import React from 'react';
import PropTypes from 'prop-types';
import {
  StyledCard,
  CardHeader,
  CardContent,
  CardFooter,
  CardIcon,
  CardTitle,
  CardSubtitle,
  SelectionCard,
  StatCard,
  ActionCard,
  LoadingCard,
  ErrorCard,
  InformativaCard,
  InformativaIcon,
  InformativaTitle,
  InformativaDescription,
  SelectionCardNew,
  SelectionIcon,
  SelectionTitle,
  SelectionDescription,
  InteraccionCard,
  InteraccionIcon,
  InteraccionTitle,
  InteraccionDescription,
  InteraccionCTA
} from './Card.styled';

/**
 * Card base - Componente principal
 */
export const Card = ({
  children,
  variant = 'default',
  size = 'medium',
  elevation = 'medium',
  hoverable = false,
  selected = false,
  disabled = false,
  onClick,
  className,
  ...props
}) => {
  return (
    <StyledCard
      variant={variant}
      size={size}
      elevation={elevation}
      hoverable={hoverable}
      selected={selected}
      disabled={disabled}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

/**
 * Card de Selección - Para formularios y opciones seleccionables
 * Uso: Formularios, configuraciones, opciones múltiples
 */
export const Card_Selection = ({
  selected = false,
  disabled = false,
  onClick,
  icon,
  title,
  description,
  ...props
}) => {
  return (
    <SelectionCardNew
      selected={selected}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      <SelectionIcon selected={selected} disabled={disabled}>
        {icon}
      </SelectionIcon>
      <SelectionTitle selected={selected} disabled={disabled}>
        {title}
      </SelectionTitle>
      {description && (
        <SelectionDescription disabled={disabled}>
          {description}
        </SelectionDescription>
      )}
    </SelectionCardNew>
  );
};

/**
 * Card de estadística - Para dashboards
 */
export const Card_Stat = ({
  title,
  value,
  subtitle,
  trend,
  icon,
  change,
  changeType,
  ...props
}) => {
  return (
    <StatCard trend={trend} {...props}>
      <CardHeader center>
        {icon && (
          <CardIcon variant={trend === 'up' ? 'success' : trend === 'down' ? 'danger' : 'neutral'}>
            {icon}
          </CardIcon>
        )}
      </CardHeader>
      
      <CardContent>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          {value}
        </div>
        <CardTitle center size="small">{title}</CardTitle>
        {subtitle && <CardSubtitle center>{subtitle}</CardSubtitle>}
      </CardContent>
      
      {change && (
        <CardFooter center>
          <span style={{ 
            color: changeType === 'positive' ? 'var(--color-success)' : 
                   changeType === 'negative' ? 'var(--color-danger)' : 
                   'var(--color-neutral)',
            fontSize: '0.875rem'
          }}>
            {changeType === 'positive' ? '↗' : changeType === 'negative' ? '↘' : '→'} {change}
          </span>
        </CardFooter>
      )}
    </StatCard>
  );
};

/**
 * Card de acción - Para llamadas a la acción
 */
export const Card_Action = ({
  title,
  subtitle,
  icon,
  disabled = false,
  onClick,
  children,
  ...props
}) => {
  return (
    <ActionCard
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {icon && (
        <CardIcon variant="primary" size="large">
          {icon}
        </CardIcon>
      )}
      {title && <CardTitle center>{title}</CardTitle>}
      {subtitle && <CardSubtitle center>{subtitle}</CardSubtitle>}
      {children}
    </ActionCard>
  );
};

/**
 * Card estándar con header, content y footer
 */
export const Card_Standard = ({
  title,
  subtitle,
  headerAction,
  footerContent,
  children,
  icon,
  ...props
}) => {
  return (
    <Card {...props}>
      {(title || subtitle || headerAction || icon) && (
        <CardHeader>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {icon && (
              <CardIcon variant="primary" size="small" style={{ marginBottom: 0, marginRight: '1rem' }}>
                {icon}
              </CardIcon>
            )}
            <div>
              {title && <CardTitle>{title}</CardTitle>}
              {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
            </div>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </CardHeader>
      )}
      
      <CardContent>
        {children}
      </CardContent>
      
      {footerContent && (
        <CardFooter>
          {footerContent}
        </CardFooter>
      )}
    </Card>
  );
};

/**
 * Card de loading
 */
export const Card_Loading = ({ message = 'Cargando...', ...props }) => {
  return (
    <LoadingCard {...props}>
      <div className="loading-spinner"></div>
      <p style={{ marginTop: '1rem', color: 'var(--color-text-muted)' }}>
        {message}
      </p>
    </LoadingCard>
  );
};

/**
 * Card de error
 */
export const Card_Error = ({ 
  title = 'Error', 
  message = 'Ha ocurrido un error', 
  onRetry,
  retryText = 'Reintentar',
  ...props 
}) => {
  return (
    <ErrorCard {...props}>
      <div className="error-icon">⚠️</div>
      <div className="error-title">{title}</div>
      <div className="error-message">{message}</div>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          {retryText}
        </button>
      )}
    </ErrorCard>
  );
};

/**
 * Card Informativa - Para mostrar información sin interacción
 * Uso: CaracteristicasSection, MethodologySection
 */
export const Card_Informativa = ({
  title,
  description,
  icon,
  ...props
}) => {
  return (
    <InformativaCard {...props}>
      <InformativaIcon>
        {icon}
      </InformativaIcon>
      <InformativaTitle>{title}</InformativaTitle>
      <InformativaDescription>{description}</InformativaDescription>
    </InformativaCard>
  );
};

/**
 * Card de herramienta/característica
 */
export const Card_Feature = ({
  title,
  description,
  icon,
  badge,
  onClick,
  disabled = false,
  ...props
}) => {
  return (
    <Card
      hoverable={!disabled}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <CardHeader>
        <CardIcon variant="primary" size="medium">
          {icon}
        </CardIcon>
        {badge && (
          <span style={{
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            padding: '0.25rem 0.5rem',
            borderRadius: '1rem',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}>
            {badge}
          </span>
        )}
      </CardHeader>
      
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardSubtitle>{description}</CardSubtitle>
      </CardContent>
    </Card>
  );
};

// PropTypes
Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'outlined', 'elevated', 'filled']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  elevation: PropTypes.oneOf(['low', 'medium', 'high']),
  hoverable: PropTypes.bool,
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

Card_Selection.propTypes = {
  selected: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

Card_Stat.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
  trend: PropTypes.oneOf(['up', 'down', 'neutral']),
  icon: PropTypes.node,
  change: PropTypes.string,
  changeType: PropTypes.oneOf(['positive', 'negative', 'neutral']),
};

Card_Action.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node,
};

Card_Standard.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  headerAction: PropTypes.node,
  footerContent: PropTypes.node,
  children: PropTypes.node,
  icon: PropTypes.node,
};

Card_Loading.propTypes = {
  message: PropTypes.string,
};

Card_Error.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
  retryText: PropTypes.string,
};

Card_Informativa.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
};

Card_Feature.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.node,
  badge: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

// Export individual components
export {
  CardHeader,
  CardContent,
  CardFooter,
  CardIcon,
  CardTitle,
  CardSubtitle
};

// Export compatibility components
export { CardBody, ToolIcon } from './Card.styled';

// Export default
/**
 * Card de Interacción - Para elementos clickeables con información detallada
 * Usado en: NormativasSection
 */
export const Card_Interaccion = ({
  title,
  description,
  icon,
  themeColor,
  onClick,
  className,
  ...props
}) => {
  return (
    <InteraccionCard 
      onClick={onClick}
      themeColor={themeColor}
      className={className}
      {...props}
    >
      <InteraccionIcon themeColor={themeColor}>
        {icon}
      </InteraccionIcon>
      <InteraccionTitle>{title}</InteraccionTitle>
      <InteraccionDescription>{description}</InteraccionDescription>
      <InteraccionCTA>Conocer más →</InteraccionCTA>
    </InteraccionCard>
  );
};

Card_Interaccion.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  themeColor: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Card;