import { createJWT, hashPassword } from "../../modules/auth.js";
import { MutationResolvers } from "../../types.js";

export const signup: MutationResolvers['signup'] = async (_, {name, password}, {dataSources}) => {

  try{
    const existing = await dataSources.db.user.findUnique({ where: { name: name } })
    if(existing){
      throw new Error('User already exists');
    }

    const createdUser = await dataSources.db.user.create({
      data: {
        name,
        password: await hashPassword(password),
      }
    })

    const token: string = createJWT(createdUser)

    return {
      message: 'User created',
      token: token,
    }
  } catch (e) {
    return {
      message: (e as Error).message,
      token: null
    }
  }

}