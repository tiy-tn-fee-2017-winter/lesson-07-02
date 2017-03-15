'use strict'

const Restaurant = use('App/Model/Restaurant');
const attributes = ['name', 'category', 'wait_time', 'take_out', 'formal', 'address', 'flair', 'price_level'];

class RestaurantController {

  * index(request, response) {
    // Get all rows from the "restaurants" table
    const items = yield Restaurant.with('reviews').fetch();

    response.send(items);
  }

  * store(request, response) {
    const input = request.only(attributes);

    const restaurant = yield Restaurant.create(input)

    response.send(restaurant);
  }

  * show(request, response) {
    const id = request.param('id');

    const r = yield Restaurant.with('reviews').where({ id }).firstOrFail();

    response.send(r);
  }

  * update(request, response) {
    const id = request.param('id');

    const restaurant = yield Restaurant.with('reviews').where({ id }).firstOrFail();

    // Check if the restaurant exists
    if (restaurant === undefined) {
      // Send the status code 404 (not found) with a JSON error object
      return response.status(404).json({
        error: 'Not Found'
      });
    }

    const input = request.only(attributes);

    restaurant.fill(input);
    yield restaurant.save();

    response.send(restaurant);
  }

  * destroy(request, response) {
    const id = request.param('id');
    const restaurant = yield Restaurant.with('reviews').where({ id }).firstOrFail();
    yield restaurant.delete();

    response.noContent();
  }

  * storeReview(request, response) {
    const id = request.param('id');
    const input = request.only('review', 'rating');

    const restaurant = yield Restaurant.with('reviews').where({ id }).firstOrFail();

    const review = yield restaurant.reviews().create(input);

    response.json(review);
  }

}

module.exports = RestaurantController
