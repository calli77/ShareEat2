export const comments = async (_, { articleId }, { dataSources, user }) => {
    if (!user) {
        throw new Error("Unauthorized");
    }
    return dataSources.db.comment.findMany({
        where: {
            articleId,
        },
    });
};
