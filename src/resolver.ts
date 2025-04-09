import { Resolvers } from "./types";
import { signup } from './resolvers/mutations/signup.js'
import { login } from "./resolvers/mutations/login.js";

export const resolvers: Resolvers  = {
  Query: {
  },
  Mutation: {
    signup,
    login
  }
}
