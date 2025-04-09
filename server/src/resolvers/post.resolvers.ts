import { GraphQLError } from 'graphql';
import { Resolvers } from '../generated/graphql';

export const postResolvers: Resolvers = {
  Query: {
    post: async (_, { id }, { prisma }) => {
      return prisma.post.findUnique({
        where: { id: String(id) },
      });
    },
    // posts: async (_, { orderBy }, { prisma }) => {
    //   let orderByClause = {};
      
    //   if (orderBy) {
    //     if (orderBy.createdAt) {
    //       orderByClause = { createdAt: orderBy.createdAt };
    //     } else if (orderBy.likesCount) {
    //       const posts = await prisma.post.findMany({
    //         include: {
    //           _count: {
    //             select: { likes: true },
    //           },
    //         },
    //       });
          
    //       return posts.sort((a, b) => {
    //         if (orderBy.likesCount === 'asc') {
    //           return a._count.likes - b._count.likes;
    //         } else {
    //           return b._count.likes - a._count.likes;
    //         }
    //       });
    //     }
    //   }
      
    //   return prisma.post.findMany({
    //     orderBy: orderByClause,
    //   });
    // },
    posts: async (_, __, { prisma }) => {
      // Simplement renvoyer tous les posts sans tri
      return prisma.post.findMany();
    },
    postsByUser: async (_, { userId }, { prisma }) => {
      return prisma.post.findMany({
        where: { authorId: String(userId) },
        orderBy: { createdAt: 'desc' },
      });
    },
  },
  
  Mutation: {
    createPost: async (_, { input }, { prisma, userId }) => {
      if (!userId) {
        throw new GraphQLError('Pour créer un post vous devez être connecté', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const { title, content } = input;

      return prisma.post.create({
        data: {
          title,
          content,
          author: {
            connect: { id: userId },
          },
        },
      });
    },

    updatePost: async (_, { id, input }, { prisma, userId }) => {
      if (!userId) {
        throw new GraphQLError('Vous devez vous connecter pour modifier un post', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const post = await prisma.post.findUnique({
        where: { id: String(id) },
      });

      if (!post) {
        throw new GraphQLError('Post introuvable', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      if (post.authorId !== userId) {
        throw new GraphQLError('Vous pouvez seulement modifier vos propres post', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      return prisma.post.update({
        where: { id: String(id) },
        data: {
          ...(input.title !== undefined && { title: input.title }),
          ...(input.content !== undefined && { content: input.content })
        },
      });
    },

    deletePost: async (_, { id }, { prisma, userId }) => {
      if (!userId) {
        throw new GraphQLError('Vous devez vous connecter pour modifier un post', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const post = await prisma.post.findUnique({
        where: { id: String(id) },
      });

      if (!post) {
        throw new GraphQLError('Post introuvable', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      if (post.authorId !== userId) {
        throw new GraphQLError('Vous pouvez seulement modifier vos propre posts', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      await prisma.post.delete({
        where: { id: String(id) },
      });

      return true;
    },
  },

  Post: {
    author: async (parent, _, { prisma }) => {
      return prisma.user.findFirstOrThrow({
        where: { id: parent.authorId },
      });
    },
    comments: async (parent, _, { prisma }) => {
      return prisma.comment.findMany({
        where: { postId: parent.id },
        orderBy: { createdAt: 'desc' },
      });
    },
    likes: async (parent, _, { prisma }) => {
      return prisma.like.findMany({
        where: { postId: parent.id },
      });
    },
    likesCount: async (parent, _, { prisma }) => {
      const count = await prisma.like.count({
        where: { postId: parent.id },
      });
      return count;
    },
  },
};