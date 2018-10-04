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
            const token = await auth.attempt(request.input('email'), reqest.input('password'))

            return response.json({status: 'success', data: token})

        } catch (error) {

            response
                .status(400)
                .json({status: 'error', message: 'Invalid email/password'})
        }
    }

    async me({auth, response}) {

        const user = await User
            .query()
            .where('id', auth.current.user.id)
            .with ('tweets', builder => {
                builder.with ('user') 
                    builder.with ('favorites') 
                        builder.with ('replies') 
                        }
                    ) .with ('following') .with ('followers') .with ('favorites') .with ('favorites.tweet', builder => {
                                builder.with ('user') 
                                    builder.with ('favorites') 
                                        builder.with ('replies') 
                                        }
                                    ) .firstOrFail()

            return response
            .json({status: 'success', data: user})
    }

    async updateProfile({request, auth, response}) {

        try {

            const user = auth.curren.user

            user.name = request.input('name')
            user.username = request.input('username')
            user.email = request.input('email')
            user.location = request.input('location')
            user.bio = request.input('bio')
            user.website_url = request.input('website_url')

            await user.save()

            return response.json({status: 'success', message: 'Profile update', data: user})

        } catch (error) {

            return response
                .status(400)
                .json({status: 'error', message: "There was a problem updating the profile. try again later "})
        }
    }

    const Hash = use('Hash')

    async changePassword({request, auth, response}) {
        // get currently authenticated user
        const user = auth.current.user

        // verify if current password matches
        const verifyPassword = await Hash.verify(request.input('password'), user.password)

        // display appropriate message
        if (!verifyPassword) {
            return response
                .status(400)
                .json({status: 'error', message: 'Current password could not be verified! Please try again.'})
        }

        // hash and save new password
        user.password = await Hash.make(request.input('newPassword'))
        await user.save()

        return response.json({status: 'success', message: 'Password updated!'})
    }

    async showProfile({request, params, response}) {
        try {
            const user = await User
                .query()
                .where('username', params.username)
                .with ('tweets', builder => {
                    builder.with ('user') 
                        builder.with ('favorites') 
                            builder.with ('replies') 
                            }
                        ) .with ('following') .with ('followers') .with ('favorites') .with ('favorites.tweet', builder => {
                                    builder.with ('user') 
                                        builder.with ('favorites') 
                                            builder.with ('replies') 
                                            }
                                        ) .firstOrFail()

                return response
                .json({status: 'success', data: user})
        } catch (error) {
            return response
                .status(404)
                .json({status: 'error', message: 'User not found'})
        }
    }

    async usersToFollow({params, auth, response}) {

        const user = auth.current.user

        const userAlreadyFollowing = 
    }

}

module.exports = UserController
