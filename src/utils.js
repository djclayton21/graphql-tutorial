const jwt = require('jsonwebtoken');
const APP_SECRET = 'im-hungry-but-thats-ok';

function getUserId(context) {
  const Authorization = context.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  } else throw new Error('bzzz');
}

module.exports = {
  APP_SECRET,
  getUserId,
};
