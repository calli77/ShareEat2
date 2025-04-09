import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    articles: [Article!]!
    comments: [Comment!]!
    likes: [Like!]!
  }

  type Article {
    id: ID!
    title: String!
    content: String!
    author: User!
    comments: [Comment!]!
    likes: [Like!]!
  }

  type Comment {
    id: ID!
    content: String!
    author: User!
    article: Article!
  }

  type Like {
    id: ID!
    user: User!
    article: Article!
  }

  type Response {
    message: String!
    success: Boolean!
    token: String
  }

  # ---------------- Queries ----------------

  type Query {
    articles: [Article!]!
    article(id: ID!): Article
    comments(articleId: ID!): [Comment!]!
  }

  # ---------------- Mutations ----------------

  type Mutation {
    signup(name: String!, password: String!): Response!
    login(name: String!, password: String!): Response!

    createArticle(title: String!, content: String!): Response!
    updateArticle(id: ID!, title: String, content: String): Article!
    deleteArticle(id: ID!): Boolean!

    addComment(articleId: ID!, content: String!): Response!

    likeArticle(articleId: ID!): Like!
    unlikeArticle(articleId: ID!): Boolean!
  }
`