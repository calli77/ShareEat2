export const articles = async (_, __, { dataSources }) => {
    return await dataSources.db.article.findMany();
};
