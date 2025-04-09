export const article = async (_, { id }, { dataSources, user }) => {
    if (!user) {
        throw new Error("Unauthorized");
    }
    console.log("test1");
    const found = await dataSources.db.article.findUnique({
        where: { id },
    });
    console.log("test2");
    if (!found) {
        throw new Error("Article not found");
    }
    console.log("test3");
    return found;
};
