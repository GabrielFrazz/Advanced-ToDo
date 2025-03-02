import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
  async 'users.signupFull'(userData) {
    check(userData, {
      nome: String,
      email: String,
      dataNascimento: String,
      sexo: String,
      empresa: String,
      password: String,
    });

    const dataNascimentoDate = new Date(userData.dataNascimento);
    if (isNaN(dataNascimentoDate.getTime())) {
      throw new Meteor.Error('invalid-date', 'Data de Nascimento inválida.');
    }

    const existingUser = Meteor.users.findOneAsync({ 'emails.address': userData.email });
    if (await existingUser) {
      throw new Meteor.Error('email-already-exists', 'Este email já está cadastrado.');
    }

    const userId = Accounts.createUser({
      email: userData.email,
      password: userData.password,
      profile: {
        nome: userData.nome,
        dataNascimento: dataNascimentoDate,
        sexo: userData.sexo,
        empresa: userData.empresa,
        foto: null,
      },
    });

    return userId;
  },
});

Meteor.methods({
  'users.signupBasic'(userData) {
    check(userData, {
      email: String,
      password: String,
    });

    const userId = Accounts.createUser({
      email: userData.email,
      password: userData.password,
    });

    return userId;
  },
});

Meteor.methods({
  async 'users.updateProfile'(profileData) {
    check(profileData, {
      nome: String,
      email: String,
      dataNascimento: String,
      sexo: String,
      empresa: String,
      foto: String,
    });
    console.log(this.userId);
    if (!this.userId) {
      throw new Meteor.Error(
        'not-authorized',
        'Você precisa estar logado para atualizar o perfil.'
      );
    }
    console.log(this.userId);

    if (!profileData.foto.startsWith('data:image/')) {
      throw new Meteor.Error(
        'invalid-image',
        'A foto fornecida não é uma string base64 válida de uma imagem.'
      );
    }

    const dataNascimentoDate = new Date(profileData.dataNascimento);
    if (isNaN(dataNascimentoDate.getTime())) {
      throw new Meteor.Error('invalid-date', 'Data de Nascimento inválida.');
    }

    Meteor.users.updateAsync(this.userId, {
      $set: {
        'profile.nome': profileData.nome,
        'profile.dataNascimento': dataNascimentoDate,
        'profile.sexo': profileData.sexo,
        'profile.empresa': profileData.empresa,
        'profile.foto': profileData.foto,
        'emails.0.address': profileData.email,
      },
    });
  },
});
