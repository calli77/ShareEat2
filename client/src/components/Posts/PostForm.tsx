import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreatePostMutation, useUpdatePostMutation, useGetPostQuery } from '../../generated/graphql';

interface PostFormProps {
  postId?: string;
}

const PostForm: React.FC<PostFormProps> = ({ postId }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const isEditMode = !!postId;

  const { data: postData } = useGetPostQuery({
    variables: { id: postId || '' },
    skip: !isEditMode,
  });

  useEffect(() => {
    if (isEditMode && postData?.post) {
      setTitle(postData.post.title);
      setContent(postData.post.content);
    }
  }, [isEditMode, postData]);

  const [createPost, { loading: createLoading }] = useCreatePostMutation({
    onCompleted: (data) => {
      navigate(`/post/${data.createPost.id}`);
    },
  });

  const [updatePost, { loading: updateLoading }] = useUpdatePostMutation({
    onCompleted: (data) => {
      navigate(`/post/${data.updatePost.id}`);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      if (isEditMode) {
        await updatePost({
          variables: {
            id: postId,
            input: {
              title,
              content,
            },
          },
        });
      } else {
        await createPost({
          variables: {
            input: {
              title,
              content,
            },
          },
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An error occurred when saving the post');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        {isEditMode ? 'Modifier un post' : 'Créer un nouveau post'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Titre
          </label>
          <input
            id="title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Titre du post"
          />
        </div>

        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Contenu
          </label>
          <textarea
            id="content"
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Ecrire ici"
          />
        </div>

        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={createLoading || updateLoading}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {createLoading || updateLoading
              ? 'Sauvegarde...'
              : isEditMode
              ? 'Modifier un post'
              : 'Créer un post'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;