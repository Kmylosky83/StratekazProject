// Export Service - Servicio profesional para exportar datos a PDF y Excel
// Implementación optimizada para herramientas freemium

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

class ExportService {
  constructor() {
    this.companyName = 'StrateKaz';
    this.websiteUrl = 'www.stratekaz.com';
  }

  // Configurar watermark para versión gratuita
  addWatermark(doc, isFreemium = true) {
    if (!isFreemium) return;

    const pageCount = doc.internal.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setTextColor(200, 200, 200);
      doc.setFontSize(8);
      doc.text(`Generado con ${this.companyName} - ${this.websiteUrl}`, 15, doc.internal.pageSize.height - 10);
    }
  }

  // Exportar datos a PDF
  exportToPDF(data, options = {}) {
    try {
      const {
        title = 'Documento StrateKaz',
        filename = 'documento-stratekaz.pdf',
        orientation = 'portrait',
        format = 'a4',
        isFreemium = true,
        tableData = null,
        customContent = null
      } = options;

      const doc = new jsPDF({
        orientation,
        unit: 'mm',
        format
      });

      // Header del documento
      this.addPDFHeader(doc, title);

      let yPosition = 40;

      // Contenido personalizado
      if (customContent && typeof customContent === 'function') {
        yPosition = customContent(doc, yPosition);
      }

      // Datos en formato tabla
      if (tableData) {
        yPosition = this.addTableToPDF(doc, tableData, yPosition);
      }

      // Datos generales
      if (data && !tableData && !customContent) {
        yPosition = this.addDataToPDF(doc, data, yPosition);
      }

      // Footer y watermark
      this.addPDFFooter(doc);
      this.addWatermark(doc, isFreemium);

      // Descargar archivo
      doc.save(filename);

      return { success: true, filename };
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      return { success: false, error: error.message };
    }
  }

  // Agregar header al PDF
  addPDFHeader(doc, title) {
    // Logo/Marca
    doc.setFontSize(16);
    doc.setTextColor(236, 38, 143); // Color primario StrateKaz
    doc.text(this.companyName, 15, 20);
    
    // Título
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(title, 15, 30);
    
    // Fecha
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Fecha: ${new Date().toLocaleDateString('es-ES')}`, 15, 35);
    
    // Línea separadora
    doc.setDrawColor(236, 38, 143);
    doc.line(15, 37, doc.internal.pageSize.width - 15, 37);
  }

  // Agregar footer al PDF
  addPDFFooter(doc) {
    const pageCount = doc.internal.getNumberOfPages();
    
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 30, doc.internal.pageSize.height - 15);
    }
  }

  // Agregar datos como texto al PDF
  addDataToPDF(doc, data, startY) {
    let yPosition = startY;
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);

    if (typeof data === 'object') {
      Object.keys(data).forEach(key => {
        if (yPosition > doc.internal.pageSize.height - 30) {
          doc.addPage();
          yPosition = 20;
        }
        
        doc.setFont(undefined, 'bold');
        doc.text(`${key}:`, 15, yPosition);
        doc.setFont(undefined, 'normal');
        doc.text(String(data[key]), 50, yPosition);
        yPosition += 8;
      });
    } else {
      doc.text(String(data), 15, yPosition);
      yPosition += 10;
    }

    return yPosition;
  }

  // Agregar tabla al PDF
  addTableToPDF(doc, tableData, startY) {
    const { headers, rows, title } = tableData;

    if (title) {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text(title, 15, startY);
      startY += 10;
    }

    doc.autoTable({
      head: [headers],
      body: rows,
      startY: startY,
      theme: 'grid',
      headStyles: {
        fillColor: [236, 38, 143],
        textColor: [255, 255, 255],
        fontStyle: 'bold'
      },
      bodyStyles: {
        textColor: [0, 0, 0]
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245]
      },
      margin: { top: 20, right: 15, bottom: 20, left: 15 }
    });

    return doc.lastAutoTable.finalY + 10;
  }

  // Exportar datos a Excel
  exportToExcel(data, options = {}) {
    try {
      const {
        filename = 'documento-stratekaz.xlsx',
        sheetName = 'Datos',
        isFreemium = true,
        multipleSheets = null
      } = options;

      const workbook = XLSX.utils.book_new();

      if (multipleSheets) {
        // Múltiples hojas
        multipleSheets.forEach(sheet => {
          const worksheet = this.createWorksheet(sheet.data, sheet.headers);
          XLSX.utils.book_append_sheet(workbook, worksheet, sheet.name);
        });
      } else {
        // Hoja única
        const worksheet = this.createWorksheet(data);
        XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
      }

      // Agregar información de empresa si es freemium
      if (isFreemium) {
        this.addExcelWatermark(workbook);
      }

      // Generar y descargar archivo
      XLSX.writeFile(workbook, filename);

      return { success: true, filename };
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      return { success: false, error: error.message };
    }
  }

  // Crear worksheet para Excel
  createWorksheet(data, customHeaders = null) {
    let worksheet;

    if (Array.isArray(data)) {
      // Array de objetos
      worksheet = XLSX.utils.json_to_sheet(data);
    } else if (typeof data === 'object') {
      // Objeto simple
      const arrayData = Object.keys(data).map(key => ({
        Campo: key,
        Valor: data[key]
      }));
      worksheet = XLSX.utils.json_to_sheet(arrayData);
    } else {
      // Datos primitivos
      worksheet = XLSX.utils.aoa_to_sheet([['Datos'], [data]]);
    }

    // Ajustar ancho de columnas
    const colWidths = [];
    const range = XLSX.utils.decode_range(worksheet['!ref']);
    
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let maxWidth = 10;
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
        if (cell && cell.v) {
          const cellLength = String(cell.v).length;
          maxWidth = Math.max(maxWidth, cellLength);
        }
      }
      colWidths.push({ wch: Math.min(maxWidth + 2, 50) });
    }
    
    worksheet['!cols'] = colWidths;

    return worksheet;
  }

  // Agregar watermark a Excel
  addExcelWatermark(workbook) {
    const infoSheet = XLSX.utils.aoa_to_sheet([
      [`Generado con ${this.companyName}`],
      [`Sitio web: ${this.websiteUrl}`],
      [`Fecha: ${new Date().toLocaleDateString('es-ES')}`],
      [''],
      ['Herramientas gratuitas disponibles en nuestra plataforma']
    ]);

    XLSX.utils.book_append_sheet(workbook, infoSheet, 'Información');
  }

  // Exportar múltiples formatos
  exportMultipleFormats(data, options = {}) {
    const results = {};

    if (options.pdf !== false) {
      results.pdf = this.exportToPDF(data, { ...options, filename: options.filename?.replace(/\.[^/.]+$/, '.pdf') });
    }

    if (options.excel !== false) {
      results.excel = this.exportToExcel(data, { ...options, filename: options.filename?.replace(/\.[^/.]+$/, '.xlsx') });
    }

    return results;
  }

  // Validar datos antes de exportar
  validateExportData(data) {
    if (!data) {
      return { valid: false, error: 'No hay datos para exportar' };
    }

    if (typeof data === 'object' && Object.keys(data).length === 0) {
      return { valid: false, error: 'El objeto de datos está vacío' };
    }

    if (Array.isArray(data) && data.length === 0) {
      return { valid: false, error: 'El array de datos está vacío' };
    }

    return { valid: true };
  }
}

// Singleton instance
const exportService = new ExportService();

export default exportService;