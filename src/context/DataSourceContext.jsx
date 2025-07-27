import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const DataSourceContext = createContext();

export function DataSourceProvider({ children }) {
  const [dataSources, setDataSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // CARREGA todas as fontes
  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get('/datasources/');
        setDataSources(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // CRIA ou ATUALIZA
  async function save(source) {
    try {
      const form = new FormData();
      form.append('name', source.name);
      form.append('type', source.type);
      if (source.type === 'csv' && source.file) form.append('file', source.file);
      if (source.type === 'googlesheet') form.append('url', source.url);

      if (source.id) {
        await api.put(`/datasources/${source.id}/`, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/datasources/', form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      // recarrega lista
      const { data } = await api.get('/datasources/');
      setDataSources(data);
    } catch (err) {
      setError(err);
    }
  }

  // DELETA
  async function remove(id) {
    try {
      await api.delete(`/datasources/${id}/`);
      setDataSources(ds => ds.filter(d => d.id !== id));
    } catch (err) {
      setError(err);
    }
  }

  return (
    <DataSourceContext.Provider
      value={{ dataSources, loading, error, save, remove }}
    >
      {children}
    </DataSourceContext.Provider>
  );
}

// Hook de consumo
export function useDataSources() {
  return useContext(DataSourceContext);
}
