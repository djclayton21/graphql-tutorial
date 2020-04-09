const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('../prisma/generated/prisma-client');
const options = {
  port: 7890,
};

const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const User = require('./resolvers/User');
const Link = require('./resolvers/Link');
//resolvers

const resolvers = {
  Query,
  Mutation,
  User,
  Link,
};

//server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(options, (options) =>
  console.log(`Server is running on localhost:${options.port}`)
);
