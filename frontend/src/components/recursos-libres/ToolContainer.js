// ToolContainer - Contenedor profesional para herramientas SPA
// Manejo de routing dinámico y integración con servicios

import React, { useState, useEffect, Suspense } from 'react';
import styled from 'styled-components';
import { ArrowLeft, Download, Upload, Save, RotateCcw, Info, AlertTriangle, FileText, Database, CheckCircle } from 'lucide-react';
import { Button } from '../../design-system/components';
import { Text } from '../../design-system/components/Typography';
import localStorageManager from '../../services/localStorage/LocalStorageManager';
import exportService from '../../services/fileHandlers/ExportService';

// Styled Components
const ToolWrapper = styled.div`
  min-height: 100vh;
  background: ${props => props.theme.colors.surface};
  display: flex;
  flex-direction: column;
`;

const ToolHeader = styled.header`
  background: ${props => props.theme.header?.background || props.theme.colors.white};
  border-bottom: 1px solid ${props => props.theme.header?.border || props.theme.colors.borderSubtle};
  padding: ${props => props.theme.spacing.s4} 0;
  position: sticky;
  top: 0;
  z-index: ${props => props.theme.zIndex.sticky};
  box-shadow: ${props => props.theme.shadows.card};
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.s4};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${props => props.theme.spacing.s4};
  
  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    flex-direction: column;
    gap: ${props => props.theme.spacing.s3};
  }
`;

const ToolInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s4};
  flex: 1;
`;

const BackButton = styled(Button)`
  min-width: auto;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    padding: ${props => props.theme.spacing.s2};
  }
`;

const ToolDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s1};
`;

const ToolTitle = styled.h1`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.cardTitle};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  margin: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.fontSizes.base};
  }
`;

const ToolSubtitle = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  margin: 0;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    font-size: ${props => props.theme.typography.fontSizes.note};
  }
`;

const ToolActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s2};
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    width: 100%;
    justify-content: center;
  }
`;

const ImportIndicator = styled.div`
  position: relative;
  display: inline-flex;
`;

const ImportBadge = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${props => props.theme.colors.success};
  color: white;
  font-size: 10px;
  font-weight: ${props => props.theme.typography.fontWeights.bold};
  padding: 2px 6px;
  border-radius: ${props => props.theme.borderRadius.full};
  min-width: 16px;
  text-align: center;
  box-shadow: ${props => props.theme.shadows.card};
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 4px solid transparent;
    border-top-color: ${props => props.theme.colors.success};
  }
`;

const ExportIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.s1};
`;

const FileTypeTag = styled.span`
  background: ${props => props.theme.colors.primarySubtle || 'rgba(236, 38, 143, 0.1)'};
  color: ${props => props.theme.colors.primary};
  font-size: 10px;
  font-weight: ${props => props.theme.typography.fontWeights.semibold};
  padding: 2px 6px;
  border-radius: ${props => props.theme.borderRadius.small};
  text-transform: uppercase;
`;

const ToolContent = styled.main`
  flex: 1;
  padding: ${props => props.theme.spacing.s6} 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.s4};
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s4};
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid ${props => props.theme.colors.borderSubtle};
  border-top: 4px solid ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  flex-direction: column;
  gap: ${props => props.theme.spacing.s4};
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.danger};
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
`;

const InfoBanner = styled.div`
  background: ${props => props.theme.card?.background || props.theme.colors.backgroundLight};
  border: 1px solid ${props => props.theme.card?.border || props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.large};
  padding: ${props => props.theme.spacing.s4};
  margin-bottom: ${props => props.theme.spacing.s6};
  display: flex;
  align-items: flex-start;
  gap: ${props => props.theme.spacing.s3};
`;

const InfoIcon = styled.div`
  color: ${props => props.theme.buttonPrimary?.background || props.theme.colors.primary};
  flex-shrink: 0;
  margin-top: 2px;
`;

const InfoText = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.typography.fontSizes.base};
  font-weight: ${props => props.theme.typography.fontWeights.semiBold};
  font-family: ${props => props.theme.typography.fontFamilies.primary};
  margin: 0 0 ${props => props.theme.spacing.s1} 0;
`;

const InfoDescription = styled.p`
  color: ${props => props.theme.colors.textMuted};
  font-size: ${props => props.theme.typography.fontSizes.sm};
  font-family: ${props => props.theme.typography.fontFamilies.secondary};
  margin: 0;
  line-height: ${props => props.theme.typography.lineHeights.normal};
