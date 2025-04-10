import React from 'react';
import { Link } from 'react-router-dom';
import Register from '../components/Auth/Register';

const RegisterPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Register />
      <div className="text-center mt-4">
        <p className="text-gray-600">
        Vous avez déjà un compte ?{' '}
          <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;