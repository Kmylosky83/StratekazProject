// LocalStorage Manager - Servicio centralizado para persistencia de datos
// Manejo profesional de datos locales para herramientas freemium

class LocalStorageManager {
  constructor() {
    this.prefix = 'stratekaz_';
    this.version = '1.0';
  }

  // Generar clave con prefijo y namespace
  generateKey(namespace, key) {
    return `${this.prefix}${namespace}_${key}`;
  }

  // Guardar datos con validación y compresión
  setData(namespace, key, data) {
    try {
      const fullKey = this.generateKey(namespace, key);
      const dataWithMeta = {
        version: this.version,
        timestamp: new Date().toISOString(),
        data: data
      };
      
      const serializedData = JSON.stringify(dataWithMeta);
      localStorage.setItem(fullKey, serializedData);
      
      return { success: true, key: fullKey };
    } catch (error) {
      console.error('Error saving to localStorage:', error);
      return { success: false, error: error.message };
    }
  }

  // Obtener datos con validación
  getData(namespace, key) {
    try {
      const fullKey = this.generateKey(namespace, key);
      const rawData = localStorage.getItem(fullKey);
      
      if (!rawData) {
        return { success: false, data: null, error: 'No data found' };
      }

      const parsedData = JSON.parse(rawData);
      
      // Validar estructura de datos
      if (!parsedData.version || !parsedData.data) {
        return { success: false, data: null, error: 'Invalid data structure' };
      }

      return { 
        success: true, 
        data: parsedData.data,
        metadata: {
          version: parsedData.version,
          timestamp: parsedData.timestamp
        }
      };
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return { success: false, data: null, error: error.message };
    }
  }

  // Eliminar datos específicos
  removeData(namespace, key) {
    try {
      const fullKey = this.generateKey(namespace, key);
      localStorage.removeItem(fullKey);
      return { success: true };
    } catch (error) {
      console.error('Error removing from localStorage:', error);
      return { success: false, error: error.message };
    }
  }

  // Listar todas las claves de un namespace
  listKeys(namespace) {
    try {
      const prefix = `${this.prefix}${namespace}_`;
      const keys = [];
      
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(prefix)) {
          keys.push(key.replace(prefix, ''));
        }
      }
      
      return { success: true, keys };
    } catch (error) {
      console.error('Error listing keys:', error);
      return { success: false, keys: [], error: error.message };
    }
  }

  // Limpiar namespace completo
  clearNamespace(namespace) {
    try {
      const { keys } = this.listKeys(namespace);
      keys.forEach(key => {
        this.removeData(namespace, key);
      });
      return { success: true, cleared: keys.length };
    } catch (error) {
      console.error('Error clearing namespace:', error);
      return { success: false, error: error.message };
    }
  }

  // Obtener estadísticas de uso
  getStorageStats() {
    try {
      let totalSize = 0;
      let stratekazSize = 0;
      const namespaces = new Set();

      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const size = (key.length + value.length) * 2; // aprox bytes

        totalSize += size;

        if (key.startsWith(this.prefix)) {
          stratekazSize += size;
          const namespace = key.split('_')[1];
          if (namespace) namespaces.add(namespace);
        }
      }

      return {
        success: true,
        stats: {
          totalItems: localStorage.length,
          totalSize: this.formatBytes(totalSize),
          stratekazSize: this.formatBytes(stratekazSize),
          namespaces: Array.from(namespaces),
          usage: ((stratekazSize / totalSize) * 100).toFixed(2) + '%'
        }
      };
    } catch (error) {
      console.error('Error getting storage stats:', error);
      return { success: false, error: error.message };
    }
  }

  // Formatear bytes a tamaño legible
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Exportar todos los datos de un namespace
  exportNamespaceData(namespace) {
    try {
      const { keys } = this.listKeys(namespace);
      const exportData = {};

      keys.forEach(key => {
        const result = this.getData(namespace, key);
        if (result.success) {
          exportData[key] = {
            data: result.data,
            metadata: result.metadata
          };
        }
      });

      return {
        success: true,
        exportData: {
          namespace,
          version: this.version,
          exportDate: new Date().toISOString(),
          data: exportData
        }
      };
    } catch (error) {
      console.error('Error exporting namespace data:', error);
      return { success: false, error: error.message };
    }
  }

  // Importar datos a un namespace
  importNamespaceData(importData) {
    try {
      if (!importData.namespace || !importData.data) {
        throw new Error('Invalid import data structure');
      }

      const { namespace, data } = importData;
      let imported = 0;
      let errors = [];

      Object.keys(data).forEach(key => {
        const result = this.setData(namespace, key, data[key].data);
        if (result.success) {
          imported++;
        } else {
          errors.push({ key, error: result.error });
        }
      });

      return {
        success: true,
        imported,
        errors,
        namespace
      };
    } catch (error) {
      console.error('Error importing namespace data:', error);
      return { success: false, error: error.message };
    }
  }
}

// Singleton instance
const localStorageManager = new LocalStorageManager();

export default localStorageManager;