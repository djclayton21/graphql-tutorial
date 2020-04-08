const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('../prisma/generated/prisma-client');
const options = {
  port: 7890,
};

//resolvers
const resolvers = {
  Query: {
    info: () => `hackernews clone API`,
    feed: (root, args, context) => {
      return context.prisma.links();
    },
    link: (parent, args, context) => {
      return context.prisma.link({ id: args.id });
    },
  },
  Mutation: {
    postLink: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description,
      });
    },
    deleteLink: (parent, args, context) => {
      return context.prisma.deleteLink({ id: args.id });
    },
    updateLink: (parent, args, context) => {
      return context.prisma.updateLink({
        data: {
          description: args.description,
          url: args.url,
        },
        where: {
          id: args.id,
        },
      });
    },
  },
  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

//server
const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma },
});
server.start(options, (options) =>
  console.log(`Server is running on localhost:${options.port}`)
);
