import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Database, Shield, Zap } from 'lucide-react';
import { Button, Card, CardBody } from '../../components/ui';

export default function HomePage() {
  const features = [
    {
      icon: Database,
      title: 'Múltiplas Fontes de Dados',
      description: 'Conecte e importe dados de CSV, APIs e bancos de dados com facilidade.'
    },
    {
      icon: BarChart3,
      title: 'Visualizações Poderosas',
      description: 'Crie dashboards interativos e relatórios personalizados em minutos.'
    },
    {
      icon: Shield,
      title: 'Segurança Total',
      description: 'Seus dados estão protegidos com criptografia e controle de acesso avançado.'
    },
    {
      icon: Zap,
      title: 'Performance Otimizada',
      description: 'Análises rápidas mesmo com grandes volumes de dados empresariais.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                CoffeeBase Analytics
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">
                  Entrar
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Transforme seus dados em
            <span className="text-primary-600 block">insights poderosos</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A plataforma completa para PMEs analisarem dados de vendas, 
            entenderem tendências e tomarem decisões estratégicas baseadas em dados reais.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Começar Gratuitamente
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Já tenho conta
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-md transition-shadow">
              <CardBody>
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Junte-se a centenas de empresas que já transformaram seus dados em vantagem competitiva.
          </p>
          <Link to="/signup">
            <Button size="lg" className="text-lg px-8 py-4">
              Criar Conta Gratuita
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} CoffeeBase Analytics. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}