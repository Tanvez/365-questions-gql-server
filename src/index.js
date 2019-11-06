import 'dotenv/config';
import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
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
