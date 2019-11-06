import { Question } from './models/Question';
import { Answer } from './models/Answer';

export const resolvers = {
  Query: {
    hello: () => 'Hello',
    questions: () => Question.find(),
    answers: () => Answer.find(),
    question: async (parent, args, context, info) => {
      const result = await Question.findOne({ _id: args.id });
      console.log({ result });
      return result;
    },
  },
  Mutation: {
    createQuestion: async (_, { question }) => {
      const newQuestion = new Question({ question });
      await newQuestion.save();
      return newQuestion;
    },
    answerQuestion: async (_, { answer, questionId, question }) => {
      const newAnswer = new Answer({
        answer,
        question: { _id: questionId, question },
      });
      await newAnswer.save();
      const result = await Question.findOneAndUpdate(
        { _id: questionId },
        { $push: { answers: newAnswer } },
        { new: true }
      );

      return result;
    },
  },
};
