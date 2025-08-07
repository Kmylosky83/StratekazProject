// Matriz de Riesgos - Herramienta SPA para ISO
// Ejemplo de herramienta freemium con funcionalidad completa

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Plus, Trash2, Edit3, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button, Card } from '../../../design-system/components';
import { Text } from '../../../design-system/components/Typography';

// Styled Components
const ToolWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s6};
`;

const ControlsSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.s3};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const StatsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${props => props.theme.spacing.s4};
  margin-bottom: ${props => props.theme.spacing.s6};
`;

const StatCard = styled(Card)`
  text-align: center;
  padding: ${props => props.theme.spacing.s4};
`;

const StatNumber = styled.div`
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.s2};
`;

const StatLabel = styled.div`
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.textMuted};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
`;

const RiskForm = styled.form`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.s6};
  margin-bottom: ${props => props.theme.spacing.s6};
  display: ${props => props.showForm ? 'block' : 'none'};
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
  transition: border-color 0.2s ease;
  
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
  cursor: pointer;
  
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
  min-height: 80px;
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

const RisksTable = styled.div`
  background: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s4};
  background: ${props => props.theme.colors.backgroundLight};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  color: ${props => props.theme.colors.text};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.s2};
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr auto;
  gap: ${props => props.theme.spacing.s3};
  padding: ${props => props.theme.spacing.s4};
  border-bottom: 1px solid ${props => props.theme.colors.borderSubtle};
  align-items: center;
  transition: background-color 0.2s ease;
  
  &:hover {
    background: ${props => props.theme.colors.backgroundLight};
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: ${props => props.theme.spacing.s2};
  }
