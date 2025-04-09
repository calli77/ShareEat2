import { GraphQLError } from 'graphql';
import { Resolvers } from '../generated/graphql';

export const commentResolvers: Resolvers = {
  Query: {
    comment: async (_, { id }, { prisma }) => {
      return prisma.comment.findUnique({
        where: { id: String(id) },
      });
    },
    commentsByPost: async (_, { postId }, { prisma }) => {
      return prisma.comment.findMany({
        where: { postId: String(postId) },
        orderBy: { createdAt: 'desc' },
      });
    },
  },
  
  Mutation: {
    createComment: async (_, { input }, { prisma, userId }) => {
      if (!userId) {
        throw new GraphQLError('Vous devez vous connecter pour pouvoir commenter', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const { content, postId } = input;

      const post = await prisma.post.findUnique({
        where: { id: String(postId) },
      });

      if (!post) {
        throw new GraphQLError('Post introuvable', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      return prisma.comment.create({
        data: {
          content,
          author: {
            connect: { id: userId },
          },
          post: {
            connect: { id: String(postId) },
          },
        },
      });
    },

    updateComment: async (_, { id, input }, { prisma, userId }) => {
      if (!userId) {
        throw new GraphQLError('Vous devez vous identifier pour modifier un commentaire', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const comment = await prisma.comment.findUnique({
        where: { id: String(id) },
      });

      if (!comment) {
        throw new GraphQLError('Commentaire introuvable', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      if (comment.authorId !== userId) {
        throw new GraphQLError('Vous pouvez seulement modifier vos propre commentaire', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      return prisma.comment.update({
        where: { id: String(id) },
        data: {
          content: input.content,
        },
      });
    },

    deleteComment: async (_, { id }, { prisma, userId }) => {
      if (!userId) {
        throw new GraphQLError('Vous devez être connecter pour pouvoir supprimr un commentaire', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const comment = await prisma.comment.findUnique({
        where: { id: String(id) },
      });

      if (!comment) {
        throw new GraphQLError('Commentaire introuvable', {
          extensions: { code: 'NOT_FOUND' },
        });
      }

      if (comment.authorId !== userId) {
        throw new GraphQLError('Vous pouvez seulement supprimer vos propre commentaire', {
          extensions: { code: 'FORBIDDEN' },
        });
      }

      await prisma.comment.delete({
        where: { id: String(id) },
      });

      return true;
    },
  },

  Comment: {
    author: async (parent, _, { prisma }) => {
      return prisma.user.findFirstOrThrow({
        where: { id: parent.authorId },
      });
    },
    post: async (parent, _, { prisma }) => {
      return prisma.post.findFirstOrThrow({
        where: { id: parent.postId },
      });
    },
  },
};