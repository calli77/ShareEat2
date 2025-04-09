export const article = async (_, { id }, { dataSources, user }) => {
    if (!user) {
        throw new Error("Unauthorized");
    }
    const found = await dataSources.db.article.findUnique({
        where: { id },
    });
    if (!found) {
        throw new Error("Article not found");
    }
    return found;
};
