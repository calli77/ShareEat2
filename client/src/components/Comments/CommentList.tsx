import React from 'react';
import { Link } from 'react-router-dom';
import { CommentFieldsFragment, useDeleteCommentMutation } from '../../generated/graphql';
import { useAuth } from '../../context/AuthContext';

interface CommentListProps {
  postId: string;
  comments?: CommentFieldsFragment[] | null;
}

const CommentList: React.FC<CommentListProps> = ({ postId, comments }) => {
  const { isAuthenticated, user } = useAuth();
  const [deleteComment] = useDeleteCommentMutation({
    refetchQueries: ['GetPost', 'GetCommentsByPost'],
  });

  if (!comments || comments.length === 0) {
    return <div className="text-gray-500 p-4">Aucun commentaire</div>;
  }

  const handleDelete = async (commentId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      try {
        await deleteComment({
          variables: { id: commentId },
        });
      } catch (error) {
        console.error('Error deleting comment:', error);
      }
    }
  };

  return (
    <div className="space-y-4">
      {comments.map((comment) => {
        const isAuthor = isAuthenticated && user && user.id === comment.author.id;
        const formattedDate = new Date(comment.createdAt).toLocaleDateString();
        
        return (
          <div key={comment.id} className="bg-white shadow-sm rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className="mr-4 bg-indigo-100 rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <div className="flex items-center">
                    <Link to={`/profile/${comment.author.id}`} className="font-medium text-indigo-600 hover:text-indigo-500">
                      {comment.author.username}
                    </Link>
                    <span className="text-gray-400 text-sm ml-2">• {formattedDate}</span>
                  </div>
                  <div className="mt-1 text-gray-700 whitespace-pre-line">
                    {comment.content}
                  </div>
                </div>
              </div>
              
              {isAuthor && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="text-gray-400 hover:text-red-500"
                  title="Supprimer le commentaire"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;