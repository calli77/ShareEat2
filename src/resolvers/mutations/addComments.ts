import { MutationResolvers } from "../../types.js";

export const addComment: MutationResolvers["addComment"] = async ( _,{ articleId, content },{ dataSources, user }) => {

  try{
    if (!user) {
        throw new Error("Unauthorized");
    }
    const comment = await dataSources.db.comment.create({
      data: {
        content,
        articleId,
        authorId: user.id,
      },
    });
    
    return {
        message: 'post commented',
        success: true,
    }

  } catch (e) {
    return {
        message: (e as Error).message,
        success: false,
    }
  } 


};

