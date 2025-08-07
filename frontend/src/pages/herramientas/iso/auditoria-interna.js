// Auditoría Interna - Herramienta SPA para ISO
// Planificación y ejecución de auditorías internas

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus, Calendar, Users, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button, Card } from '../../../design-system/components';
import { Text } from '../../../design-system/components/Typography';

// Styled Components
const ToolWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s6};
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.border};
  margin-bottom: ${props => props.theme.spacing.s6};
`;

const Tab = styled.button`
  padding: ${props => props.theme.spacing.s3} ${props => props.theme.spacing.s4};
  border: none;
  background: ${props => props.active ? props.theme.colors.primary : 'transparent'};
  color: ${props => props.active ? props.theme.colors.white : props.theme.colors.textMuted};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  cursor: pointer;
  border-radius: ${props => props.theme.borderRadius.medium} ${props => props.theme.borderRadius.medium} 0 0;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.active ? props.theme.colors.primary : props.theme.colors.hover};
    color: ${props => props.active ? props.theme.colors.white : props.theme.colors.text};
  }
`;

const AuditCard = styled(Card)`
  padding: ${props => props.theme.spacing.s5};
  margin-bottom: ${props => props.theme.spacing.s4};
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${props => {
      switch (props.status) {
        case 'Completada': return '#16a34a';
        case 'En Progreso': return '#d97706';
        case 'Planificada': return '#2563eb';
        default: return props.theme.colors.border;
      }
    }};
  }
`;

const AuditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${props => props.theme.spacing.s3};
`;

const AuditTitle = styled.h3`
  margin: 0;
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
`;

const StatusBadge = styled.span`
  padding: ${props => props.theme.spacing.s1} ${props => props.theme.spacing.s2};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.typography.fontSizes.note};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s1};
  
  ${props => {
    switch (props.status) {
      case 'Completada':
        return `
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        `;
      case 'En Progreso':
        return `
          background: #fffbeb;
          color: #d97706;
          border: 1px solid #fed7aa;
        `;
      case 'Planificada':
        return `
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #bfdbfe;
        `;
      default:
        return `
          background: ${props.theme.colors.surface};
          color: ${props.theme.colors.textMuted};
          border: 1px solid ${props.theme.colors.border};
        `;
    }
  }}
`;

const AuditInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.s3};
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.sm};
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
`;

const AuditForm = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.s6};
  margin-bottom: ${props => props.theme.spacing.s6};
  display: ${props => props.show ? 'block' : 'none'};
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.s4};
  margin-bottom: ${props => props.theme.spacing.s4};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s2};
`;

const FormLabel = styled.label`
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.sm};
`;

const FormInput = styled.input`
  padding: ${props => props.theme.spacing.s3};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: ${props => props.theme.typography.fontSizes.base};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const FormSelect = styled.select`
  padding: ${props => props.theme.spacing.s3};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: ${props => props.theme.typography.fontSizes.base};
  background: ${props => props.theme.colors.white};
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const FormTextarea = styled.textarea`
  padding: ${props => props.theme.spacing.s3};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.medium};
  font-size: ${props => props.theme.typography.fontSizes.base};
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 2px ${props => props.theme.colors.primary}20;
  }
`;

const FormActions = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.s3};
  justify-content: flex-end;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.s8};
  color: ${props => props.theme.colors.textMuted};
