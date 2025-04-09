import { GraphQLError } from 'graphql';
import { Resolvers } from '../generated/graphql';

export const likeResolvers: Resolvers = {
  Query: {
    likesByPost: async (_, { postId }, { prisma }) => {
      return prisma.like.findMany({
        where: { postId: String(postId) },
      });
    },
    likesByUser: async (_, { userId }, { prisma }) => {
      return prisma.like.findMany({
        where: { userId: String(userId) },
      });
    },
  },
  
  Mutation: {
    likePost: async (_, { postId }, { prisma, userId }) => {
      if (!userId) {
        throw new GraphQLError('Vous devez être connécté pour pouvoir liker un post', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const post = await prisma.post.findUnique({
        where: { id: String(postId) },
      });

      if (!post) {
        throw new GraphQLError('Post Introuvable', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      const existingLike = await prisma.like.findFirst({
        where: {
          userId,
          postId: String(postId),
        },
      });

      if (existingLike) {
        throw new GraphQLError('Vous avez déjà liker ce post', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      return prisma.like.create({
        data: {
          user: {
            connect: { id: userId },
          },
          post: {
            connect: { id: String(postId) },
          },
        },
      });
    },

    unlikePost: async (_, { postId }, { prisma, userId }) => {
      if (!userId) {
        throw new GraphQLError('Vous devez être connécté pour pouvoir liker un post', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const like = await prisma.like.findFirst({
        where: {
          userId,
          postId: String(postId),
        },
      });

      if (!like) {
        throw new GraphQLError('Vous n\'avez pas liker ce post', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      await prisma.like.delete({
        where: { id: like.id },
      });

      return true;
    },
  },

  Like: {
    user: async (parent, _, { prisma }) => {
      return prisma.user.findFirstOrThrow({
        where: { id: parent.userId },
      });
    },
    post: async (parent, _, { prisma }) => {
      return prisma.post.findFirstOrThrow({
        where: { id: parent.postId },
      });
    },
  },
};