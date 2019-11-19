import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Question, Answer, User } from './models';

const { APP_SECRET } = process.env;

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
    // users: (_, args, context) => {
    //   // In this case, we'll pretend there is no data when
    //   // we're not logged in. Another option would be to
    //   // throw an error.
    //   if (!context.user) return [];

    //   return ['bob', 'jake'];
    // },
  },
  // for nested queries
  Answer: {
    question: parent => Question.findOne({ _id: parent.questionId }),
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
    signup: async (_, args) => {
      const password = await bcrypt.hash(args.password, 10);
      const user = await new User({ ...args, password });
      await user.save();
      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      return {
        token,
        user,
      };
    },
    login: async (_, args) => {
      const user = await User.findOne({ email: args.email });
      if (!user) {
        throw new Error('No such user found');
      }
      const valid = await bcrypt.compare(args.password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ userId: user.id }, APP_SECRET);

      return {
        token,
        user,
      };
    },
  },
};
