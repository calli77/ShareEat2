
import fs from 'fs';
import path from 'path';

const userSchema = fs.readFileSync(path.join(__dirname, 'user.graphql'), 'utf8');
const postSchema = fs.readFileSync(path.join(__dirname, 'post.graphql'), 'utf8');
const commentSchema = fs.readFileSync(path.join(__dirname, 'comment.graphql'), 'utf8');
const likeSchema = fs.readFileSync(path.join(__dirname, 'like.graphql'), 'utf8');

export const typeDefs = [
  userSchema,
  postSchema,
  commentSchema,
  likeSchema
];

export default typeDefs;