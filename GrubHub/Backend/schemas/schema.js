const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = graphql;

const UserModel = require('../api/models/userinfoModel');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        FirstName: { type: GraphQLString },
        LastName: { type: GraphQLString },
        Email: { type: GraphQLString },
        Password : { type : GraphQLString},
        RestauratName : {type : GraphQLString},
        Cuisine : {type : GraphQLString}
    })
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBuyer: {
            type: UserType,
            args: {
                FirstName: { type: GraphQLString },
                LastName: { type: GraphQLString },
                Email: { type: GraphQLString },
                Password : { type : GraphQLString }
            },
            resolve(parent, args){
                let user = {
                    FirstName : args.FirstName,
                    LastName : args.LastName,
                    Email : args.Email,
                    Password : args.Password
                }

                let buyer = new UserModel(user);
                let newBuyer = buyer.save();
                return newBuyer
            }
        }
    
    }
});

module.exports = new GraphQLSchema({
    mutation: Mutation
});