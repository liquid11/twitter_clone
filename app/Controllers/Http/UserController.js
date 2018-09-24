'use strict'
const User = use('App/Models/User')

class UserController {

    async signup({request, auth, response}) {

        const userData = request.only(['name', 'username', 'email', 'password'])

        try {
            const user = await User.create(usersData)
            //generete jwt token
            const token = await auth.generate(user)

            return response.json({status: 'success', data: token})
        } catch (error) {

            return response
                .status(400)
                .json({status: 'error', message: 'There was a problem creating the user, please try again later.'})
        }
    }

    async login([request, auth, response]) {

        try {
            // validate the user credentials and generate a JWT token
            const token = await auth.attempt(
                request.input('email'),
                reqest.input('password'))

                return response.json({
                    status:'success',
                    data:token
                })

        } catch (error) {

            response.status(400).json({

                status:'error',
                message:'Invalid email/password'
            })
        }
    }

}

module.exports = UserController
