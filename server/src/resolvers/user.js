const users = [
    {
        user_id: 1,
        account_id: 1,
        user_name: "Paola de los angeles loca",
        image: "https://n9.cl/mbtwp",
        gender: "Female",
        date_of_birth: '2000-11-30T12:00:00',
        allergies: "Gluten",
        contribution: [
            {
                activity_type: "Comentario",
                id_object: "1",
                activity_date: "2023-10-23T14:30:00"
            }
        ],
        notification: {
            products_out_of_stock: true,
            products_low_price: true,
            expired_products: true},
        food_preferences: [{
            name: "Vegano", 
            category: 'Necesario'
        }],
    },
    {
        user_id: 2,
        account_id: 1,
        user_name: "Carlos",
        image: "",
        gender: "Male",
        date_of_birth: "1995-08-15T09:30:00",
        allergies: "Lácteos",
        contribution: [],
        notification: {
            products_out_of_stock: true,
            products_low_price: false,
            expired_products: true
        },
        food_preferences: [
            {
            name: "Vegetariano",
            category: "No importa mucho"
            }
        ]
    },
    {
        user_id: 3,
        account_id: 1,
        user_name: "Maria",
        image: "https://n9.cl/mbtwp",
        gender: "Female",
        date_of_birth: '2000-11-30T12:00:00',
        allergies: "Gluten",
        contribution: [
            {
                activity_type: "Comentario",
                id_object: "1",
                activity_date: "2023-10-23T14:30:00"
            }
        ],
        notification: {
            products_out_of_stock: true,
            products_low_price: true,
            expired_products: true},
        food_preferences: [{
            name: "Vegano", 
            category: 'Necesario'
        }],
    },
]

const userRes = {
    Query: {
        users: () => users,
        users_from_account: (_, {account_id }) => {
            return users.filter(user => user.account_id === account_id);
        },
    },

    Mutation: {
        addUser: (_, {account_id, user_name, image, gender, date_of_birth, allergies, contribution, notification, food_preferences }) => {
      
            

            const newUser = {
              user_id: users.length + 1,
              account_id: account_id,
              user_name: user_name,
              image: image || "",
              gender: gender,
              date_of_birth: date_of_birth,
              allergies: allergies || "",
              contribution: contribution,
              notification: notification,
              food_preferences: food_preferences,
            };

            users.push(newUser);
            return newUser;
        },

        deleteUser: (_, { user_id }) => {
            const index = users.findIndex(user => user.user_id === user_id);
            if (index === -1) {
              return false;
            }
            users.splice(index, 1);
            return true; 
          },
        },

}

module.exports = userRes;