`;

const RiskLevel = styled.span`
  padding: ${props => props.theme.spacing.s1} ${props => props.theme.spacing.s2};
  border-radius: ${props => props.theme.borderRadius.small};
  font-size: ${props => props.theme.typography.fontSizes.note};
  font-weight: ${props => props.theme.typography.fontWeights.medium};
  text-transform: uppercase;
  
  ${props => {
    switch (props.level) {
      case 'Alto':
        return `
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
        `;
      case 'Medio':
        return `
          background: #fffbeb;
          color: #d97706;
          border: 1px solid #fed7aa;
        `;
      case 'Bajo':
        return `
          background: #f0fdf4;
          color: #16a34a;
          border: 1px solid #bbf7d0;
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

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.s2};
  border: none;
  border-radius: ${props => props.theme.borderRadius.small};
  background: ${props => props.theme.colors.surface};
  color: ${props => props.theme.colors.textMuted};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${props => props.variant === 'danger' ? props.theme.colors.danger : props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.s8};
  color: ${props => props.theme.colors.textMuted};
`;

// Componente principal
const MatrizRiesgos = ({ initialData, onDataChange }) => {
  const [risks, setRisks] = useState(initialData?.risks || []);
  const [showForm, setShowForm] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);
  const [formData, setFormData] = useState({
    descripcion: '',
    probabilidad: '1',
    impacto: '1',
    controles: '',
    responsable: ''
  });

  // Calcular nivel de riesgo
  const calculateRiskLevel = (probabilidad, impacto) => {
    const score = parseInt(probabilidad) * parseInt(impacto);
    if (score >= 15) return 'Alto';
    if (score >= 8) return 'Medio';
    return 'Bajo';
  };

  // Guardar datos automáticamente
  useEffect(() => {
    if (onDataChange) {
      onDataChange({ risks });
    }
  }, [risks, onDataChange]);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Agregar/editar riesgo
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const riskData = {
      ...formData,
      id: editingRisk?.id || Date.now(),
      nivelRiesgo: calculateRiskLevel(formData.probabilidad, formData.impacto),
      fechaCreacion: editingRisk?.fechaCreacion || new Date().toISOString()
    };

    if (editingRisk) {
      setRisks(prev => prev.map(r => r.id === editingRisk.id ? riskData : r));
    } else {
      setRisks(prev => [...prev, riskData]);
    }

    // Resetear formulario
    setFormData({
      descripcion: '',
      probabilidad: '1',
      impacto: '1',
      controles: '',
      responsable: ''
    });
    setShowForm(false);
    setEditingRisk(null);
  };

  // Editar riesgo
  const handleEdit = (risk) => {
    setFormData({
      descripcion: risk.descripcion,
      probabilidad: risk.probabilidad,
      impacto: risk.impacto,
      controles: risk.controles,
      responsable: risk.responsable
    });
    setEditingRisk(risk);
    setShowForm(true);
  };

  // Eliminar riesgo
  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este riesgo?')) {
      setRisks(prev => prev.filter(r => r.id !== id));
    }
  };

  // Cancelar edición
  const handleCancel = () => {
    setFormData({
      descripcion: '',
      probabilidad: '1',
      impacto: '1',
      controles: '',
      responsable: ''
    });
    setShowForm(false);
    setEditingRisk(null);
  };

  // Calcular estadísticas
  const stats = {
    total: risks.length,
    alto: risks.filter(r => r.nivelRiesgo === 'Alto').length,
    medio: risks.filter(r => r.nivelRiesgo === 'Medio').length,
    bajo: risks.filter(r => r.nivelRiesgo === 'Bajo').length
  };

  return (
    <ToolWrapper>
      {/* Estadísticas */}
      <StatsCards>
        <StatCard>
          <StatNumber>{stats.total}</StatNumber>
          <StatLabel>Total de Riesgos</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber style={{ color: '#dc2626' }}>{stats.alto}</StatNumber>
          <StatLabel>Riesgo Alto</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber style={{ color: '#d97706' }}>{stats.medio}</StatNumber>
          <StatLabel>Riesgo Medio</StatLabel>
        </StatCard>
        <StatCard>
          <StatNumber style={{ color: '#16a34a' }}>{stats.bajo}</StatNumber>
          <StatLabel>Riesgo Bajo</StatLabel>
        </StatCard>
      </StatsCards>

      {/* Controles */}
      <ControlsSection>
        <Text size="lg" weight="semiBold">
          Matriz de Identificación de Riesgos
        </Text>
        <Button
          variant="primary"
          icon={<Plus size={20} />}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancelar' : 'Nuevo Riesgo'}
        </Button>
      </ControlsSection>

      {/* Formulario */}
      <RiskForm showForm={showForm} onSubmit={handleSubmit}>
        <FormGrid>
          <FormGroup>
            <FormLabel>Descripción del Riesgo *</FormLabel>
            <FormTextarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Describe el riesgo identificado..."
              required
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Probabilidad (1-5) *</FormLabel>
            <FormSelect
              name="probabilidad"
              value={formData.probabilidad}
              onChange={handleInputChange}
              required
            >
              <option value="1">1 - Muy Baja</option>
              <option value="2">2 - Baja</option>
              <option value="3">3 - Media</option>
              <option value="4">4 - Alta</option>
              <option value="5">5 - Muy Alta</option>
            </FormSelect>
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Impacto (1-5) *</FormLabel>
            <FormSelect
              name="impacto"
              value={formData.impacto}
              onChange={handleInputChange}
              required
            >
              <option value="1">1 - Muy Bajo</option>
              <option value="2">2 - Bajo</option>
              <option value="3">3 - Medio</option>
              <option value="4">4 - Alto</option>
              <option value="5">5 - Muy Alto</option>
            </FormSelect>
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Controles Existentes</FormLabel>
            <FormTextarea
              name="controles"
              value={formData.controles}
              onChange={handleInputChange}
              placeholder="Describe los controles actuales..."
            />
          </FormGroup>
          
          <FormGroup>
            <FormLabel>Responsable</FormLabel>
            <FormInput
              type="text"
              name="responsable"
              value={formData.responsable}
              onChange={handleInputChange}
              placeholder="Nombre del responsable"
            />
          </FormGroup>
        </FormGrid>
        
        <FormActions>
          <Button type="button" variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            {editingRisk ? 'Actualizar' : 'Agregar'} Riesgo
          </Button>
        </FormActions>
      </RiskForm>

      {/* Tabla de riesgos */}
      <RisksTable>
        <TableHeader>
          <div>Descripción</div>
          <div>Probabilidad</div>
          <div>Impacto</div>
          <div>Nivel</div>
          <div>Responsable</div>
          <div>Acciones</div>
        </TableHeader>
        
        {risks.length === 0 ? (
          <EmptyState>
            <AlertTriangle size={48} style={{ marginBottom: '16px', opacity: 0.5 }} />
            <Text>No hay riesgos registrados</Text>
            <Text size="sm" color="muted">
              Agrega tu primer riesgo usando el botón "Nuevo Riesgo"
            </Text>
          </EmptyState>
        ) : (
          risks.map(risk => (
            <TableRow key={risk.id}>
              <div>{risk.descripcion}</div>
              <div>{risk.probabilidad}</div>
              <div>{risk.impacto}</div>
              <div>
                <RiskLevel level={risk.nivelRiesgo}>
                  {risk.nivelRiesgo}
                </RiskLevel>
              </div>
              <div>{risk.responsable || 'No asignado'}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <ActionButton onClick={() => handleEdit(risk)}>
                  <Edit3 size={16} />
                </ActionButton>
                <ActionButton 
                  variant="danger" 
                  onClick={() => handleDelete(risk.id)}
                >
                  <Trash2 size={16} />
                </ActionButton>
              </div>
            </TableRow>
          ))
        )}
      </RisksTable>
    </ToolWrapper>
  );
};

export default MatrizRiesgos;