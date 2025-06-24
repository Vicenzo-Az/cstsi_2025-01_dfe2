import React, { useState } from 'react';
import { createDataSource } from '../../services/dataSourceService';

const DataImport = () => {
  const [file, setFile] = useState(null);
  const [sourceType, setSourceType] = useState('CSV');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('source_type', sourceType);
    
    try {
      await createDataSource(formData);
      alert('Dados importados com sucesso!');
    } catch (error) {
      console.error('Erro na importação:', error);
      alert('Falha na importação');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">Importar Dados</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tipo de Fonte</label>
          <select 
            className="form-select"
            value={sourceType}
            onChange={(e) => setSourceType(e.target.value)}
          >
            <option value="CSV">CSV</option>
            <option value="API">API</option>
            <option value="POSTGRES">PostgreSQL</option>
          </select>
        </div>
        
        <div className="mb-3">
          <label className="form-label">Arquivo</label>
          <input 
            type="file"
            className="form-control"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Importando...' : 'Importar Dados'}
        </button>
      </form>
    </div>
  );
};

export default DataImport;