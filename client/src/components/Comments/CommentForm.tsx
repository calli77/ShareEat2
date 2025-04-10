import React, { useState } from 'react';
import { useCreateCommentMutation } from '../../generated/graphql';

interface CommentFormProps {
  postId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ postId }) => {
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [createComment, { loading }] = useCreateCommentMutation({
    refetchQueries: ['GetPost', 'GetCommentsByPost'],
    onCompleted: () => {
      setContent('');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (content.trim() === '') {
      setErrorMessage('Comment cannot be empty');
      return;
    }
    
    try {
      await createComment({
        variables: {
          input: {
            content,
            postId,
          },
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred when adding the comment');
      }
    }
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="comment" className="sr-only">
            Commentaire
          </label>
          <textarea
            id="comment"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ecrire ici..."
          />
        </div>
        
        {errorMessage && (
          <div className="text-red-500 text-sm">{errorMessage}</div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Chargement...' : 'Ajouter un commentaire'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;