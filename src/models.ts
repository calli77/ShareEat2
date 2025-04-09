export type UserModel = {
    id: string;
    name: string;
    password: string;
  };
  
  export type ArticleModel = {
    id: string;
    title: string;
    content: string;
    authorId: string;
  };
  
  export type CommentModel = {
    id: string;
    content: string;
    authorId: string;
    articleId: string;
  };
  
  export type LikeModel = {
    id: string;
    userId: string;
    articleId: string;
  };  