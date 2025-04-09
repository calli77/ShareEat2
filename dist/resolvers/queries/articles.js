export const articles = async (_, __, { dataSources, user }) => {
    if (!user) {
        throw new Error("Unauthorized");
    }
    return dataSources.db.article.findMany();
};
