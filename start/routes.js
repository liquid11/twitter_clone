'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')

Route.get('/', () => {
  return {greeting: 'Hello world in JSON'}
})

Route.get(':username', 'UserController.showProfile')

Route.post('/signup', 'UserController.signup')

Route.post('/login', 'UserController.login')

Route.post('/change_password', 'UserController.changePassword')

Route.group(() => {

  Route.get('/user_to_follow', 'UserController.usersToFollow')

})
  .prefix('users')
  .middleware('auth:jwt')

Route.group(() => {

  Route.get('/me', 'UserController.me')
  Route.put('/update_profile', 'UserController.updateProfile')
})
  .prefix('account')
  .middleware('auth:jwt')
