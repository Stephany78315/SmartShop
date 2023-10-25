
const accounts = [
    {
   id: 1,
   account_name: 'Fam',
   gmail: 'mariagalindo@gmail.com',
   password: '123',
   creation_date: '2023-12-31T12:00:00',
   state: 'Activa'
 },
 {
   id: 2,
   account_name: 'Familia Perez',
   gmail: 'fernando@gmail.com',
   password: 'Pass123',
   creation_date: '2023-11-30T12:00:00', // Corregida la fecha
   state: 'Activa'
 }
]

const accountRes = {
   Query: {
       accounts: () => accounts,

       login: (_, {identifier, password}) => {
        const account = accounts.find(
            (acc) => (acc.account_name === identifier || acc.gmail === identifier) && acc.password === password
          );
    
          if (account) {
            return {
              success: true,
              message: 'Inicio de sesión exitoso',
              id: account.id
            };
          } else {
            return {
              success: false,
              message: 'Nombre de cuenta, gmail o contraseña incorrecto',
            };
          }
       }
   },
   Mutation: {
        addAccount: (_, {account_name, gmail, password}) => {
            const newAccount = {
                id: accounts.length + 1,
                account_name: account_name,
                gmail: gmail,
                password: password,
                creation_date: new Date().toISOString(),
                state: "Activo"
            }
            accounts.push(newAccount)
            return newAccount;
        },
        deleteAccount: (_, {id}) => {
            const index = accounts.findIndex(account => account.id === id);
            if(index === -1) {return false}
            accounts.splice(index, 1);
            return true;
        }
   }
}

module.exports = accountRes;