`;

const AuditoriaInterna = ({ initialData, onDataChange }) => {
  const [activeTab, setActiveTab] = useState('planificadas');
  const [audits, setAudits] = useState(initialData?.audits || []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: '',
    proceso: '',
    auditor: '',
    fecha: '',
    duracion: '',
    objetivo: '',
    alcance: '',
    status: 'Planificada'
  });

  // Guardar datos automáticamente
  useEffect(() => {
    if (onDataChange) {
      onDataChange({ audits });
    }
  }, [audits, onDataChange]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const auditData = {
      ...formData,
      id: Date.now(),
      fechaCreacion: new Date().toISOString(),
      hallazgos: []
    };

    setAudits(prev => [...prev, auditData]);
    
    // Reset form
    setFormData({
      titulo: '',
      proceso: '',
      auditor: '',
      fecha: '',
      duracion: '',
      objetivo: '',
      alcance: '',
      status: 'Planificada'
    });
    setShowForm(false);
  };

  const updateAuditStatus = (id, newStatus) => {
    setAudits(prev => prev.map(audit => 
      audit.id === id ? { ...audit, status: newStatus } : audit
    ));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completada': return <CheckCircle size={16} />;
      case 'En Progreso': return <Clock size={16} />;
      case 'Planificada': return <Calendar size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const filteredAudits = audits.filter(audit => {
    switch (activeTab) {
      case 'planificadas': return audit.status === 'Planificada';
      case 'progreso': return audit.status === 'En Progreso';
      case 'completadas': return audit.status === 'Completada';
      case 'todas': return true;
      default: return true;
    }
  });

  const tabs = [
    { id: 'planificadas', label: 'Planificadas', count: audits.filter(a => a.status === 'Planificada').length },
    { id: 'progreso', label: 'En Progreso', count: audits.filter(a => a.status === 'En Progreso').length },
    { id: 'completadas', label: 'Completadas', count: audits.filter(a => a.status === 'Completada').length },
    { id: 'todas', label: 'Todas', count: audits.length }
  ];

  return (
    <ToolWrapper>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text size="lg" weight="semiBold">
          Programa de Auditorías Internas
        </Text>
        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={() => setShowForm(!showForm)}
        >
          Nueva Auditoría
        </Button>
      </div>

      {/* Formulario */}
      <AuditForm show={showForm}>
        <form onSubmit={handleSubmit}>
          <FormGrid>
            <FormGroup>
              <FormLabel>Título de la Auditoría *</FormLabel>
              <FormInput
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleInputChange}
                placeholder="Ej: Auditoría proceso comercial"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Proceso a Auditar *</FormLabel>
              <FormSelect
                name="proceso"
                value={formData.proceso}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar proceso</option>
                <option value="Gestión de Calidad">Gestión de Calidad</option>
                <option value="Gestión Comercial">Gestión Comercial</option>
                <option value="Gestión de Producción">Gestión de Producción</option>
                <option value="Gestión de RRHH">Gestión de RRHH</option>
                <option value="Gestión Financiera">Gestión Financiera</option>
                <option value="Gestión de Compras">Gestión de Compras</option>
              </FormSelect>
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Auditor Responsable *</FormLabel>
              <FormInput
                type="text"
                name="auditor"
                value={formData.auditor}
                onChange={handleInputChange}
                placeholder="Nombre del auditor"
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Fecha Programada *</FormLabel>
              <FormInput
                type="date"
                name="fecha"
                value={formData.fecha}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Duración (horas)</FormLabel>
              <FormInput
                type="number"
                name="duracion"
                value={formData.duracion}
                onChange={handleInputChange}
                placeholder="4"
                min="1"
                max="24"
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Estado</FormLabel>
              <FormSelect
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="Planificada">Planificada</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completada">Completada</option>
              </FormSelect>
            </FormGroup>
          </FormGrid>
          
          <FormGrid>
            <FormGroup>
              <FormLabel>Objetivo de la Auditoría</FormLabel>
              <FormTextarea
                name="objetivo"
                value={formData.objetivo}
                onChange={handleInputChange}
                placeholder="Describe el objetivo principal de esta auditoría..."
              />
            </FormGroup>
            
            <FormGroup>
              <FormLabel>Alcance</FormLabel>
              <FormTextarea
                name="alcance"
                value={formData.alcance}
                onChange={handleInputChange}
                placeholder="Define el alcance y límites de la auditoría..."
              />
            </FormGroup>
          </FormGrid>
          
          <FormActions>
            <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary">
              Crear Auditoría
            </Button>
          </FormActions>
        </form>
      </AuditForm>

      {/* Tabs */}
      <TabsContainer>
        {tabs.map(tab => (
          <Tab
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label} ({tab.count})
          </Tab>
        ))}
      </TabsContainer>

      {/* Lista de auditorías */}
      {filteredAudits.length === 0 ? (
        <EmptyState>
          <FileText size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
          <Text>No hay auditorías {activeTab === 'todas' ? 'registradas' : `en estado "${activeTab}"`}</Text>
          <Text size="sm" color="muted">
            Crea tu primera auditoría usando el botón "Nueva Auditoría"
          </Text>
        </EmptyState>
      ) : (
        filteredAudits.map(audit => (
          <AuditCard key={audit.id} status={audit.status}>
            <AuditHeader>
              <AuditTitle>{audit.titulo}</AuditTitle>
              <StatusBadge status={audit.status}>
                {getStatusIcon(audit.status)}
                {audit.status}
              </StatusBadge>
            </AuditHeader>
            
            <AuditInfo>
              <InfoItem>
                <Users size={16} />
                Proceso: {audit.proceso}
              </InfoItem>
              <InfoItem>
                <Users size={16} />
                Auditor: {audit.auditor}
              </InfoItem>
              <InfoItem>
                <Calendar size={16} />
                Fecha: {new Date(audit.fecha).toLocaleDateString('es-ES')}
              </InfoItem>
              {audit.duracion && (
                <InfoItem>
                  <Clock size={16} />
                  Duración: {audit.duracion}h
                </InfoItem>
              )}
            </AuditInfo>
            
            {audit.objetivo && (
              <div style={{ marginTop: '12px' }}>
                <Text size="sm" weight="medium">Objetivo:</Text>
                <Text size="sm" color="muted">{audit.objetivo}</Text>
              </div>
            )}
            
            <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
              {audit.status === 'Planificada' && (
                <Button
                  size="small"
                  variant="outline"
                  onClick={() => updateAuditStatus(audit.id, 'En Progreso')}
                >
                  Iniciar
                </Button>
              )}
              {audit.status === 'En Progreso' && (
                <Button
                  size="small"
                  variant="primary"
                  onClick={() => updateAuditStatus(audit.id, 'Completada')}
                >
                  Completar
                </Button>
              )}
            </div>
          </AuditCard>
        ))
      )}
    </ToolWrapper>
  );
};

export default AuditoriaInterna;