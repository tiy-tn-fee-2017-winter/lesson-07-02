'use strict'
'use strict'
'use strict'
'use strict'
'use strict'
'use strict'
'use strict'

/*
|--------------------------------------------------------------------------
| Router
|--------------------------------------------------------------------------
|
| AdonisJs Router helps you in defining urls and their actions. It supports
| all major HTTP conventions to keep your routes file descriptive and
| clean.
|
| @example
| Route.get('/user', 'UserController.index')
| Route.post('/user', 'UserController.store')
| Route.resource('user', 'UserController')
*/

const Route = use('Route');
const fetch = require('node-fetch');
// Route.on('/').render('welcome');

// async function(request, response) {
//   const res = await fetch('http://swapi.co/people/1');
//   const luke = await res.json();
//
//   response.json(luke);
// }

Route.get('/', function * (request, response) {
  const res = yield fetch('http://swapi.co/api/people/1');
  const luke = yield res.json();

  response.json(luke);
});

// const Database = require('knex')(config.development);
const Database = use('Database');

Route.get('/restaurants', function * (request, response) {
  // Get all rows from the "restaurants" table
  const items = yield Database.select().from('restaurants');

  response.send(items);
});

Route.post('/restaurants', function * (request, response) {
  const restaurant = {
    name: request.input('name'),
    category: request.input('category'),
    wait_time: request.input('wait_time'),
    take_out: request.input('take_out'),
    formal: request.input('formal'),
    address: request.input('address'),
    flair: request.input('flair'),
    price_level: request.input('price_level'),
  };

  yield Database.insert(restaurant)
    .into('restaurants');

  response.send(restaurant);
});
