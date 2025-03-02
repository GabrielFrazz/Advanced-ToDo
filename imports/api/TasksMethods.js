import { Meteor } from 'meteor/meteor';
import { TasksCollection } from './TasksCollection';

Meteor.methods({
  //insersão de uma nova tarefa
  'tasks.insert'(doc) {
    return TasksCollection.insertAsync({
      ...doc,
      //id do usuário logado
      userId: this.userId,
      //aqui eu seto como padrão que a tarefa está "para fazer"
      status: 'to-do',
    });
  },

  //atualização de uma tarefa
  async 'tasks.update'({ _id, updates }) {
    const task = await TasksCollection.findOneAsync({ _id });
    if (task.userId != this.userId) {
      throw new Meteor.Error('not-authorized', ' usr: ' + this.userId + ' task: ' + task);
    }
    //atualizando a tarefa
    return TasksCollection.updateAsync(_id, {
      $set: updates,
    });
  },

  //mudar o status da tarefa
  async 'tasks.updateStatus'({ _id, newStatus }) {
    const task = await TasksCollection.findOneAsync({ _id });

    //status permitidos
    const allowedStatuses = ['to-do', 'in_progress', 'completed'];

    //testando se a tarefa pertence ao usuário
    if (task.userId != this.userId) {
      throw new Meteor.Error(
        'not-authorized, the task do not belong to you fool',
        ' usr: ' + this.userId + ' task: ' + task
      );
    }

    //verificando se é um estado valido
    if (!allowedStatuses.includes(newStatus)) {
      throw new Meteor.Error('invalid-status', 'O status informado não é válido.');
    }

    //verificando se o usuário iniciou a tarefa antes de finalizar
    if (task.status === 'to-do' && newStatus === 'completed') {
      throw new Meteor.Error(
        'take it easy',
        'a tarefa deve primeiro estar em andamento antes de ser finalizada'
      );
    }

    //alterando o status
    return await TasksCollection.updateAsync(_id, {
      $set: { status: newStatus },
    });
  },

  async 'tasks.delete'({ _id }) {
    //testando se o usuário está logado
    if (!this.userId) {
      throw new Meteor.Error(
        'not-authorized',
        'Você precisa estar logado para deletar uma tarefa.'
      );
    }

    //testando se o usuário é o dono da tarefa
    const task = await TasksCollection.findOneAsync({ _id });

    if (task.userId !== this.userId) {
      throw new Meteor.Error('not-authorized', 'Você não tem permissão para deletar esta tarefa.');
    }

    return TasksCollection.removeAsync(_id);
  },
});
