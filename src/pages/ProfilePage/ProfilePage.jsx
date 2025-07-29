import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { User, Mail, Lock, Camera, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Button, 
  Input, 
  Label, 
  Alert 
} from '../../components/ui';

export default function ProfilePage() {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  
  const [profileData, setProfileData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    username: user?.username || '',
    avatar: null
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    api.get('/auth/user/')
      .then(res => {
        setProfileData({
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          email: res.data.email,
          username: res.data.username,
          avatar: null
        });
      })
      .catch(() => {});
  }, []);

  const handleProfileChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      formData.append('first_name', profileData.firstName);
      formData.append('last_name', profileData.lastName);
      formData.append('email', profileData.email);
      // username is usually immutable; omit if API disallows
      if (profileData.avatar) {
        formData.append('avatar', profileData.avatar);
      }

      // Use PATCH to update authenticated user
      const config = { headers: { 'Content-Type': 'multipart/form-data' } };
      const res = await api.patch('/auth/user/', formData, config);

      setSuccess('Perfil atualizado com sucesso!');
      // Atualiza contexto do usuário
      setUser(res.data);
    } catch (err) {
      console.error(err);
      setError('Erro ao atualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError('A nova senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await api.put('/auth/password/change/', {
        old_password: passwordData.currentPassword,
        new_password: passwordData.newPassword
      });

      setSuccess('Senha alterada com sucesso!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError('Erro ao alterar senha');
    } finally {
      setLoading(false);
    }
  };

  const getUserDisplayName = () => {
    if (profileData.firstName && profileData.lastName) {
      return `${profileData.firstName} ${profileData.lastName}`;
    }
    return profileData.username || user?.email?.split('@')[0] || 'Usuário';
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Meu Perfil
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie suas informações pessoais e configurações de conta
          </p>
        </div>

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <Card>
              <CardBody className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto">
                    {profileData.avatar ? (
                      <img
                        src={URL.createObjectURL(profileData.avatar)}
                        alt="Avatar"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-12 h-12 text-primary-600" />
                    )}
                  </div>
                  <label htmlFor="avatar" className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white hover:bg-primary-700 transition-colors cursor-pointer" title="Alterar foto">
                    <Camera className="w-4 h-4" />
                  </label>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900">
                  {getUserDisplayName()}
                </h3>
                <p className="text-gray-600">
                  {profileData.email}
                </p>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Membro desde {new Date(user?.date_joined).getFullYear()}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">
                  Informações Pessoais
                </h3>
              </CardHeader>
              <CardBody>
                <form onSubmit={handleProfileSubmit} className="space-y-4" encType="multipart/form-data">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">Nome</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleProfileChange}
                        placeholder="Digite seu nome"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Sobrenome</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleProfileChange}
                        placeholder="Digite seu sobrenome"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="username">Nome de usuário</Label>
                      <Input
                         id="username"
                         value={profileData.username}
                         disabled
                         className="bg-gray-100 cursor-not-allowed"  
                       />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        placeholder="Digite seu email"
                      />
                    </div>
                  </div>

                  <Input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileChange}
                    className="hidden"
                  />

                  <div className="flex justify-end">
                    <Button type="submit" loading={loading}>
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Salvando...' : 'Salvar Alterações'}
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold text-gray-900">Alterar Senha</h3>
              </CardHeader>
              <CardBody>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="currentPassword" required>Senha atual</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="Digite sua senha atual"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="newPassword" required>Nova senha</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordData.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Digite a nova senha"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword" required>Confirmar nova senha</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirme a nova senha"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Requisitos da senha:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center"><Lock className="w-3 h-3 mr-2"/>Pelo menos 6 caracteres</li>
                      <li className="flex items-center"><Lock className="w-3 h-3 mr-2"/>Recomendado: use letras, números e símbolos</li>
                    </ul>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" loading={loading}>
                      <Lock className="w-4 h-4 mr-2" />
                      {loading ? 'Alterando...' : 'Alterar Senha'}
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
