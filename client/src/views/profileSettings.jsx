import { ScrollView, View, StatusBar, Image, Text, TouchableOpacity, LogBox} from "react-native";
import HeaderBack from "../components/headerBack";
import { colors, fonts, borderRadius, buttons } from "../css/styles";
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { format, parse } from 'date-fns';
import { es } from "date-fns/locale";
import {Picker} from '@react-native-picker/picker';
import RadioButton from "../components/radioButton";
import CameraModal from '../components/camara';
import { gql, useMutation} from '@apollo/client';
import Input from "../components/input";

const ADDUSER = gql`
  mutation AddUser($accountId: Int!, $userName: String!, $image: String!, $gender: String!, $dateOfBirth: Date!, $city: String!) {
    addUser(account_id: $accountId, user_name: $userName, image: $image, gender: $gender, date_of_birth: $dateOfBirth, city: $city) {
      user_name
      user_id
    }
  }
`;
const ADDACCOUNT = gql`
  mutation AddAccount($accountName: String!, $gmail: String!, $password: String!, $payments: [PaymentsInput]!) {
    addAccount(account_name: $accountName, gmail: $gmail, password: $password, payments: $payments) {
      account_name
      id
    }
  }
`;

const UPDATEACCOUNT = gql`
    mutation UpdateAccount($Id: Int!, $accountName: String, $Gmail: String, $Password: String) {
      updateAccount(id: $AccountId, account_name: $accountName, gmail: $Gmail, password: $Password)
    }

`;

const UPDATEUSER = gql`
mutation UpdateUser($UserId: Int!, $Name: String, $Gender: String, $DateOfBirth: Date, $City: String) {
  updateUser(user_id: $UserId, user_name: $Name, gender: $Gender, date_of_birth: $DateOfBirth, city: $City)
}
`;


const cities = ['Cochabamba','La Paz','Santa Cruz','Beni','Pando','Oruro','Tarija','Sucre','Chiquisaca'];
const genderOptions = [
  { label: 'Masculino', value: 'Masculino', color: colors.platine400 },
  { label: 'Femenino', value: 'Femenino', color: colors.platine400 },
];

const ProfileSettings = ({route, navigation}) => {
const { userData, accountData} = route.params;
console.log("estas en profile Settings ");
console.log('userData', userData);
console.log('accountData', accountData);

const [photo, setPhoto ] = useState('');
const [name, setName] = useState('');
const [account, setAccount] = useState('');
const [gmail, setGmail] = useState('');
const [password, setPassword] = useState('');
const [gender, setGender] = useState('Male');
const [date, setDate] = useState(new Date(2000, 0, 1));
const [showDate, setShowDate] = useState(false);
const [city, setCity] = useState('Cochabamba');
const [typeAccount, setTypeAccount] = useState('Gratis');
const [isCameraOpen, setCameraOpen] = useState(false);

const [addUser] = useMutation(ADDUSER);
const [addAccount] = useMutation(ADDACCOUNT);
const [updateUser] = useMutation(UPDATEUSER);
const [updateAccount] = useMutation(UPDATEACCOUNT);

useEffect(() => {
  console.log('entra al Effect');
if((accountData.accountById==null || accountData==undefined) && (userData.userById==null || userData==undefined)){
  console.log('entra al if de cuenta nueva')
  setPhoto(''); setName(''); setAccount(''); setGmail(''); setPassword(''); setGender('Masculino');  setDate(new Date(2000,0,1)); setShowDate(false); setCity('Cochabamba'); setTypeAccount('Gratis');
} else if ((accountData.accountById!=null && accountData!=undefined) && (userData.userById==null || userData==undefined)) {
  console.log('entr al if de nuevo usuario')
  setPhoto(''); 
  setName(''); 
  setAccount(accountData.accountById.account_name); 
  setGmail(accountData.accountById.gmail); 
  setPassword(accountData.accountById.password); 
  setGender('Masculino');  
  setDate(new Date(2000,0,1)); 
  setShowDate(false); 
  setCity('Cochabamba'); 
  setTypeAccount('Gratis');
} else if ((accountData.accountById!=null && accountData!=undefined) && (userData.userById!==null || userData!==undefined)) {
  console.log('entra al if de cuenta y usuario existente')
  setPhoto(userData.userById.image); 
  setName(userData.userById.user_name); 
  setAccount(accountData.accountById.account_name); 
  setGmail(accountData.accountById.gmail); 
  setPassword(accountData.accountById.password); 
  setGender(userData.userById.gender);  
  setDate(new Date(userData.userById.date_of_birth)); 
  setShowDate(false); 
  setCity(userData.userById.city); 
  const ultimoPago = accountData.accountById.payments[accountData.accountById.payments.length - 1];
  const paymentName = ultimoPago.payment_name;
  console.log(paymentName);
  setTypeAccount(paymentName);
}
},[])

const onChange = (e, selectedDate) => {
  if(Date !== selectedDate){
    setDate(selectedDate);
    setShowDate(false);
  }
};

const openCamera = () => {
  setCameraOpen(true);
};

const closeCamera = () => {
  setCameraOpen(false);
};

const receiveName = (value) => {
  setName(value)
}

const receiveAccount = (value) => {
  setAccount(value)
}

const receiveGmail = (value) => {
  setGmail(value)
}
const receivePassword = (value) => {
  setPassword(value)
}

const receiveGender = (value) => {
  setGender(value)
}

const onPictureTaken = (imageUri) => {
  console.log("recibo de imagen: ",imageUri)
  setPhoto(imageUri);
  closeCamera();
};
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);

