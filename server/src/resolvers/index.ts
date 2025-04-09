import { Resolvers } from '../generated/graphql';
import { userResolvers } from './user.resolvers';
import { postResolvers } from './post.resolvers';
import { commentResolvers } from './comment.resolvers';
import { likeResolvers } from './like.resolvers';

export const resolvers: Resolvers = {
  Query: {
    ...userResolvers.Query,
    ...postResolvers.Query,
    ...commentResolvers.Query,
    ...likeResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...likeResolvers.Mutation,
  },
  User: userResolvers.User,
  Post: postResolvers.Post,
  Comment: commentResolvers.Comment,
  Like: likeResolvers.Like,
};

export default resolvers;