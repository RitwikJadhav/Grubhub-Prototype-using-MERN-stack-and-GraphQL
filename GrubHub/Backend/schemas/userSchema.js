var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var userModel = require('../api/models/userinfoModel');

var userType = new GraphQLObjectType({
    name: 'user',
    fields: function () {
      return {
        _id: {
            type: GraphQLString
        },
        FirstName: {
          type: GraphQLString
        },
        LastName: {
          type: GraphQLString
        },
        Email: {
          type: GraphQLString
        },
        Password: {
          type: GraphQLString
        },
        RestaurantName: {
          type: GraphQLString
        },
        Cuisine: {
          type: GraphQLString
        },
        role : {
            type : GraphQLString
        }
      }
    }
  });


  var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
      return {
        users: {
          type: new GraphQLList(userType),
          resolve: function () {
            const users = userModel.find().exec()
            if (!users) {
              throw new Error('Error')
            }
            return users
          }
        },
        user: {
          type: userType,
          args: {
            id: {
              name: '_id',
              type: GraphQLString
            }
          },
          resolve: function (root, params) {
            const userDetails = userModel.findById(params.id).exec()
            if (!userDetails) {
              throw new Error('Error')
            }
            return userDetails
          }
        }
      }
    }
  });

  var mutation = new GraphQLObjectType({
      name : 'Mutation',
      fields: function() {
          return {
              addUser : {
                  type: userType,
                  args : {
                    FirstName : {
                          type : GraphQLString
                      },
                      LastName : {
                          type : GraphQLString
                      },
                      Email : {
                          type : GraphQLString
                      },
                      Password : {
                          type : GraphQLString
                      },
                      role : {
                          type : GraphQLString
                      }
                  },
                  resolve : function(root, params) {
                      const user = new userModel(params);
                      const newUser = user.save();
                      if(!newUser) {
                          throw new Error('Error')
                      }
                      return newUser
                  }
              }
          }
      }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation : mutation});