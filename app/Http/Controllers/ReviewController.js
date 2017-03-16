
const Review = use('App/Model/Review');

module.exports = class ReviewController {

  * store (request, response) {
    const restaurant_id = request.param('restaurant_id');
    const input = request.only('rating', 'review');
    input.restaurant_id = restaurant_id;
    input.user_id = request.authUser.id;

    // const review = new Review(input);
    // yield review.save();
    const review = yield Review.create(input);

    response.send(review);
  }

}
