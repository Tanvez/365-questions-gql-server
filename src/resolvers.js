import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Question, Answer, User } from './models';

const { APP_SECRET } = process.env;

export const resolvers = {
  Query: {
    hello: () => 'Hello',
    questions: async (_, args, { user }) => {
      if (!user) throw new Error('Not Authenticated');
      const result = await Question.find();
      return result;
    },
    answers: async (_, args, { user }) => {
      console.log(user);
      if (!user) throw new Error('Not Authenticated');
      const result = await Answer.find();
      return result;
    },
    answer: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not Authenticated');
      const result = await Answer.findOne({ _id: id });
      return result;
    },
    question: async (_, { id }, { user }) => {
      if (!user) throw new Error('Not Authenticated');
      const result = await Question.findOne({ _id: id });
      return result;
    },
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
    answerQuestion: async (_, { answer, questionId, userId }) => {
      const newAnswer = new Answer({
        answer,
        questionId,
        userId,
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
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('No such user found');
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ id: user.id, username }, APP_SECRET);

      return {
        token,
        user,
      };
    },
  },
};
