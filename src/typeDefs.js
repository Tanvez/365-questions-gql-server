import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    hello: String!
    questions: [Question!]!
    answers: [Answer!]!
    question(id: ID!): Question
    answer(id: ID!): Answer!
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
  type Mutation {
    createQuestion(question: String!): Question
    answerQuestion(answer: String!, questionId: ID!): Question
  }
`;
