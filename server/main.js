import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/api/TasksCollection';
import { Accounts } from 'meteor/accounts-base';

const insertTask = (task) =>
  TasksCollection.insertAsync(task);

Meteor.startup(async () => {

  if (await TasksCollection.find().countAsync() === 0) {
    insertTask({
      name: 'teste',
      description: 'teste',
      status: 'teste',
      createdAt: new Date(),
      userId: null, 
      isPersonal: false,
    });

    console.log('task criada');
  }
});
