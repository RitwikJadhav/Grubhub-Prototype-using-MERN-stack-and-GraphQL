var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var userModel = require('../api/models/userinfoModel');
var sectionModel = require('../api/models/sectionModel');
var itemModel = require('../api/models/itemModel');

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

var sectionType = new GraphQLObjectType({
  name : 'section',
  fields : function() {
    return {
      _id : {
        type : GraphQLString
      },
      sectionName : {
        type : GraphQLString
      },
      sectionDescription : {
        type : GraphQLString
      },
      RestaurantName : {
        type : GraphQLString
      },
      items : {
        type : new GraphQLList(itemType),
        resolve : async (section) => {
          const items = await itemModel.find()
          return items.filter(item => item.SectionName == section.sectionName)
        }
      }
    }
  }
});

var itemType = new GraphQLObjectType({
  name : 'item',
  fields : function() {
    return {
      _id : {
        type : GraphQLString
      },
      itemName : {
        type : GraphQLString
      },
      itemprice : {
        type : GraphQLString
      },
      SectionName : {
        type : GraphQLString
      },
      description : {
        type : GraphQLString
      },
      RestaurantName : {
        type : GraphQLString
      }
    }
  }
})

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
        },

        sections : {
          type : new GraphQLList(sectionType),
          resolve : function(root,params) {
            const sections = sectionModel.find({RestaurantName : "Vaishali"}).exec()
            if(!sections) {
              throw new Error('Error')
            }
            return sections
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
              },

              getProfile : {
                type : userType,
                args : {
                  Email : {
                    name : "Email",
                    type : GraphQLString
                  }
                },
                resolve : function(root,params) {
                  const profileDetails = userModel.findOne({Email : params.Email});
                  if(!profileDetails) {
                    throw new Error('Error')
                  }
                return profileDetails;
                }
              },

              getOwnerProfile : {
                type : userType,
                args : {
                  Email : {
                    name : "Email",
                    type : GraphQLString
                  }
                },
                resolve : function(root,params) {
                  const profileDetails = userModel.findOne({Email : params.Email});
                  if(!profileDetails) {
                    throw new Error('Error')
                  }
                return profileDetails;
                }
              },

              ownerProfileUpdate : {
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
                  },
                  RestaurantName : {
                    type : GraphQLString
                  },
                  Cuisine : {
                    type : GraphQLString
                  }
                },
                resolve : function(root, params) {
                  const response = userModel.findOneAndUpdate({Email : params.Email}, {$set: {FirstName : params.FirstName, LastName : params.LastName, Email : params.Email, RestaurantName : params.RestaurantName, Cuisine : params.Cuisine}},{new:true});
                  if(!response) {
                    throw new Error('Error');
                  }
                  return response;
                }
              }, 

              addSection : {
                type : sectionType,
                args : {
                  sectionName : {
                    type : GraphQLString
                  },
                  sectionDescription : {
                    type : GraphQLString
                  },
                  RestaurantName : {
                    type : GraphQLString
                  }
                },

                resolve : function(root,params) {
                  const section = new sectionModel(params);
                  const newSection = section.save();
                  if(!newSection) {
                        throw new Error('Error');
                  }
                  return newSection
                }
              },

              addItem : {
                type : itemType,
                args : {
                  itemName : {
                    type : GraphQLString
                  },
                  description : {
                    type : GraphQLString
                  },
                  SectionName : {
                    type : GraphQLString
                  },
                  itemprice : {
                    type : GraphQLString
                  },
                  RestaurantName : {
                    type : GraphQLString
                  }
                },
                resolve : function(root, params) {
                  const item = new itemModel(params);
                  const newItem = item.save();
                  return newItem;  
                }
              },

              getSections : {
                type : new GraphQLList(sectionType),
                args : {
                  RestaurantName : {
                    type : GraphQLString
                  }
                },
                resolve : function(root,params) {
                  const sections = sectionModel.find({RestaurantName : params.RestaurantName}).exec()
                  if(!sections) {
                    throw new Error('Error')
                  }
                  return sections
                } 
              }   

          }
  });

  module.exports = new GraphQLSchema({query: queryType, mutation : mutation});