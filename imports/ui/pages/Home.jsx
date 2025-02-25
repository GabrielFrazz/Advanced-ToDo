import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const logout = () => Meteor.logout();

  return (
    <div>
      <h1>Advanced To-Do</h1>
      <Link to="/login">
        <button>Login</button>
      </Link>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Home;
