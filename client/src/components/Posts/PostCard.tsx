import React from 'react';
import { Link } from 'react-router-dom';
import { PostFieldsFragment, useLikePostMutation, useUnlikePostMutation } from '../../generated/graphql';
import { useAuth } from '../../context/AuthContext';

interface PostCardProps {
  post: PostFieldsFragment;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { isAuthenticated, user } = useAuth();
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  
  const hasLiked = isAuthenticated && user && post.likes?.some(
    (like) => like.user.id === user.id
  );
  
  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  
  const handleLike = async () => {
    try {
      if (hasLiked) {
        await unlikePost({
          variables: { postId: post.id },
          refetchQueries: ['GetPosts', 'GetPost'],
        });
      } else {
        await likePost({
          variables: { postId: post.id },
          refetchQueries: ['GetPosts', 'GetPost'],
        });
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <Link to={`/post/${post.id}`} className="text-2xl font-bold text-gray-900 hover:text-indigo-600 truncate">
            {post.title}
          </Link>
        </div>
        
        <p className="text-gray-700 mb-4 line-clamp-3">
          {post.content}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <span>Par </span>
            <Link to={`/profile/${post.author.id}`} className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              {post.author.username}
            </Link>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={handleLike}
              disabled={!isAuthenticated}
              className={`flex items-center focus:outline-none ${
                !isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title={!isAuthenticated ? "Se connecter pour liker" : undefined}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 mr-1 ${hasLiked ? 'text-red-500 fill-current' : 'text-gray-400'}`} 
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
              <span>{post.likesCount}</span>
            </button>
            
            <Link to={`/post/${post.id}`} className="ml-4 text-gray-500 hover:text-indigo-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <span>{post.comments?.length || 0}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;