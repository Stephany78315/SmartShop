function generateUniqueId() {
  const timestamp = Date.now().toString(16); // Timestamp en hexadecimal
  const randomStr = Math.random().toString(16).substring(2); // Números aleatorios en hexadecimal
  return timestamp + randomStr;
}
//generateUniqueId()

const accounts = [
    {
   id: 1,
   account_name: 'Fam',
   gmail: 'mariagalindo@gmail.com',
   password: '123',
   creation_date: '2023-12-31T12:00:00',
   state: 'Activa',
   payments: [
    {
      payment_id: "12",
      payment_plan_id: "1",
      date:"12-Mayo-2023",
      payment_name: "free",
      state: "active",
      qr_code: ""
    }
   ],
 },
 {
   id: 2,
   account_name: 'Familia Perez',
   gmail: 'fernando@gmail.com',
   password: 'Pass123',
   creation_date: '2023-11-30T12:00:00', // Corregida la fecha
   state: 'Activa',
   payments: [
    {
      payment_id: "15",
      payment_plan_id: "1",
      date:"12-Mayo-2023",
      payment_name: "free",
      state: "active",
      qr_code: ""
    }
   ],
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
       },
       accountById: (_, {id}) => {
        const account = accounts.find(account => account.id === id);
        return account || null;
       },
   },
   Mutation: {
        addAccount: (_, {account_name, gmail, password, payments}) => {
            const newAccount = {
                id: accounts.length + 1,
                account_name: account_name,
                gmail: gmail,
                password: password,
                creation_date: new Date(),
                state: "Activo",
                payments: []
            }
            for (const payment of payments) {
              const newPayment = {
                payment_id: generateUniqueId(),
                payment_plan_id: payment.payment_plan_id,
                date: new Date(),
                payment_name: payment.payment_name,
                state: 'activo',
                qr_code: payment.qr_code,
              };
          
              newAccount.payments.push(newPayment);
            }

            accounts.push(newAccount)
            return newAccount;
        },
        deleteAccount: (_, {id}) => {
            const index = accounts.findIndex(account => account.id === id);
            if(index === -1) {return false}
            accounts.splice(index, 1);
            return true;
        },
        updateAccount: (_, { id, account_name, gmail, password, creation_date, state}) => {
          const accountIndex = accounts.findIndex(account => account.id === id);
      
          if (accountIndex === -1) {
            return false; // La cuenta no fue encontrada, devuelve false
          }
      
          // Actualiza la cuenta si se proporcionan nuevos valores
          if (account_name) {
            accounts[accountIndex].account_name = account_name;
          }
          if (gmail) {
            accounts[accountIndex].gmail = gmail;
          }
          if (password) {
            accounts[accountIndex].password = password;
          }        
      
          return true; // Actualización exitosa, devuelve true
        },
   }
}

module.exports = accountRes;