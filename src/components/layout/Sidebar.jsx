import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  HomeIcon,
  ChartBarIcon,
  CircleStackIcon,
  DocumentTextIcon,
  UsersIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { cn } from '../../utils/cn';

const Sidebar = () => {
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Fontes de Dados', href: '/data-sources', icon: CircleStackIcon },
    { name: 'Dashboards', href: '/dashboards', icon: ChartBarIcon },
    { name: 'Relatórios', href: '/reports', icon: DocumentTextIcon },
  ];

  const adminNavigation = [
    { name: 'Usuários', href: '/admin/users', icon: UsersIcon },
    { name: 'Configurações', href: '/admin/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive
                    ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                )
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}

          {user?.role === 'admin' && (
            <>
              <div className="pt-4 mt-4 border-t border-gray-200">
                <p className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Administração
                </p>
              </div>
              {adminNavigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              ))}
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;