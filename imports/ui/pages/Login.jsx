import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <p>teste login</p>
      <LoginForm />
      <div>
        <p>
          Voltar para a <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
