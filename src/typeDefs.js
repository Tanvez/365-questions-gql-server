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
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Mutation {
    createQuestion(question: String!): Question
    answerQuestion(answer: String!, questionId: ID!): Question
    signup(email: String!, password: String!, name: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }
`;
