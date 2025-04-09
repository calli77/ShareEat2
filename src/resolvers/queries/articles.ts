import { QueryResolvers } from "../../types.js";

export const articles: QueryResolvers["articles"] = async (_, __, { dataSources, user }) => {
    if (!user) {
      throw new Error("Unauthorized");
    }

    return dataSources.db.article.findMany();
}