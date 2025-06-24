// src/pages/DashboardPage.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert, Button } from 'react-bootstrap';
import { BarChart, PieChart } from 'react-bootstrap-icons';
import { useAuth } from '../context/AuthContext';
import { fetchDashboardSummary } from '../services/dashboardService';
import ChartRenderer from '../components/ui/ChartRenderer';

const DashboardPage = () => {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDashboard, setSelectedDashboard] = useState('sales');

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await fetchDashboardSummary();
        setSummary(data);
      } catch (err) {
        setError('Falha ao carregar dados do dashboard');
        console.error('Erro no dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="h2">Dashboard</h1>
          <p className="text-muted">
            Bem-vindo, {user?.name}! Aqui está o resumo dos seus dados
          </p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={3}>
          <Card className="border-primary mb-3">
            <Card.Body>
              <div className="d-flex align-items-center">
                <BarChart size={24} className="text-primary me-3" />
                <div>
                  <Card.Title>Vendas</Card.Title>
                  <Card.Text className="fs-3 fw-bold">
                    {summary?.sales?.total ? `R$ ${summary.sales.total.toLocaleString('pt-BR')}` : 'N/A'}
                  </Card.Text>
                </div>
              </div>
              <Card.Text className="text-muted">
                {summary?.sales?.change ? `${summary.sales.change}% em relação ao mês passado` : ''}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-success mb-3">
            <Card.Body>
              <div className="d-flex align-items-center">
                <PieChart size={24} className="text-success me-3" />
                <div>
                  <Card.Title>Clientes</Card.Title>
                  <Card.Text className="fs-3 fw-bold">
                    {summary?.customers?.total || 'N/A'}
                  </Card.Text>
                </div>
              </div>
              <Card.Text className="text-muted">
                {summary?.customers?.new ? `${summary.customers.new} novos este mês` : ''}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-warning mb-3">
            <Card.Body>
              <div className="d-flex align-items-center">
                <BarChart size={24} className="text-warning me-3" />
                <div>
                  <Card.Title>Pedidos</Card.Title>
                  <Card.Text className="fs-3 fw-bold">
                    {summary?.orders?.total || 'N/A'}
                  </Card.Text>
                </div>
              </div>
              <Card.Text className="text-muted">
                {summary?.orders?.avg_value ? `Valor médio: R$ ${summary.orders.avg_value}` : ''}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="border-info mb-3">
            <Card.Body>
              <div className="d-flex align-items-center">
                <PieChart size={24} className="text-info me-3" />
                <div>
                  <Card.Title>Retenção</Card.Title>
                  <Card.Text className="fs-3 fw-bold">
                    {summary?.retention?.rate ? `${summary.retention.rate}%` : 'N/A'}
                  </Card.Text>
                </div>
              </div>
              <Card.Text className="text-muted">
                Taxa de retenção de clientes
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <Card className="h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <Card.Title>Análise de Vendas</Card.Title>
                <div>
                  <Button 
                    variant={selectedDashboard === 'sales' ? 'primary' : 'outline-primary'} 
                    size="sm" 
                    className="me-2"
                    onClick={() => setSelectedDashboard('sales')}
                  >
                    Vendas
                  </Button>
                  <Button 
                    variant={selectedDashboard === 'inventory' ? 'primary' : 'outline-primary'} 
                    size="sm"
                    onClick={() => setSelectedDashboard('inventory')}
                  >
                    Estoque
                  </Button>
                </div>
              </div>
              
              {summary?.charts && (
                <ChartRenderer 
                  data={summary.charts[selectedDashboard]} 
                  height={350} 
                />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Últimas Atividades</Card.Title>
              <div className="list-group">
                {summary?.activities?.map((activity, index) => (
                  <div key={index} className="list-group-item border-0">
                    <div className="d-flex w-100 justify-content-between">
                      <h6 className="mb-1">{activity.title}</h6>
                      <small className="text-muted">{activity.time}</small>
                    </div>
                    <p className="mb-1">{activity.description}</p>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;