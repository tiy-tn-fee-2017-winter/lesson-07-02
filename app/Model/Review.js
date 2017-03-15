'use strict'

const Lucid = use('Lucid')

class Review extends Lucid {

  restaurant() {
    return this.hasMany('App/Model/Restaurant');
  }

}

module.exports = Review
