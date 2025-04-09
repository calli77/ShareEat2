import { signup } from './resolvers/mutations/signup.js';
import { login } from "./resolvers/mutations/login.js";
import { createArticle } from "./resolvers/mutations/createArticle.js";
import { articleResolvers } from "./resolvers/types/article.js";
import { articles } from "./resolvers/queries/articles.js";
import { article } from "./resolvers/queries/article.js";
export const resolvers = {
    Query: {
        article,
        articles,
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
