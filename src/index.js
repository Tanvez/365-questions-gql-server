import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
// import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { verifyToken } from './utils';

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const tokenWithBearer = req.headers.authorization || '';
      const token = tokenWithBearer.split(' ')[1];
      const user = verifyToken(token);
      return {
        user,
      };
    },
  });
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${
        process.env.MONGO_DB_PASSWORD
      }@cluster0-0oidh.mongodb.net/journal?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );

    server.listen().then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();
