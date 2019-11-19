import 'dotenv/config';
import { ApolloServer, AuthenticationError } from 'apollo-server';
// import { makeExecutableSchema } from 'graphql-tools';
import mongoose from 'mongoose';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { getUser } from './utils';

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // get the user token from the headers
      const token = req.headers.authorization || '';

      // try to retrieve a user with the token
      // console.log(token);
      const user = getUser(token);
      if (!token) throw new AuthenticationError('you must be logged in');

      // add the user to the context
      return { user };
    },
  });
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_DB_USER}:${
        process.env.MONGO_DB_PASSWORD
      }@cluster0-0oidh.mongodb.net/journal?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
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
