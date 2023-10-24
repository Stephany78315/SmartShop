const {ApolloServer, gql }= require('apollo-server');
const typeDefs = require('./schemas/account.js');
const resolvers = require('./resolvers/account');

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then( ({ url }) => {
    console.log(`Server ready at ${url}`);

})
