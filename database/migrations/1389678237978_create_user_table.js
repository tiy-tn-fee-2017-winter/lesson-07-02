'use strict'

const Schema = use('Schema')

class UsersTableSchema extends Schema {

  up () {
    this.create('users', (table) => {
      table.increments('id');
      table.string('username').unique();
      table.string('password');
      table.timestamps();
    });
  }

  down () {
    this.drop('users');
  }

}

module.exports = UsersTableSchema
