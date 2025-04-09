import { signup } from './resolvers/mutations/signup.js'; // Import de la mutation signup
import { login } from "./resolvers/mutations/login.js";
export const resolvers = {
    Query: {},
    Mutation: {
        signup,
        login
    }
};
