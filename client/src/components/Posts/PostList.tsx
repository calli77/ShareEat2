import React, { useState } from 'react';
import { useGetPostsQuery } from '../../generated/graphql';
import PostCard from './PostCard';
 
const PostList: React.FC = () => {
  const [sortType, setSortType] = useState<string>('latest');
  const { data, loading, error } = useGetPostsQuery();
 
  if (loading) return <div className="text-center p-4">Chargement des post...</div>;
  if (error) return <div className="text-red-500 p-4">Erreur de chargement des posts: {error.message}</div>;
  if (!data?.posts || data.posts.length === 0) {
    return <div className="text-center p-4">Aucun post disponible</div>;
  }
 
  const sortPosts = (posts: any[], sortType: string) => {
    const sortedPosts = [...posts];
    switch (sortType) {
      case 'latest':
        return sortedPosts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return sortedPosts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'popular':
        return sortedPosts.sort((a, b) => b.likesCount - a.likesCount);
      default:
        return sortedPosts;
    }
  };
 
  return (
<div className="max-w-4xl mx-auto">
<div className="mb-6 flex justify-end">
<label htmlFor="sort" className="mr-2 self-center text-gray-700">Trier par:</label>
<select
          id="sort"
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          onChange={(e) => setSortType(e.target.value)}
          value={sortType}
>
<option value="latest">Plus récent</option>
<option value="oldest">Moins récent</option>
<option value="popular">Plus liké</option>
</select>
</div>
<div className="space-y-6">
        {sortPosts(data.posts, sortType).map((post) => (
<PostCard key={post.id} post={post} />
        ))}
</div>
</div>
  );
};
 
export default PostList;