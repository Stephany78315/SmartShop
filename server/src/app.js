const {ApolloServer, gql }= require('apollo-server');
const accountTypeDefs = require('./schemas/account.js');
const userTypeDefs = require('../src/schemas/user.js');
const accountResolvers = require('./resolvers/account');
const userResolvers = require('./resolvers/user.js')

const combinedTypeDef = [accountTypeDefs, userTypeDefs];
const combinedResolvers = [accountResolvers, userResolvers];

const server = new ApolloServer({
    typeDefs: combinedTypeDef,
    resolvers: combinedResolvers
})

server.listen().then( ({ url }) => {
    console.log(`Server ready at ${url}`);

})
