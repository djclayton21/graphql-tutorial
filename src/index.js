const { GraphQLServer } = require('graphql-yoga');
const options = {
  port: 7890,
};

//schema
const typeDefs = `
  type Query {
    info: String!
  }
`;

//resolvers

const resolvers = {
  Query: {
    info: () => `hackernews clone API`,
  },
};

//server

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(options, (options) =>
  console.log(`Server is running on localhost:${options.port}`)
);
