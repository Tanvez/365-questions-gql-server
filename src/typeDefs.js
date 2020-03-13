import { gql } from 'apollo-server';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Question {
    id: ID!
    question: String!
  }

  type Answer {
    id: ID!
    answer: String!
    questionId: ID!
    question: Question!
  }

  type Query {
    # me: User!
    hello: String!
    questions: [Question!]!
    answers: [Answer!]!
    question(id: ID!): Question
    answer(id: ID!): Answer!
    currentUser: User!
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    createQuestion(question: String!): Question
    answerQuestion(answer: String!, questionId: ID!, userId: ID!): Question
    signup(email: String!, password: String!, username: String!): AuthPayload!
    login(username: String!, password: String!): AuthPayload!
  }
`;
