import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";


Meteor.methods({

  //insersão de uma nova tarefa
  "tasks.insert"(doc) {
    return TasksCollection.insertAsync({
      ...doc,
      //id do usuário logado
      userId: this.userId,
      //aqui eu seto como padrão que a tarefa está "para fazer"
      status: "to-do",
    });
  },

  //atualização de uma tarefa
  async "tasks.update"({ _id, updates }) {

    const task = await TasksCollection.findOneAsync({ _id });
    if (task.userId != this.userId) {
      throw new Meteor.Error('not-authorized', ' usr: '+this.userId+' task: '+task);
    }
    //atualizando a tarefa
    return TasksCollection.updateAsync(_id, {
      $set: updates,
    });
  },

  //mudar o status da tarefa
  async 'tasks.updateStatus'({ _id, newStatus }) {
    //status permitidos
    const allowedStatuses = ['todo', 'in_progress', 'completed'];

    if (!allowedStatuses.includes(newStatus)) {
      throw new Meteor.Error('invalid-status', 'O status informado não é válido.');
    }
    //alterando o status
    return await TasksCollection.updateAsync(_id, {
      $set: { status: newStatus },
    });
  },

  "tasks.delete"({_id}){

    //testando se o usuário está logado
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'Você precisa estar logado para deletar uma tarefa.');
    }
    //testando se o usuário é o dono da tarefa
    const task = TasksCollection.findOne(_id);
    if (task.userId !== this.userId) {
      throw new Meteor.Error('not-authorized', 'Você não tem permissão para deletar esta tarefa.');
    }
    
    return TasksCollection.removeAsync(_id);

  },
});