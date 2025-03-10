import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './TasksCollection';

Meteor.publish('tasks', function () {
  //retornando todas as tarefas
  return TasksCollection.find();
});

Meteor.publish('tasks.user', function () {
  //checando se o usuário está logado
  const userId = this.userId;
  if (!userId) {
    return this.ready();
  }
  return TasksCollection.find({ userId });
});

Meteor.publish('tasks.filter', function (filter) {
  return TasksCollection.find(filter);
});
