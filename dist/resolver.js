import { signup } from './resolvers/mutations/signup.js';
import { login } from "./resolvers/mutations/login.js";
import { createArticle } from "./resolvers/mutations/createArticle.js";
import { articleResolvers } from "./resolvers/types/article.js";
export const resolvers = {
    Query: {
        articles: async (_, __, { dataSources }) => {
            return dataSources.db.article.findMany();
        },
    },
    Article: {
        ...articleResolvers,
    },
    Mutation: {
        signup,
        login,
        createArticle
    }
};
