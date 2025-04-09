import { GraphQLError } from 'graphql';
import { Resolvers } from '../generated/graphql';
import { hashPassword, verifyPassword, generateToken } from '../auth/auth.utils';

export const userResolvers: Resolvers = {
  Query: {
    me: async (_, __, { prisma, userId }) => {
      if (!userId) {
        throw new GraphQLError('Non identifié', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      return prisma.user.findUnique({ where: { id: userId } });
    },
    user: async (_, { id }, { prisma }) => {
      return prisma.user.findUnique({ where: { id: String(id) } });
    },
    users: async (_, __, { prisma }) => {
      return prisma.user.findMany();
    },
  },
  
  Mutation: {
    signUp: async (_, { input }, { prisma }) => {
      const { password, username } = input;

      const existingUser = await prisma.user.findFirst({
        where: { 
          OR: [
            { username }
          ]
        },
      });

      if (existingUser) {
        throw new GraphQLError('Ce nom d\'utilisateur est déjà utilisé', {
          extensions: { code: 'BAD_USER_INPUT' },
        });
      }

      const hashedPassword = await hashPassword(password);

      const user = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });

      const token = generateToken(user);

      return {
        token,
        user,
      };
    },

    signIn: async (_, { input }, { prisma }) => {
      const { username, password } = input;

      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) {
        throw new GraphQLError('Nom d\'utilisateur ou mot de passe incorrect', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const isPasswordValid = await verifyPassword(password, user.password);

      if (!isPasswordValid) {
        throw new GraphQLError('Nom d\'utilisateur ou mot de passe incorrect', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      const token = generateToken(user);

      return {
        token,
        user,
      };
    },

    deleteUser: async (_, __, { prisma, userId }) => {
      if (!userId) {
        throw new GraphQLError('Non identifié', {
          extensions: { code: 'UNAUTHENTICATED' },
        });
      }

      await prisma.user.delete({ where: { id: userId } });
      return true;
    },
  },

  User: {
    posts: async (parent, _, { prisma }) => {
      return prisma.post.findMany({
        where: { authorId: parent.id },
      });
    },
    comments: async (parent, _, { prisma }) => {
      return prisma.comment.findMany({
        where: { authorId: parent.id },
      });
    },
    likes: async (parent, _, { prisma }) => {
      return prisma.like.findMany({
        where: { userId: parent.id },
      });
    },
  },
};