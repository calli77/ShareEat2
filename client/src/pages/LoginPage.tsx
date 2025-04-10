import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Auth/Login';

const LoginPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Login />
      <div className="text-center mt-4">
        <p className="text-gray-600">
          Vous n'avez pas de compte ?{' '}
          <Link to="/register" className="text-indigo-600 hover:text-indigo-500">
            S'enregistrer
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;