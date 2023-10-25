const { gql } = require('apollo-server');

const userDef = gql`
  scalar Date

  type User {
    user_id: Int!
    account_id: Int!
    user_name: String!
    image: String
    gender: String
    date_of_birth: Date
    allergies: String
    contribution: [Contribution]
    notification: Notification
    food_preferences: [FoodPreference]
  }

  type Contribution {
    activity_type: String
    id_object: String
    activity_date: Date
  }

  type Notification {
    products_out_of_stock: Boolean
    products_low_price: Boolean
    expired_products: Boolean
  }

  type FoodPreference {
    name: String
    category: String
  }

  type Query {
    users: [User]
    users_from_account(account_id:Int!): [User]
  }

  type Mutation {
    addUser(
      account_id: Int!
      user_name: String!
      image: String
      gender: String!
      date_of_birth: Date!
      allergies: String
      contribution: [ContributionInput]
      notification: NotificationInput!
      food_preferences: [FoodPreferenceInput]!
    ): User
    
    deleteUser(user_id: Int!): Boolean
  }

  input ContributionInput {
    activity_type: String
    id_object: String
    activity_date: Date
  }

  input NotificationInput {
    products_out_of_stock: Boolean
    products_low_price: Boolean
    expired_products: Boolean
  }

  input FoodPreferenceInput {
    name: String
    category: String
  }
`;

module.exports = userDef;
