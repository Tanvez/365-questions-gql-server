import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    hello: String!
    questions: [Question!]
    answers: [Answer!]
    question(id: ID!): Question
  }
  type Question {
    id: ID!
    question: String!
    answers: [Answer]
  }
  type Answer {
    id: ID!
    answer: String!
    questionId: ID
    question: String!
  }
  type Mutation {
    createQuestion(question: String!): Question
    answerQuestion(
      answer: String!
      question: String!
      questionId: ID!
    ): Question
  }
`;
