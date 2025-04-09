// resolvers/mutations/createArticle.ts
export const createArticle = async (_, { title, content }, { dataSources, user }) => {
    try {
        if (!user) {
            throw new Error("Unauthorized");
        }
        const article = await dataSources.db.article.create({
            data: {
                title,
                content,
                authorId: user.id,
            },
        });
        return {
            message: 'Article created',
            success: true,
        };
    }
    catch (e) {
        return {
            message: e.message,
            success: false,
        };
    }
};
