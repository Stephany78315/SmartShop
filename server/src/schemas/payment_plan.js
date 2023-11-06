const { gql } = require('apollo-server');

const paymentPlanDef = gql`

    type PaymentPlan {
        payment_plan_id: String
        payment_name: String
        price: Int
        currency: String
        description: String
        duration: Int
        type_duration: String
        contribution_pass: Contribution_pass
    }

    type Contribution_pass {
        recipes_edit: Int!
        recipes_add: Int!
        products_edit: Int!
        products_add: Int!
    }

    type Query {
        paymentPlans: [PaymentPlan]
    }

    type Mutation {
        addPaymentPlan(
            payment_name: String!
            price: Int!
            currency: String!
            description: String!
            duration: Int!
            type_duration: String!
            contribution_pass: Contribution_passInput
        ): PaymentPlan

        deletePaymentPlan(payment_plan_id: String!): Boolean
    }

    input Contribution_passInput {
        recipes_edit: Int!
        recipes_add: Int!
        products_edit: Int!
        products_add: Int!
    }

`;

module.exports = paymentPlanDef;