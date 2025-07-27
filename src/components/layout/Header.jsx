import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  UserCircleIcon, 
  ArrowRightOnRectangleIcon,
  BellIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold hidden sm:block">
                Analytics Pro
              </span>
            </Link>
          </div>

          {/* User Menu */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <BellIcon className="w-5 h-5" />
              </button>

              {/* User Dropdown */}
              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center space-x-3 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <UserCircleIcon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user.first_name || user.username}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </Menu.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } flex items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            <UserCircleIcon className="w-4 h-4 mr-3" />
                            Meu Perfil
                          </Link>
                        )}
                      </Menu.Item>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/settings"
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } flex items-center px-4 py-2 text-sm text-gray-700`}
                          >
                            <Cog6ToothIcon className="w-4 h-4 mr-3" />
                            Configurações
                          </Link>
                        )}
                      </Menu.Item>
                      
                      <div className="border-t border-gray-100"></div>
                      
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={handleLogout}
                            className={`${
                              active ? 'bg-gray-50' : ''
                            } flex items-center w-full px-4 py-2 text-sm text-gray-700`}
                          >
                            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3" />
                            Sair
                          </button>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Entrar
              </Link>
              <Link 
                to="/signup" 
                className="btn-primary"
              >
                Criar Conta
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;