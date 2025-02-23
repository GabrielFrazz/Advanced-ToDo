import { Meteor } from 'meteor/meteor';
import React, { useState, Fragment} from 'react';
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { LoginForm } from './pages/LoginForm';


export const App = () => {
  const user = useTracker(()=>Meteor.user());
  const logout = () => Meteor.logout();

  if (!user) {
    return <LoginForm />;
  }

  return(
    <div>
      <h1>Inicio do projeto</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );

};