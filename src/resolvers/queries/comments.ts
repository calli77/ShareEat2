import { QueryResolvers } from "../../types.js";

export const comments: QueryResolvers["comments"] = async (_, { articleId }, { dataSources, user }) => {
  if (!user) {
    throw new Error("Unauthorized");
  }

  return dataSources.db.comment.findMany({
    where: {
      articleId,
    },
  });
};
