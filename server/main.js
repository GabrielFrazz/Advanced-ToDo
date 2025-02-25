import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';
import { TasksCollection } from '../imports/api/TasksCollection';
import "../imports/api/TasksPublications";
import "../imports/api/TasksMethods"; 
import "../imports/api/UserPublications";
import "../imports/api/UserMethods";


Meteor.startup(() => {
});