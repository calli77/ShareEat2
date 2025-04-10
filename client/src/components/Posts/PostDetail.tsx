import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useGetPostQuery, useDeletePostMutation, useLikePostMutation, useUnlikePostMutation } from '../../generated/graphql';
import { useAuth } from '../../context/AuthContext';
import CommentList from '../Comments/CommentList';
import CommentForm from '../Comments/CommentForm';

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  
  const { data, loading, error } = useGetPostQuery({
    variables: { id: id || '' },
    skip: !id,
  });
  
  const [deletePost, { loading: deleteLoading }] = useDeletePostMutation({
    onCompleted: () => {
      navigate('/');
    },
  });
  
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  
  if (loading) return <div className="text-center p-4">Chargement du post...</div>;
  if (error) return <div className="text-red-500 p-4">Erreur de chargement du post: {error.message}</div>;
  if (!data?.post) return <div className="text-center p-4">Post introuvable</div>;
  
  const post = data.post;
  const isAuthor = isAuthenticated && user && user.id === post.author.id;
  const hasLiked = isAuthenticated && user && post.likes?.some(
    (like) => like.user.id === user.id
  );
  
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  
  const handleLike = async () => {
    try {
      if (hasLiked) {
        await unlikePost({
          variables: { postId: post.id },
          refetchQueries: ['GetPost'],
        });
      } else {
        await likePost({
          variables: { postId: post.id },
          refetchQueries: ['GetPost'],
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      try {
        await deletePost({
          variables: { id: post.id },
          refetchQueries: ['GetPosts'],
        });
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <span>Par </span>
            <Link to={`/profile/${post.author.id}`} className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              {post.author.username}
            </Link>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
          
          <div className="prose prose-indigo max-w-none mb-8">
            <p className="text-gray-700 whitespace-pre-line">{post.content}</p>
          </div>
          
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center">
              <button 
                onClick={handleLike}
                disabled={!isAuthenticated}
                className={`flex items-center focus:outline-none ${
                  !isAuthenticated ? 'opacity-50 cursor-not-allowed' : 'hover:text-indigo-600'
                }`}
                title={!isAuthenticated ? "Se connecter pour liker" : undefined}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 mr-1 ${hasLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
                  viewBox="0 0 20 20" 
                  fill={hasLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span>{post.likesCount} likes</span>
              </button>
              
              <div className="ml-4 text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <span>{post.comments?.length || 0} Commentaires</span>
              </div>
            </div>
            
            {isAuthor && (
              <div className="flex space-x-2">
                <Link 
                  to={`/edit-post/${post.id}`}
                  className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 transition"
                >
                  Modifier
                </Link>
                <button 
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                >
                  {deleteLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Commentaires</h2>
        
        {isAuthenticated ? (
          <CommentForm postId={post.id} />
        ) : (
          <div className="bg-gray-50 p-4 mb-6 rounded-lg text-center">
            <p className="text-gray-600">
              <Link to="/login" className="text-indigo-600 font-medium hover:text-indigo-500">Sign in</Link>
              {' '}pour quitter le commentaire.
            </p>
          </div>
        )}
        
        <CommentList postId={post.id} comments={post.comments} />
      </div>
    </div>
  );
};

export default PostDetail;