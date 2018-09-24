'use strict'

const Model = use('Model')

class Tweet extends Model {

    user() {
        return this.belongsTo('App/Models/User')
    }

    replies() {

        return this.hasMany('App/Models/Reply')
    }

    favourites() {

        return this.hasMany('App/Models/Favourite')
    }
}

module.exports = Tweet
