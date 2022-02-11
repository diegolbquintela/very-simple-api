const { v4: uuid4 } = require('uuid');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
  {
    id: 'u1',
    name: 'esther lara',
    email: 'test@test.com',
    password: 'test',
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError('E-mail taken. User not created', 422);
  }

  const createUser = {
    id: uuid4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createUser);

  res.status(201).json({ user: createUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError('User not identified. Check your credentials', 401);
  }

  res.json({ message: 'logged in' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
