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
            Email : {
              name : 'Email',
              type : GraphQLString
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

  const mutation = new GraphQLObjectType({
      name : 'Mutation',
      fields: {
              addBuyer : {
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
              },

              addOwner : {
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
                      RestaurantName : {
                        type: GraphQLString
                      },
                      Cuisine : {
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
              },

              login : {
                    type : userType,
                    args : {
                      Email : {
                        type : GraphQLString
                      },
                      Password : {
                        type : GraphQLString
                      }
                    },
                    resolve : function(root, params) {
                      const response = userModel.findOne({Email : params.Email});
                      if(!response) {
                        throw new Error('Error');
                      } 
                      return response
                    }
              },

              buyerProfileUpdate : {
                type : userType,
                args : {
                  FirstName : {
                    type : GraphQLString
                  },
                  LastName : {
                    type : GraphQLString
                  },
                  Email : {
                    type : GraphQLString
                  }
                },
                resolve : function(root, params) {
                  const response = userModel.findOneAndUpdate({Email : params.Email}, {$set: {FirstName : params.FirstName, LastName : params.LastName, Email : params.Email}},{new:true});
                  if(!response) {
                    throw new Error('Error');
                  }
                  return response;
                }
              }
      }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation : mutation});