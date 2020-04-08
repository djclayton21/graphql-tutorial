const { GraphQLServer } = require('graphql-yoga');
const options = {
  port: 7890,
};

//dummy data
let links = [
  {
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
  {
    id: 'link-1',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL',
  },
];
let idCount = links.length;

//resolvers
const resolvers = {
  Query: {
    info: () => `hackernews clone API`,
    feed: () => links,
    link: (parent, args) => {
      const link = links.find((link) => link.id === args.id);
      return link ? link : null;
    },
  },
  Mutation: {
    postLink: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    deleteLink: (parent, args) => {
      const index = links.findIndex((link) => link.id === args.id);
      if (index < 0) return null;
      else {
        const [link] = links.splice(index, 1);
        return link;
      }
    },
    updateLink: (parent, args) => {
      const index = links.findIndex((link) => link.id === args.id);
      if (index < 0) return null;
      else {
        const oldLink = links[index];
        const link = {
          ...oldLink,
          ...args,
        };
        links.splice(index, 1, link);
        return link;
      }
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
});

server.start(options, (options) =>
  console.log(`Server is running on localhost:${options.port}`)
);
