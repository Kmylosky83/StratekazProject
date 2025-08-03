// Sistema de Diseño - Tokens de Sombras
// Extraído de frontend/src/styles/variables.css

export const shadows = {
  // Sombras de Tarjetas
  card: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.05)',
  hover: '0 0.5rem 1rem rgba(236, 38, 143, 0.2)',
  
  // Sombras de Botones
  button: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
  buttonSecondary: '0 0.5rem 1rem rgba(0, 0, 0, 0.1)',
  
  // Sombras de Tarjetas de Selección
  selectionCard: '0 15px 30px rgba(236, 38, 143, 0.15)',
  selectionCardSelected: '0 15px 30px rgba(236, 38, 143, 0.2)',
  
  // Sombra de Botón de Tarjeta Activo
  cardButtonActive: '0 0.5rem 1rem rgba(236, 38, 143, 0.15)',
  
  // Valor de box-shadow-sm (parece ser un error en el CSS original - debería ser una sombra)
  boxShadowSm: '#d11f7d' // Este valor parece incorrecto en el CSS original
};

export default shadows;