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
    avatarFile: null,
    avatarUrl: null
  });

  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  // Fetch user and their document image
  const fetchUser = async () => {
    try {
      const resUser = await api.get('/auth/user/');
      setUser(resUser.data);
      setProfileData(pd => ({
        ...pd,
        firstName: resUser.data.first_name,
        lastName: resUser.data.last_name,
        email: resUser.data.email,
        username: resUser.data.username
      }));
      // Fetch user's documents to get avatar
      const resDocs = await api.get('/documentos/', { params: { usuario: resUser.data.id } });
      if (Array.isArray(resDocs.data) && resDocs.data.length) {
        // assume last doc is avatar
        const doc = resDocs.data[resDocs.data.length - 1];
        setProfileData(pd => ({ ...pd, avatarUrl: doc.imagem }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchUser(); }, []);

  const handleProfileChange = e => {
    const { files } = e.target;
    if (files && files[0]) {
      setProfileData(pd => ({ ...pd, avatarFile: files[0], avatarUrl: URL.createObjectURL(files[0]) }));
    } else {
      const { name, value } = e.target;
      setProfileData(pd => ({ ...pd, [name]: value }));
    }
  };

  const handleProfileSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      // Upload document (avatar) if present
      if (profileData.avatarFile) {
        const imgForm = new FormData();
        imgForm.append('imagem', profileData.avatarFile);
        imgForm.append('titulo', profileData.avatarFile.name);
        await api.post('/documentos/', imgForm, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      // Update user data
      await api.patch('/auth/user/', {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        email: profileData.email
      });
      // Re-fetch to refresh data and avatar
      await fetchUser();
      setSuccess('Perfil atualizado com sucesso!');
      setProfileData(pd => ({ ...pd, avatarFile: null }));
    } catch (err) {
      console.error(err.response || err);
      setError('Erro ao atualizar perfil: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPasswordData(pd => ({ ...pd, [name]: value }));
  };

  const handlePasswordSubmit = async e => {
    e.preventDefault(); setError(''); setSuccess('');
    if (passwordData.newPassword !== passwordData.confirmPassword) return setError('As senhas não coincidem');
    if (passwordData.newPassword.length < 6) return setError('A nova senha deve ter pelo menos 6 caracteres');
    setLoading(true);
    try {
      await api.put('/auth/password/change/', { old_password: passwordData.currentPassword, new_password: passwordData.newPassword });
      setSuccess('Senha alterada com sucesso!');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setError('Erro ao alterar senha: ' + (err.response?.data?.detail || err.message));
    } finally { setLoading(false); }
  };

  const getUserDisplayName = () => {
    const { firstName, lastName, username } = profileData;
    if (firstName && lastName) return `${firstName} ${lastName}`;
    return username || 'Usuário';
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div><h1 className="text-2xl font-bold">Meu Perfil</h1><p className="text-gray-600">Gerencie suas informações pessoais</p></div>
        {error && <Alert variant="error" onClose={() => setError('')}>{error}</Alert>}
        {success && <Alert variant="success" onClose={() => setSuccess('')}>{success}</Alert>}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <Card><CardBody>
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center">
                  {profileData.avatarUrl ? <img src={profileData.avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full" /> : <User className="w-12 h-12"/>}
                </div>
                <label htmlFor="avatar" className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white cursor-pointer"><Camera className="w-4 h-4"/></label>
              </div>
              <h3 className="font-semibold">{getUserDisplayName()}</h3>
              <p className="text-gray-600">{profileData.email}</p>
            </CardBody></Card>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <Card><CardHeader><h3>Informações Pessoais</h3></CardHeader><CardBody>
              <form onSubmit={handleProfileSubmit} encType="multipart/form-data" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label htmlFor="firstName">Nome</Label><Input id="firstName" name="firstName" value={profileData.firstName} onChange={handleProfileChange}/></div>
                  <div><Label htmlFor="lastName">Sobrenome</Label><Input id="lastName" name="lastName" value={profileData.lastName} onChange={handleProfileChange}/></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Usuário</Label><Input value={profileData.username} disabled/></div>
                  <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" value={profileData.email} onChange={handleProfileChange}/></div>
                </div>
                <Input id="avatar" name="avatar" type="file" accept="image/*" onChange={handleProfileChange} className="hidden" />
                <div className="flex justify-end"><Button type="submit" loading={loading}><Save className="inline mr-2"/>Salvar</Button></div>
              </form>
            </CardBody></Card>
            <Card><CardHeader><h3>Alterar Senha</h3></CardHeader><CardBody>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div><Label htmlFor="currentPassword">Senha atual</Label><Input id="currentPassword" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange}/></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label htmlFor="newPassword">Nova senha</Label><Input id="newPassword" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange}/></div>
                  <div><Label htmlFor="confirmPassword">Confirmar senha</Label><Input id="confirmPassword" name="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={handlePasswordChange}/></div>
                </div>
                <div className="flex justify-end"><Button type="submit" loading={loading}><Lock className="inline mr-2"/>Alterar</Button></div>
              </form>
            </CardBody></Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
