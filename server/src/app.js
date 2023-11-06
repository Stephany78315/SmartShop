const {ApolloServer, gql }= require('apollo-server');
const accountTypeDefs = require('./schemas/account.js');
const userTypeDefs = require('../src/schemas/user.js');
const accountResolvers = require('./resolvers/account');
const userResolvers = require('./resolvers/user.js')
const paymentPlanDef = require('../src/schemas/payment_plan.js')
const paymentPlansRes = require('../src/resolvers/payment_plan.js')

const combinedTypeDef = [accountTypeDefs, userTypeDefs, paymentPlanDef];
const combinedResolvers = [accountResolvers, userResolvers, paymentPlansRes];

const server = new ApolloServer({
    typeDefs: combinedTypeDef,
    resolvers: combinedResolvers
})

server.listen().then( ({ url }) => {
    console.log(`Server ready at ${url}`);

})
