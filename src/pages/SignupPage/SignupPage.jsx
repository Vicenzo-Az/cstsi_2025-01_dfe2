import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BarChart3, Eye, EyeOff, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button, Input, Label, Alert, Card, CardBody } from '../../components/ui';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Limpa erro quando usuário começa a digitar
    if (error) setError('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um email válido');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);

    const result = await register({
      username: formData.username,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      navigate('/login', { 
        replace: true,
        state: { message: 'Conta criada com sucesso! Faça login para continuar.' }
      });
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const passwordStrength = formData.password.length >= 6;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-lg mb-4">
            <BarChart3 className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-2xl font-bold text-white">
            CoffeeBase Analytics
          </h1>
          <p className="text-primary-100 mt-2">
            Crie sua conta gratuita
          </p>
        </div>

        {/* Form Card */}
        <Card className="shadow-2xl">
          <CardBody className="space-y-6">
            {error && (
              <Alert variant="error" title="Erro no cadastro">
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username" required>
                  Nome de usuário
                </Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Digite um nome de usuário"
                  error={error}
                />
              </div>

              <div>
                <Label htmlFor="email" required>
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Digite seu email"
                  error={error}
                />
              </div>

              <div>
                <Label htmlFor="password" required>
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Digite uma senha"
                    error={error}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {formData.password && (
                  <div className="mt-2 flex items-center text-sm">
                    {passwordStrength ? (
                      <Check className="w-4 h-4 text-green-500 mr-1" />
                    ) : (
                      <div className="w-4 h-4 border border-gray-300 rounded-full mr-1" />
                    )}
                    <span className={passwordStrength ? 'text-green-600' : 'text-gray-500'}>
                      Pelo menos 6 caracteres
                    </span>
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="confirmPassword" required>
                  Confirmar senha
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirme sua senha"
                    error={error}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="mt-2 flex items-center text-sm">
                    {formData.password === formData.confirmPassword ? (
                      <>
                        <Check className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-green-600">Senhas coincidem</span>
                      </>
                    ) : (
                      <>
                        <div className="w-4 h-4 border border-red-300 rounded-full mr-1" />
                        <span className="text-red-500">Senhas não coincidem</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full"
                size="lg"
              >
                {loading ? 'Criando conta...' : 'Criar conta gratuita'}
              </Button>
            </form>

            <div className="text-center space-y-4">
              <div className="text-sm text-gray-600">
                Já tem uma conta?{' '}
                <Link 
                  to="/login" 
                  className="font-medium text-primary-600 hover:text-primary-500 transition-colors"
                >
                  Faça login
                </Link>
              </div>
              
              <div className="text-sm">
                <Link 
                  to="/home" 
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ← Voltar ao início
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Terms info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-primary-100">
            Ao criar uma conta, você concorda com nossos{' '}
            <a href="#" className="underline hover:no-underline">
              Termos de Uso
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}