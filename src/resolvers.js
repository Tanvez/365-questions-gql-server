import { Question } from './models/Question';
import { Answer } from './models/Answer';

export const resolvers = {
  Query: {
    hello: () => 'Hello',
    questions: () => Question.find(),
    answers: () => Answer.find(),
    answer: async (_, { id }) => {
      const result = await Answer.findOne({ _id: id });
      return result;
    },
    question: async (_, { id }) => {
      const result = await Question.findOne({ _id: id });
      return result;
    },
  },
  // for nested queries
  Answer: {
    question: parent => {
      console.log({ parent });
      return Question.findOne({ _id: parent.questionId });
    },
  },
  Mutation: {
    createQuestion: async (_, { question }) => {
      const newQuestion = new Question({ question });
      await newQuestion.save();
      return newQuestion;
    },
    answerQuestion: async (_, { answer, questionId }) => {
      const newAnswer = new Answer({
        answer,
        questionId,
      });
      await newAnswer.save();
      return newAnswer;
    },
  },
};
