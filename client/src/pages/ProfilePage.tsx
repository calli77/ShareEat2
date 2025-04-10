import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useGetUserQuery, useGetPostsByUserQuery } from '../generated/graphql';
import { useAuth } from '../context/AuthContext';
import PostCard from '../components/Posts/PostCard';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId?: string }>();
  const { isAuthenticated, user } = useAuth();
  
  const profileId = userId || (user ? user.id : '');
  const isCurrentUser = !userId || (user && userId === user.id);
  
  if (!isAuthenticated && !userId) {
    return <Navigate to="/login" />;
  }
  
  const { data: userData, loading: userLoading, error: userError } = useGetUserQuery({
    variables: { id: profileId },
    skip: !profileId,
  });
  
  const { data: postsData, loading: postsLoading, error: postsError } = useGetPostsByUserQuery({
    variables: { userId: profileId },
    skip: !profileId,
  });
  
  if (userLoading) return <div className="text-center p-4">Chargement du profil...</div>;
  if (userError) return <div className="text-red-500 p-4">Erreur du chargement du profil: {userError.message}</div>;
  if (!userData?.user) return <div className="text-center p-4">Utilisateur introuvable</div>;
  
  const profileUser = userData.user;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="p-6">
          <div className="flex items-center">
            <div className="bg-indigo-100 rounded-full p-4 mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {profileUser.username}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-4">
        {isCurrentUser ? 'Tes posts' : `Posts de ${profileUser.username}`}
      </h2>
      
      {postsLoading ? (
        <div className="text-center p-4">Chargement...</div>
      ) : postsError ? (
        <div className="text-red-500 p-4">Erreur de chargement des posts: {postsError.message}</div>
      ) : !postsData?.postsByUser || postsData.postsByUser.length === 0 ? (
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          {isCurrentUser ? "Tu n'as pas encore de post." : "Cet utilisateur n'a pas de post."}
          {isCurrentUser && (
            <div className="mt-2">
              <a href="/create-post" className="text-indigo-600 hover:text-indigo-500">
                Créer ton post
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {postsData.postsByUser.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;