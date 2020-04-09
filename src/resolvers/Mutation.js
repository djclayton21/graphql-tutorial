const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils.js');

async function signup(parent, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error('Login Incorrect');
  }
  const isValid = await bcrypt.compare(args.password, user.password);
  if (!isValid) {
    throw new Error('Login Incorrect');
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

function postLink(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
}

function deleteLink(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.deleteLink({ id: args.id });
}

function updateLink(parent, args, context, info) {
  const userId = getUserId(context);
  return context.prisma.updateLink({
    data: {
      description: args.description,
      url: args.url,
    },
    where: {
      id: args.id,
    },
  });
}
module.exports = {
  signup,
  login,
  postLink,
  deleteLink,
  updateLink,
};
