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
        payments: [Payments]
    }

    type Payments {
        payment_id: String
        payment_plan_id: String!
        date: Date
        payment_name: String!
        state: String
        qr_code: String!
    }

    type VerifyAccountResult {
        success: Boolean!
        message: String!
        id: Int
    }

    type Query {
        accounts: [Account]
        login(identifier: String!, password: String!): VerifyAccountResult
        accountById(id:Int!): Account
    }

    type Mutation {
        addAccount(account_name: String!, gmail: String!, password: String!, payments: [PaymentsInput]!, ) : Account
        deleteAccount(id: Int!): Boolean
        updateAccount(
            id: Int!, 
            account_name: String
            gmail: String
            password: String
        ): Boolean
    }

    input PaymentsInput {
        payment_plan_id: String!
        date: Date
        payment_name: String!
        qr_code: String!
    }
`;

module.exports = accountDef;