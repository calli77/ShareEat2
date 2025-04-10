import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import PostForm from '../components/Posts/PostForm';
import { useAuth } from '../context/AuthContext';

const PostFormPage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <PostForm postId={id} />
    </div>
  );
};

export default PostFormPage;