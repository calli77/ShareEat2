import React from 'react';
import { Link } from 'react-router-dom';
import PostList from '../components/Posts/PostList';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Posts récents</h1>
        {isAuthenticated && (
          <Link
            to="/create-post"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Créer le Post
          </Link>
        )}
      </div>
      
      <PostList />
    </div>
  );
};

export default HomePage;