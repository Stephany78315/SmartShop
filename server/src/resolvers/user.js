const users = [
    {
        user_id: 1,
        account_id: 1,
        user_name: "Paola de los angeles loca",
        image: "https://n9.cl/mbtwp",
        gender: "Femenino",
        date_of_birth: '2000-11-30T12:00:00',
        city: 'Cochabamba',
        contribution: [
            {
                activity_type: "Comentario",
                id_object: "1",
                activity_date: "2023-10-23T14:30:00"
            }
        ],
        food_preferences: [
            {category: "Nutritional quality",
             characteristics: [{
                name: "Salt in low quantity",
                importance: "Not important",
             },{
                name: "Sugar in low quantity",
                importance: "Not important",
             }]
            },{category: "Ingredients",
            characteristics: [{
               name: "Vegan",
               importance: "Not important",
            },{
               name: "Vegetarian",
               importance: "Not important",
            }]
           },{category: "Allergens",
           characteristics: [{
              name: "Without Gluten",
              importance: "Not important",
           },{
              name: "Without Milk",
              importance: "Not important",
           }]
          }
        ],
    },
    {
        user_id: 2,
        account_id: 1,
        user_name: "Carlos",
        image: "https://n9.cl/w19kzk",
        gender: "Masculino",
        date_of_birth: "1995-08-15T09:30:00",
        city: 'La Paz',
        contribution: [],
        food_preferences: [
            {category: "Nutritional quality",
             characteristics: [{
                name: "Salt in low quantity",
                importance: "Not important",
             },{
                name: "Sugar in low quantity",
                importance: "Not important",
             }]
            },{category: "Ingredients",
            characteristics: [{
               name: "Vegan",
               importance: "Not important",
            },{
               name: "Vegetarian",
               importance: "Not important",
            }]
           },{category: "Allergens",
           characteristics: [{
              name: "Without Gluten",
              importance: "Not important",
           },{
              name: "Without Milk",
              importance: "Not important",
           }]
          }
        ],
    },
    {
        user_id: 3,
        account_id: 1,
        user_name: "Maria",
        image: "https://n9.cl/mbtwp",
        gender: "Femenino",
        date_of_birth: '2000-11-30T12:00:00',
        city: 'Beni',
        contribution: [
            {
                activity_type: "Comentario",
                id_object: "1",
                activity_date: "2023-10-23T14:30:00"
            }
        ],
        food_preferences: [
            {category: "Nutritional quality",
             characteristics: [{
                name: "Salt in low quantity",
                importance: "Not important",
             },{
                name: "Sugar in low quantity",
                importance: "Not important",
             }]
            },{category: "Ingredients",
            characteristics: [{
               name: "Vegan",
               importance: "Not important",
            },{
               name: "Vegetarian",
               importance: "Not important",
            }]
           },{category: "Allergens",
           characteristics: [{
              name: "Without Gluten",
              importance: "Not important",
           },{
              name: "Without Milk",
              importance: "Not important",
           }]
          }
        ],
    },
]

const userRes = {
    Query: {
        users: () => users,
        users_from_account: (_, {account_id }) => {
            return users.filter(user => user.account_id === account_id);
        },
        userById: (_, {user_id}) => {
            const user = users.find(user => user.user_id === user_id);
            return user || null;
        },
    },

    Mutation: {
        addUser: (_, {account_id, user_name, image, gender, date_of_birth, city}) => {         

            const newUser = {
              user_id: users.length + 1,
              account_id: account_id,
              user_name: user_name,
              image: image,
              gender: gender,
              date_of_birth: date_of_birth,
              city, city,
              contribution: [],
              food_preferences: [
                    {category: "Nutritional quality",
                     characteristics: [{
                        name: "Salt in low quantity",
                        importance: "Not important",
                     },{
                        name: "Sugar in low quantity",
                        importance: "Not important",
                     }]
                    },{category: "Ingredients",
                    characteristics: [{
                       name: "Vegan",
                       importance: "Not important",
                    },{
                       name: "Vegetarian",
                       importance: "Not important",
                    }]
                   },{category: "Allergens",
                   characteristics: [{
                      name: "Without Gluten",
                      importance: "Not important",
                   },{
                      name: "Without Milk",
                      importance: "Not important",
                   }]
                  }
                ]
            };

            users.push(newUser);
            return newUser;
        },

        updateUser: (_, {user_id, user_name, image, gender, date_of_birth, city}) => {
            const userIndex = users.findIndex(user => user.user_id === user_id);

            if (userIndex === -1) {
            return false; // El usuario no fue encontrado, devuelve false
            }

            // Actualiza el usuario si se proporcionan nuevos valores
            if (user_name) {
            users[userIndex].user_name = user_name;
            }
            if (image) {
            users[userIndex].image = image;
            }
            if (gender) {
            users[userIndex].gender = gender;
            }
            if (date_of_birth) {
            users[userIndex].date_of_birth = date_of_birth;
            }
            if (city) {
            users[userIndex].city = city;
            }

            return true;
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