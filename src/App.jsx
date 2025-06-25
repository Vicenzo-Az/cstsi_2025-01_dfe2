import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardPage from './pages/DashboardPage';
import DataSourcesPage from './pages/DataSourcesPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/layout/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route>
          <Route path="login/" element={<LoginPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route index element={<DashboardPage />} />
            <Route path="data-sources/" element={<DataSourcesPage />} />
            <Route path="admin/" element={<AdminPage />} />
          </Route>
          
          <Route path="*" element={
            <div className="p-5 text-center">
              <h1>Página não encontrada</h1>
              <p>A URL solicitada não existe</p>
            </div>
          } />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;