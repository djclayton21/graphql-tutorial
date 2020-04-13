import React, { useState } from 'react';
import { AUTH_TOKEN } from '../constants';
import { gql } from 'apollo-boost';
import { Mutation } from 'react-apollo';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;
const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

function Login({ history }) {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    name: ''
  });

  const { name, email, password } = loginForm;
  const [isLogin, setIsLogin] = useState(true); //toggle login/signup

  const handleInput = event => {
    event.persist();
    setLoginForm(prevState => ({
      ...prevState,
      [event.target.name]: event.target.value
    }));
  };

  const _confirm = async data => {
    const { token } = isLogin ? data.login : data.signup;
    _saveUserData(token);
    history.push('/');
  };

  const _saveUserData = token => {
    localStorage.setItem(AUTH_TOKEN, token);
  };
  return (
    <div>
      <h4 className="mv3">{isLogin ? 'Login' : 'Sign Up'}</h4>
      <div className="flex flex-column">
        {!isLogin && (
          <input
            value={name}
            onChange={handleInput}
            name="name"
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={email}
          onChange={handleInput}
          name="email"
          type="text"
          placeholder="Your email address"
        />
        <input
          value={password}
          onChange={handleInput}
          name="password"
          type="password"
          placeholder="Choose a safe password"
        />
      </div>
      <div className="flex mt3">
        <Mutation
          mutation={isLogin ? LOGIN_MUTATION : SIGNUP_MUTATION}
          variables={{ email, password, name }}
          onCompleted={data => _confirm(data)}
        >
          {mutation => (
            <div className="pointer mr2 button" onClick={mutation}>
              {isLogin ? 'login' : 'create account'}
            </div>
          )}
        </Mutation>
        <div className="pointer button" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'need to create an account?' : 'already have an account?'}
        </div>
      </div>
    </div>
  );
}

export default Login;
