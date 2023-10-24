const { gql } = require('apollo-server') 

const accountDef = gql`
    scalar Date

    type Account {
        id: Int!
        account_name: String!
        gmail: String
        password: String!
        creation_date: Date!
        state: String 
    }

    type Query {
        accounts: [Account]
        login(identifier: String!, password: String!): VerifyAccountResult
    }

    type VerifyAccountResult {
        success: Boolean!
        message: String
    }

    type Mutation {
        addAccount(account_name: String!, gmail: String!, password: String!) : Account
        deleteAccount(id: Int!): Boolean
    }
`;

module.exports = accountDef;