import React, { useState, useEffect } from 'react';
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
    loadDataSources();
  }, []);

  const loadDataSources = async () => {
    setLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Dados mockados - substitua por chamada real à API
    setDataSources([
      {
        id: 1,
        name: 'Vendas Q4 2024',
        type: 'csv',
        size: '2.5 MB',
        rows: 15420,
        created_at: '2024-01-15T10:30:00Z',
        status: 'active'
      },
      {
        id: 2,
        name: 'API de Clientes',
        type: 'api',
        size: '1.8 MB',
        rows: 8960,
        created_at: '2024-01-10T14:20:00Z',
        status: 'active'
      },
      {
        id: 3,
        name: 'Produtos Shopify',
        type: 'api',
        size: '890 KB',
        rows: 2340,
        created_at: '2024-01-08T09:15:00Z',
        status: 'syncing'
      }
    ]);
    
    setLoading(false);
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
      // Simular upload/criação
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Adicionar nova fonte mockada
      const newSource = {
        id: dataSources.length + 1,
        name: formData.name,
        type: formData.type,
        size: formData.type === 'csv' ? `${(formData.file.size / 1024 / 1024).toFixed(1)} MB` : '---',
        rows: Math.floor(Math.random() * 10000) + 1000,
        created_at: new Date().toISOString(),
        status: 'active'
      };
      
      setDataSources(prev => [newSource, ...prev]);
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
      // Simular deleção
      await new Promise(resolve => setTimeout(resolve, 500));
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
        {dataSources.length === 0 ? (
          <EmptyState
            icon={Database}
            title="Nenhuma fonte de dados encontrada"
            description="Comece importando dados de arquivos CSV ou conectando uma API externa."
            action={
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeira Fonte
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {dataSources.map((source) => {
              const TypeIcon = getTypeIcon(source.type);
              
              return (
                <Card key={source.id} className="hover:shadow-md transition-shadow">
                  <CardBody>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <TypeIcon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {source.name}
                          </h3>
                          <p className="text-sm text-gray-500 capitalize">
                            {source.type}
                          </p>
                        </div>
                      </div>
                      {getStatusBadge(source.status)}
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <HardDrive className="w-4 h-4 mr-2" />
                        {source.size} • {source.rows.toLocaleString()} registros
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-2" />
                        Criado em {formatDate(source.created_at)}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="danger"
                        onClick={() => handleDelete(source.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}