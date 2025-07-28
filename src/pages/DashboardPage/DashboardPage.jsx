import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Database, 
  FileText, 
  Users, 
  TrendingUp,
  Activity,
  Plus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card, CardHeader, CardBody, Button, Badge, LoadingSpinner } from '../../components/ui';

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    dataSources: 0,
    dashboards: 0,
    reports: 0,
    users: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // Simular carregamento de dados
    const loadDashboardData = async () => {
      setLoading(true);
      
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Dados mockados - substitua por chamadas reais à API
      setStats({
        dataSources: 5,
        dashboards: 3,
        reports: 12,
        users: 8
      });
      
      setRecentActivity([
        {
          id: 1,
          type: 'datasource',
          title: 'Nova fonte de dados adicionada',
          description: 'vendas_q4_2024.csv',
          time: '2 horas atrás',
          icon: Database
        },
        {
          id: 2,
          type: 'dashboard',
          title: 'Dashboard atualizado',
          description: 'Relatório de Vendas Mensal',
          time: '5 horas atrás',
          icon: BarChart3
        },
        {
          id: 3,
          type: 'report',
          title: 'Relatório gerado',
          description: 'Análise de Performance Q4',
          time: '1 dia atrás',
          icon: FileText
        }
      ]);
      
      setLoading(false);
    };

    loadDashboardData();
  }, []);

  const getUserDisplayName = () => {
    if (!user) return 'Usuário';
    return user.first_name || user.name || user.username || user.email?.split('@')[0] || 'Usuário';
  };

  const statCards = [
    {
      title: 'Fontes de Dados',
      value: stats.dataSources,
      icon: Database,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      href: '/datasources'
    },
    {
      title: 'Dashboards',
      value: stats.dashboards,
      icon: BarChart3,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      href: '/dashboards'
    },
    {
      title: 'Relatórios',
      value: stats.reports,
      icon: FileText,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      href: '/reports'
    },
    {
      title: 'Usuários',
      value: stats.users,
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      href: '/users'
    }
  ];

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
              Olá, {getUserDisplayName()}!
            </h1>
            <p className="text-gray-600 mt-1">
              Bem-vindo ao seu painel de controle
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <Link to="/datasources">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nova Fonte
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Link key={index} to={stat.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardBody>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardBody className="text-center py-8">
              <div className="w-12 h-12 bg-blue-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Importar Dados
              </h3>
              <p className="text-gray-600 mb-4">
                Conecte novas fontes de dados CSV, APIs ou bancos
              </p>
              <Link to="/datasources">
                <Button variant="outline" size="sm">
                  Começar
                </Button>
              </Link>
            </CardBody>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardBody className="text-center py-8">
              <div className="w-12 h-12 bg-green-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Criar Dashboard
              </h3>
              <p className="text-gray-600 mb-4">
                Visualize seus dados com gráficos interativos
              </p>
              <Button variant="outline" size="sm" disabled>
                Em breve
              </Button>
            </CardBody>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardBody className="text-center py-8">
              <div className="w-12 h-12 bg-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Gerar Relatório
              </h3>
              <p className="text-gray-600 mb-4">
                Crie relatórios automáticos dos seus dados
              </p>
              <Button variant="outline" size="sm" disabled>
                Em breve
              </Button>
            </CardBody>
          </Card>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Atividade Recente
                </h3>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Status do Sistema
                </h3>
                <TrendingUp className="w-5 h-5 text-gray-400" />
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Status</span>
                  <Badge variant="success">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Última Sincronização</span>
                  <span className="text-sm text-gray-900">5 min atrás</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Espaço Usado</span>
                  <span className="text-sm text-gray-900">2.1 GB / 10 GB</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Usuários Ativos</span>
                  <span className="text-sm text-gray-900">3 online</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}