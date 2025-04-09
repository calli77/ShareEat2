import { comparePasswords, createJWT } from "../../modules/auth.js";
import { GraphQLError } from "graphql";
export const login = async (_, { name, password }, { dataSources }) => {
    try {
        const findUser = await dataSources.db.user.findFirstOrThrow({
            where: { name: name }
        });
        const isValidPassword = await comparePasswords(password, findUser.password);
        if (!isValidPassword) {
            throw new GraphQLError('Password not valid');
        }
        const token = createJWT(findUser);
        return {
            message: 'User find',
            success: true,
            token: token
        };
    }
    catch (e) {
        return {
            message: e.message,
            success: false,
        };
    }
};
