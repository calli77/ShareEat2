import { comparePasswords, createJWT, hashPassword } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";
import { GraphQLError } from "graphql";

export const login: MutationResolvers['login'] = async (_, {name, password}, {dataSources}) => {

  try{
    const findUser = await dataSources.db.user.findFirstOrThrow({
      where: { name: name }
    })
    const isValidPassword = await comparePasswords(password, findUser.password)
    if (!isValidPassword) {
      throw new GraphQLError('Password not valid')
    }

    const token: string = createJWT(findUser)

    return {
      message: 'User find',
      token: token
    }
  } catch (e) {
    return {
      message: (e as Error).message,
      token: null,
    }
  }

}