const saveDataUser = async () => {
  console.log("Guardar información del usuario");

  if ((accountData.accountById == null || accountData == undefined) && (userData.userById == null || userData == undefined)) {
    console.log('Entrar al caso de nueva cuenta y nuevo usuario');
    const newPayment = {
      payment_plan_id: "123j",
      payment_name: "Gratis",
      qr_code: ""
    }
    const { data: dataAccount } = await addAccount({
      variables: { accountName: account, gmail: gmail, password: password, payments: [newPayment] },
    });

    const accountId = dataAccount.addAccount.id;

    await addUser({
      variables: {
        accountId:accountId,
        userName: name,
        image: photo || "https://n9.cl/w19kzk",
        gender: gender,
        dateOfBirth: date,
        city: city,
      },
    });
  } else if (accountData.accountById != null && accountData != undefined && (userData.userById == null || userData == undefined)) {
    console.log('Entrar al caso de nuevo usuario con cuenta existente');
    await addUser({
      variables: {
        accountId: accountData.accountById.id,
        userName: name,
        image: photo || "https://n9.cl/w19kzk",
        gender,
        dateOfBirth: date,
        city,
      },
    });
  } else if (accountData.accountById != null && accountData != undefined && userData.userById !== null && userData !== undefined) {
    console.log('Entrar al caso de cuenta y usuario existente');
    await updateUser({
      variables: {
        UserId: userData.userById.user_id,
        Name: name,
        Gender: gender,
        dateOfBirth: date,
        City:city,
      }});
      
    await updateAccount({
      variables: {
        Id: accountData.accountById.id,
        accountName: account,
        Gmail: gmail,
        Password: password,
      }});
  }

  console.log('Datos guardados con éxito');
};

