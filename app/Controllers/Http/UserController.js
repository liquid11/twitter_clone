'use strict'
const User = use('App/Models/User')

class UserController {
  
 
    async signup({request, auth, response}) {

        const userData = request.only(['name', 'username', 'email', 'password'])

        try {
            const user = await User.create(usersData)
            //generete jwt token
            const token = await auth.generate(user)

            return response.json({

                status:'success',
                data:token
            })
            } catch (error) {

                return response.status(400).json({

                    status:'error',
                    message:'There was a problem creating the user, please try again later.'
                })
            }
        }

    }

    module.exports = UserController
