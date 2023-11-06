function generateUniqueId() {
 const timestamp = Date.now().toString(16); // Timestamp en hexadecimal
 const randomStr = Math.random().toString(16).substring(2); // Números aleatorios en hexadecimal
 return timestamp + randomStr;
}

const payments = [
 {
  payment_plans_id: "1234543",
  payment_name: "free",
  price: 0,
  currency: "Bs",
  description: "Incluye.....",
  duration: 1,
  type_duration: "Mes",
  contribution_pass: null
},
{
  payment_plans_id: "12349443",
  payment_name: "premium",
  price: 40,
  currency: "Bs",
  description: "Incluye cantidad de personas en una cuenta, cantidad de listas en una cuenta",
  duration: 1,
  type_duration: "Mes",
  contribution_pass: {
      "recetas_edits": 10,
      "products_edits": 10,
      "products_adds": 25
  }
}
]

const paymentPlansRes = {
 Query:{
   paymentPlans: () => payments,
 },

 Mutation: {
  addPaymentPlan: (_, { payment_name, price, currency, description, duration, type_duration, contribution_pass }) => {
   const newPaymentPlan = {
     payment_plan_id: paymentPlans.length + 1, // Reemplaza con la lógica adecuada para generar un ID único
     payment_name: payment_name,
     price: price,
     currency: currency,
     description: description,
     duration: duration,
     type_duration: type_duration,
     contribution_pass:  {
      recipes_edit: contribution_pass.recipes_edit,
      recipes_add: contribution_pass.recipes_add,
      products_edit: contribution_pass.products_edit,
      products_add: contribution_pass.products_add,
    },
   };


   payments.push(newPaymentPlan);
   return newPaymentPlan;
 },

 deletePaymentPlan: (_, { payment_plan_id }) => {
   const index = paymentPlans.findIndex(plan => plan.payment_plan_id === payment_plan_id);
   if (index === -1) {
     return false; 
   }
   paymentPlans.splice(index, 1);
   return true; 
 },

 }
}

module.exports = paymentPlansRes;