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
    city: String
    contribution: [Contribution]
    food_preferences: [FoodPreference]
  }

  type Contribution {
    activity_type: String
    id_object: String
    activity_date: Date
  }

  type FoodPreference {
    category: String
    characteristics: [FoodCharacteristic]
  }

  type FoodCharacteristic {
    name: String
    importance: String
  }

  type Query {
    users: [User]
    users_from_account(account_id:Int!): [User]
    userById(user_id:Int!): User
  }

  type Mutation {
    addUser(
      account_id: Int!
      user_name: String!
      image: String!
      gender: String!
      date_of_birth: Date!
      city: String!
    ): User
    
    updateUser(
      user_id: Int!
      user_name: String
      image: String
      gender: String
      date_of_birth: Date
      city: String
      ): Boolean

    deleteUser(user_id: Int!): Boolean
  }



`;

module.exports = userDef;
