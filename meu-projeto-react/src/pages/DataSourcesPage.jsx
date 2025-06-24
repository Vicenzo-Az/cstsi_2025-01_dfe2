// src/pages/DataSourcesPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  Container, Row, Col, Card, Table, Button, Spinner, Alert, Badge 
} from 'react-bootstrap';
import { 
  PlusCircle, Database, Trash, CloudDownload, CloudUpload 
} from 'react-bootstrap-icons';
import DataImport from '../components/dashboard/DataImport';
import { fetchDataSources, deleteDataSource } from '../services/dataSourceService';
import { useAuth } from '../context/AuthContext';

const DataSourcesPage = () => {
  const { user } = useAuth();
  const [dataSources, setDataSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showImportModal, setShowImportModal] = useState(false);

  useEffect(() => {
    const loadDataSources = async () => {
      try {
        const sources = await fetchDataSources();
        setDataSources(sources);
      } catch (err) {
        setError('Falha ao carregar fontes de dados');
        console.error('Erro nas fontes de dados:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDataSources();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta fonte de dados?')) {
      try {
        await deleteDataSource(id);
        setDataSources(dataSources.filter(source => source.id !== id));
      } catch (err) {
        setError('Falha ao excluir fonte de dados');
        console.error('Erro ao excluir:', err);
      }
    }
  };

  const handleDataSourceCreated = (newSource) => {
    setDataSources([...dataSources, newSource]);
    setShowImportModal(false);
  };

  const getBadgeVariant = (type) => {
    switch (type.toLowerCase()) {
      case 'csv': return 'primary';
      case 'api': return 'success';
      case 'postgres': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="h2">Fontes de Dados</h1>
              <p className="text-muted">
                Gerencie suas conexões de dados e importações
              </p>
            </div>
            <Button 
              variant="primary"
              onClick={() => setShowImportModal(true)}
            >
              <PlusCircle size={20} className="me-1" />
              Nova Fonte
            </Button>
          </div>
        </Col>
      </Row>

      {error && (
        <Row className="mb-4">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      {loading ? (
        <Row className="mb-4">
          <Col className="text-center">
            <Spinner animation="border" variant="primary" />
          </Col>
        </Row>
      ) : dataSources.length === 0 ? (
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body className="text-center py-5">
                <Database size={48} className="text-muted mb-3" />
                <h5>Nenhuma fonte de dados encontrada</h5>
                <p className="text-muted">
                  Comece importando dados de arquivos ou conectando a uma API
                </p>
                <Button 
                  variant="primary"
                  onClick={() => setShowImportModal(true)}
                >
                  Importar Dados
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Table striped hover responsive>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Tipo</th>
                      <th>Data de Importação</th>
                      <th>Status</th>
                      <th>Tamanho</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataSources.map((source) => (
                      <tr key={source.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            {source.type === 'API' ? (
                              <CloudDownload className="text-success me-2" />
                            ) : (
                              <CloudUpload className="text-primary me-2" />
                            )}
                            <span>{source.name}</span>
                          </div>
                        </td>
                        <td>
                          <Badge bg={getBadgeVariant(source.type)}>
                            {source.type}
                          </Badge>
                        </td>
                        <td>
                          {new Date(source.created_at).toLocaleDateString('pt-BR')}
                        </td>
                        <td>
                          <Badge bg={source.status === 'active' ? 'success' : 'warning'}>
                            {source.status === 'active' ? 'Ativo' : 'Pendente'}
                          </Badge>
                        </td>
                        <td>
                          {source.size ? `${(source.size / 1024).toFixed(2)} MB` : 'N/A'}
                        </td>
                        <td>
                          <Button 
                            variant="outline-danger" 
                            size="sm"
                            onClick={() => handleDelete(source.id)}
                            disabled={user.role !== 'admin'}
                          >
                            <Trash size={16} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      <DataImport 
        show={showImportModal} 
        onHide={() => setShowImportModal(false)}
        onDataSourceCreated={handleDataSourceCreated}
      />
    </Container>
  );
};

export default DataSourcesPage;