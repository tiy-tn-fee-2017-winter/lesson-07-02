'use strict'

const Schema = use('Schema')

class ReviewsTableSchema extends Schema {

  up () {
    this.create('reviews', (table) => {
      table.increments();
      table.text('review');
      table.integer('restaurant_id')
        .unsigned()
        .references('id')
        .inTable('restaurants')
        .onDelete('CASCADE');

      table.integer('rating');
      table.timestamps();
    })
  }

  down () {
    this.drop('reviews')
  }

}

module.exports = ReviewsTableSchema