`;

// Hook para cargar herramientas dinámicamente
const useToolLoader = (pillar, toolId) => {
  const [ToolComponent, setToolComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!pillar || !toolId) return;

    const loadTool = async () => {
      try {
        setLoading(true);
        setError(null);

        // Intentar importación dinámica de la herramienta
        const toolModule = await import(`../../pages/herramientas/${pillar}/${toolId}.js`);
        setToolComponent(() => toolModule.default);
      } catch (err) {
        console.error('Error loading tool:', err);
        
        // Mensaje de error más específico según el caso
        if (toolId === 'diagnostico-9001') {
          setError({
            type: 'LOADING_ERROR',
            message: 'Error al cargar el Diagnóstico ISO 9001',
            suggestion: 'Por favor, recarga la página e intenta nuevamente'
          });
        } else {
          setError({
            type: 'NOT_FOUND',
            message: `La herramienta "${toolId}" está en desarrollo`,
            suggestion: 'Por ahora, solo el "Diagnóstico ISO 9001" está completamente funcional'
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadTool();
  }, [pillar, toolId]);

  return { ToolComponent, loading, error };
};

const ToolContainer = ({ 
  pillar, 
  toolId, 
  toolName, 
  toolDescription, 
  onBack 
}) => {
  const { ToolComponent, loading, error } = useToolLoader(pillar, toolId);
  const [toolData, setToolData] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);

  // Cargar datos guardados al montar
  useEffect(() => {
    if (pillar && toolId) {
      const result = localStorageManager.getData(pillar, toolId);
      if (result.success) {
        setToolData(result.data);
        setLastSaved(result.metadata.timestamp);
      }
    }
  }, [pillar, toolId]);

  // Guardar datos automáticamente
  const handleSaveData = (data) => {
    if (!pillar || !toolId) return;

    const result = localStorageManager.setData(pillar, toolId, data);
    if (result.success) {
      setToolData(data);
      setLastSaved(new Date().toISOString());
    }
  };

  // Exportar a PDF
  const handleExportPDF = () => {
    if (!toolData) {
      alert('No hay datos para exportar');
      return;
    }

    exportService.exportToPDF(toolData, {
      title: toolName,
      filename: `${toolName.toLowerCase().replace(/\s+/g, '-')}.pdf`,
      isFreemium: true
    });
  };

  // Exportar a Excel
  const handleExportExcel = () => {
    if (!toolData) {
      alert('No hay datos para exportar');
      return;
    }

    exportService.exportToExcel(toolData, {
      filename: `${toolName.toLowerCase().replace(/\s+/g, '-')}.xlsx`,
      sheetName: toolName,
      isFreemium: true
    });
  };

  // Limpiar datos
  const handleClearData = () => {
    if (window.confirm('¿Estás seguro de que quieres limpiar todos los datos?')) {
      localStorageManager.removeData(pillar, toolId);
      setToolData(null);
      setLastSaved(null);
      window.location.reload();
    }
  };

  // Estado para manejo de importación
  const [importing, setImporting] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);
  
  // Importar archivo con funcionalidad real
  const handleImportFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.xlsx,.csv';
    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;
      
      setImporting(true);
      setImportSuccess(false);
      
      try {
        const fileExtension = file.name.split('.').pop().toLowerCase();
        let importedData = null;
        
        if (fileExtension === 'json') {
          // Importar JSON
          const text = await file.text();
          importedData = JSON.parse(text);
        } else if (fileExtension === 'csv') {
          // Importar CSV (básico)
          const text = await file.text();
          const lines = text.split('\n');
          const headers = lines[0].split(',');
          const data = lines.slice(1).map(line => {
            const values = line.split(',');
            const obj = {};
            headers.forEach((header, index) => {
              obj[header.trim()] = values[index]?.trim() || '';
            });
            return obj;
          });
          importedData = { csvData: data, importedAt: new Date().toISOString() };
        } else {
          throw new Error('Formato no soportado. Use JSON o CSV.');
        }
        
        // Guardar datos importados
        handleSaveData({
          ...toolData,
          ...importedData,
          importedFrom: file.name,
          importedAt: new Date().toISOString()
        });
        
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
        
      } catch (error) {
        console.error('Error importing file:', error);
        alert('Error al importar archivo: ' + error.message);
      } finally {
        setImporting(false);
      }
    };
    input.click();
  };

  if (loading) {
    return (
      <ToolWrapper>
        <LoadingContainer>
          <LoadingSpinner />
          <Text>Cargando herramienta...</Text>
        </LoadingContainer>
      </ToolWrapper>
    );
  }

  if (error) {
    return (
      <ToolWrapper>
        <ErrorContainer>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <AlertTriangle size={48} color="#ef4444" style={{ marginBottom: '16px' }} />
            
            <h2 style={{ color: '#1f2937', marginBottom: '8px', fontSize: '24px' }}>
              {error.type === 'NOT_FOUND' ? 'Herramienta en desarrollo' : 'Error de carga'}
            </h2>
            
            <ErrorMessage style={{ marginBottom: '16px' }}>
              {error.message || error}
            </ErrorMessage>
            
            {error.suggestion && (
              <div style={{ 
                background: '#f3f4f6', 
                padding: '12px', 
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px',
                color: '#374151'
              }}>
                💡 <strong>Sugerencia:</strong> {error.suggestion}
              </div>
            )}
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              {error.type === 'LOADING_ERROR' && (
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                  style={{ marginRight: '8px' }}
                >
                  Recargar página
                </Button>
              )}
              <Button variant="primary" onClick={onBack}>
                Ver otras herramientas
              </Button>
            </div>
          </div>
        </ErrorContainer>
      </ToolWrapper>
    );
  }

  return (
    <ToolWrapper>
      <ToolHeader>
        <HeaderContent>
          <ToolInfo>
            <BackButton
              variant="outline"
              size="medium"
              icon={<ArrowLeft size={20} />}
              onClick={onBack}
            >
              Volver
            </BackButton>
            
            <ToolDetails>
              <ToolTitle>{toolName}</ToolTitle>
              <ToolSubtitle>{toolDescription}</ToolSubtitle>
            </ToolDetails>
          </ToolInfo>

          <ToolActions>
            <ImportIndicator>
              <Button
                variant="outline"
                size="small"
                icon={importing ? <Database size={16} /> : <Upload size={16} />}
                onClick={handleImportFile}
                disabled={importing}
              >
                {importing ? 'Importando...' : 'Importar'}
              </Button>
              {importSuccess && (
                <ImportBadge>
                  <CheckCircle size={12} />
                </ImportBadge>
              )}
            </ImportIndicator>
            
            <ExportIndicator>
              <Button
                variant="outline"
                size="small"
                icon={<Download size={16} />}
                onClick={handleExportPDF}
                disabled={!toolData}
              >
                PDF
              </Button>
              {toolData && <FileTypeTag>PDF</FileTypeTag>}
            </ExportIndicator>
            
            <ExportIndicator>
              <Button
                variant="outline"
                size="small"
                icon={<Download size={16} />}
                onClick={handleExportExcel}
                disabled={!toolData}
              >
                Excel
              </Button>
              {toolData && <FileTypeTag>XLSX</FileTypeTag>}
            </ExportIndicator>
            
            <Button
              variant="outline"
              size="small"
              icon={<RotateCcw size={16} />}
              onClick={handleClearData}
              disabled={!toolData}
            >
              Limpiar
            </Button>
          </ToolActions>
        </HeaderContent>
      </ToolHeader>

      <ToolContent>
        <ContentWrapper>
          <InfoBanner>
            <InfoIcon>
              <Info size={20} />
            </InfoIcon>
            <InfoText>
              <InfoTitle>Herramienta Gratuita</InfoTitle>
              <InfoDescription>
                Uso ilimitado con datos almacenados localmente. 
                <strong>Importa:</strong> JSON, CSV | <strong>Exporta:</strong> PDF, Excel sin restricciones.
                {toolData?.importedFrom && ` | Importado desde: ${toolData.importedFrom}`}
                {lastSaved && ` | Última modificación: ${new Date(lastSaved).toLocaleString('es-ES')}`}
              </InfoDescription>
            </InfoText>
          </InfoBanner>

          <Suspense fallback={
            <LoadingContainer>
              <LoadingSpinner />
              <Text>Cargando componente...</Text>
            </LoadingContainer>
          }>
            {ToolComponent && (
              <ToolComponent
                initialData={toolData}
                onDataChange={handleSaveData}
                pillar={pillar}
                toolId={toolId}
              />
            )}
          </Suspense>
        </ContentWrapper>
      </ToolContent>
    </ToolWrapper>
  );
};

export default ToolContainer;