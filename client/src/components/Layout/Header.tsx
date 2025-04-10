import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-indigo-600">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-2xl">
              ShareEat
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link to="/" className="text-base font-medium text-white hover:text-indigo-50">
                Accueil
              </Link>
              {isAuthenticated && (
                <Link to="/profile" className="text-base font-medium text-white hover:text-indigo-50">
                  Profil
                </Link>
              )}
            </div>
          </div>
          <div className="ml-10 space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center">
                <span className="text-white mr-4">
                  Bienvenue {user?.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  Se déconnecter
                </button>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-block bg-indigo-500 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-opacity-75"
                >
                  Se connecter
                </Link>
                <Link
                  to="/register"
                  className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50"
                >
                  S'enregistrer
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          <Link to="/" className="text-base font-medium text-white hover:text-indigo-50">
            Accueil
          </Link>
          {isAuthenticated && (
            <Link to="/profile" className="text-base font-medium text-white hover:text-indigo-50">
              Profil
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;