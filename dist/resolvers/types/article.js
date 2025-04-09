export const articleResolvers = {
    author: (parent, _, { dataSources }) => {
        return dataSources.db.user.findFirstOrThrow({
            where: { id: parent.authorId },
        });
    },
    comments: (parent, _, { dataSources }) => {
        return dataSources.db.comment.findMany({
            where: { articleId: parent.id },
        });
    },
    likes: (parent, _, { dataSources }) => {
        return dataSources.db.like.findMany({
            where: { articleId: parent.id },
        });
    },
};
