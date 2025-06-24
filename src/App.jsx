import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/DashboardPage';
import DataSourcesPage from './pages/DataSourcesPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Rota pública */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rotas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route index element={<DashboardPage />} />
          <Route path="data-sources" element={<DataSourcesPage />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;