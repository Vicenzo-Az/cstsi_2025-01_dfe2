import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { 
  Database, 
  Upload, 
  Plus, 
  FileText, 
  Globe, 
  Trash2, 
  Edit,
  Calendar,
  HardDrive
} from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Button, 
  Badge, 
  LoadingSpinner, 
  EmptyState,
  Alert,
  Input,
  Label
} from '../../components/ui';

export default function DataSourcePage() {
  const [dataSources, setDataSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    type: 'csv',
    file: null,
    url: ''
  });

  useEffect(() => {
    fetchDataSources();
  }, []);

  const fetchDataSources = async () => {
   setLoading(true);
   try {
     const res = await api.get('/data-sources/');
     setDataSources(res.data);
   } catch (err) {
     setError('Erro ao carregar fontes de dados');
   } finally {
     setLoading(false);
   }
 };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validação básica
    if (!formData.name.trim()) {
      setError('Nome da fonte é obrigatório');
      return;
    }

    if (formData.type === 'csv' && !formData.file) {
      setError('Por favor, selecione um arquivo');
      return;
    }

    if (formData.type === 'api' && !formData.url.trim()) {
      setError('URL da API é obrigatória');
      return;
    }

    try {
      // upload/criação
      let res;
      if (formData.type === 'csv') {
        const fd = new FormData();
        fd.append('name', formData.name);
        fd.append('source_type', 'CSV');
        fd.append('file', formData.file);
        res = await api.post('/data-sources/', fd, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        res = await api.post('/data-sources/', {
          name: formData.name,
          source_type: 'API',
          connection_details: { url: formData.url }
        });
      }
      setDataSources(prev => [res.data, ...prev]);
      setSuccess('Fonte de dados criada com sucesso!');
      setShowCreateForm(false);
      setFormData({ name: '', type: 'csv', file: null, url: '' });
      
    } catch (err) {
      setError('Erro ao criar fonte de dados');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta fonte de dados?')) {
      return;
    }

    try {
      await api.delete(`/data-sources/${id}/`);
      setDataSources(prev => prev.filter(ds => ds.id !== id));
      setSuccess('Fonte de dados excluída com sucesso!');
    } catch (err) {
      setError('Erro ao excluir fonte de dados');
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'csv': return FileText;
      case 'api': return Globe;
      default: return Database;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return <Badge variant="success">Ativo</Badge>;
      case 'syncing': return <Badge variant="warning">Sincronizando</Badge>;
      case 'error': return <Badge variant="error">Erro</Badge>;
      default: return <Badge variant="info">Desconhecido</Badge>;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Fontes de Dados
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie suas conexões e importações de dados
            </p>
          </div>
          <Button 
            onClick={() => setShowCreateForm(true)}
            className="mt-4 sm:mt-0"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Fonte
          </Button>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="error" onClose={() => setError('')}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert variant="success" onClose={() => setSuccess('')}>
            {success}
          </Alert>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-gray-900">
                Nova Fonte de Dados
              </h3>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" required>
                      Nome da Fonte
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Ex: Vendas Janeiro 2024"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type" required>
                      Tipo
                    </Label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleFormChange}
                      className="form-input"
                      required
                    >
                      <option value="csv">Arquivo CSV/Excel</option>
                      <option value="api">API Externa</option>
                    </select>
                  </div>
                </div>

                {formData.type === 'csv' && (
                  <div>
                    <Label htmlFor="file" required>
                      Arquivo
                    </Label>
                    <Input
                      id="file"
                      name="file"
                      type="file"
                      accept=".csv,.xlsx,.xls"
                      onChange={handleFormChange}
                      required
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Formatos suportados: CSV, Excel (.xlsx, .xls)
                    </p>
                  </div>
                )}

                {formData.type === 'api' && (
                  <div>
                    <Label htmlFor="url" required>
                      URL da API
                    </Label>
                    <Input
                      id="url"
                      name="url"
                      type="url"
                      value={formData.url}
                      onChange={handleFormChange}
                      placeholder="https://api.exemplo.com/dados"
                      required
                    />
                  </div>
                )}

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowCreateForm(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    <Upload className="w-4 h-4 mr-2" />
                    Criar Fonte
                  </Button>
                </div>
              </form>
            </CardBody>
          </Card>
        )}

        {/* Data Sources List */}
            {loading ? (
      <div className="flex justify-center py-10">
        <LoadingSpinner />
      </div>
    ) : (
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Nome</th>
            <th className="p-2 text-left">Tipo</th>
            <th className="p-2 text-left">Criado em</th>
            <th className="p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {dataSources.length > 0 ? (
            dataSources.map(ds => (
              <tr key={ds.id} className="border-t">
                <td className="p-2">{ds.name}</td>
                <td className="p-2">{ds.source_type}</td>
                <td className="p-2">
                  {ds.created_at
                    ? new Date(ds.created_at).toLocaleString()
                    : '—'}
                </td>
                <td className="p-2 text-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => {/* editar */}}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(ds.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                Nenhuma fonte de dados encontrada
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )}
      </div>
    </DashboardLayout>
  );
}