return (
 <ScrollView contentContainerStyle={styles.scrollView}>
   <View style={styles.container}>
   <StatusBar hidden/>
   <HeaderBack title={"Ajustes de Perfil"} navigation={navigation}/>

   
      {/* Imagen del perfil */}
      <View style={styles.imageContainer}>
      {photo?
        <Image source={{uri: photo}} style={styles.editImage} />
        :
        <Image source={require('../images/profileDefault.png')} style={styles.editImage} />
        }
        
        <TouchableOpacity 
          style={styles.containerCamera}
          onPress={openCamera}
        >
        <Image source={require('../images/icons/pencilIcon.png')} style={styles.iconCamera} />
        {isCameraOpen && (
        <CameraModal isVisible={isCameraOpen} onClose={closeCamera} onPictureTaken={onPictureTaken} />
        )}
        </TouchableOpacity>
      </View>

      <View style={styles.containerData}>
        
        {/*Nombre del usuario*/}
        <Input title='Nombre de usuario' width='94%' textIn={name} onValue={receiveName}/>
            
        {/*Genero*/}
        <RadioButton title="Selecciona tu género" options={genderOptions} selected={gender} onValueChange={receiveGender} />
       
        {/*Nombre del a cuenta*/}
        <Input title='Nombre de la cuenta' width='94%' textIn={account} onValue={receiveAccount}/>

        {/*Gmail de la cuenta*/}
        <Input title='Gmail de la cuenta' width='94%' textIn={gmail} keyboardType="email-address" onValue={receiveGmail}/>

        {/*Contrseña*/}
        <Input title='Contraseña' secureTextEntry={true} width='94%' textIn={password} onValue={receivePassword}/>

      {/*Fecha de nacimiento*/}
       <Text style={[styles.label,fonts.textButtonRegular, {color: 'black'}]}>Fecha de nacimiento</Text>

       <View style={styles.date} >
        {showDate  && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display="spinner"
            onChange={onChange}
            locale="es-ES" 
            textColor= {colors.platine400} 
          />
        )}
       <Text style={[styles.smallInputs, fonts.subHeaderRegular]}>{format(date, "dd MMMM yyyy", { locale: es })}</Text>
       <TouchableOpacity 
          style={[buttons.thick, styles.button]}
          onPress={() => setShowDate(true)}
        >
        <Text style={[fonts.button, {color: 'white'}]}>Cambiar</Text>
        </TouchableOpacity>
       </View>
       
       {/*Ubicacion*/}
       
       <Text style={[styles.label,fonts.textButtonRegular, {color: 'black'}]}>Ciudad</Text>
       <View style={{height: 32,width: '94%',backgroundColor: 'white',marginLeft: '3%',borderRadius: borderRadius.L,marginRight: '3%',justifyContent: 'center',}}>
        <Picker
          selectedValue={city}
          onValueChange={(itemValue) => setCity(itemValue)}
          style={fonts.subHeaderRegular}
        >
          {cities.map((city, index) => (
            <Picker.Item key={index} label={city} value={city} />
          ))}
        </Picker>
       </View>

       {/*Tipo de cuenta*/}
       <Text style={[styles.label,fonts.textButtonRegular, {color: 'black'}]}>Tipo de cuenta</Text>
       <View style={styles.date} >
        <Text style={[styles.smallInputs, fonts.subHeaderRegular]}>{typeAccount}</Text>
        <TouchableOpacity 
            style={[buttons.thick, styles.button]}
            onPress={() => console.log('Presiona cambiar tipo de cuenta')}
          >
          <Text style={[fonts.button, {color: 'white'}]}>Cambiar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View>
      <TouchableOpacity 
          style={[buttons.thick, styles.deleteAccountButton,{backgroundColor: colors.platine400, marginTop: '5%', marginBottom: '4%'}]}
          onPress={saveDataUser}
        >
        <Text style={[fonts.button, {color: 'white'}]}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[buttons.thick, styles.deleteAccountButton,{marginBottom: '5%'}]}
          onPress={() => {console.log('presionase')}}
        >
        <Text style={[fonts.button, {color: 'white'}]}>Eliminar cuenta</Text>
        </TouchableOpacity>
      </View>
   </View>
 </ScrollView>
)}

const styles = {
 scrollView:{
  flexGrow: 1,
 },
 container:{
  backgroundColor: 'white',
 },
 containerData: {
  backgroundColor: colors.platine050,
  width: '80%',
  alignSelf: 'center',
  marginTop: '3%',
  borderRadius: borderRadius.L,
  flexGrow: 1,
  paddingBottom: '4%',
 },
 textContainer:{
  alignItems: 'center',
  textAlign: 'center',
 },
 imageContainer: {
  width: 150,
  height: 150,
  marginTop: '5%',
  backgroundColor: colors.platine100, 
  alignSelf: 'center', 
  borderRadius: borderRadius.L,
 },
 image: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover', 
 },
 editImage: {
  width: '100%',
  height: '100%',
 },
 label: {
   margin: '3%',
 },
 date: {
   alignItems: "center",
   justifyContent: "center",
   flexDirection: 'row',
   width: '94%',
 },
smallInputs: {
    flex:1,
    height: 32,
    width: '65%',
    backgroundColor: 'white',
    marginLeft: '3%',
    borderRadius: borderRadius.L,
    marginRight: '3%',
    justifyContent: 'center',
    paddingTop: '2%',
    paddingLeft: '3%',
  },
  button: {
    marginTop: '0%',
    width: '30%',
    height: 32,
    alignSelf: 'center',
  },
  deleteAccountButton:{
    width: '40%',
    height: 40,
    alignSelf: 'center',
  }, 
  containerCamera: {
    position: 'absolute',
    left: '82%',
    alignSelf: 'flex-end',
    top: '80%',
  },
  iconCamera: {
    width: 40,
    height: 40,
  }
};

export default ProfileSettings