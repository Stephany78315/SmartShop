import React , {useState} from 'react';
import {SafeAreaView, Text, View, StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import { fonts, buttons , colors, inputs, borderRadius} from '../css/styles.js';
import { gql , useLazyQuery} from '@apollo/client';

const GET_ACCOUNTS = gql`
    query GetAccounts{
        accounts {
          id
          account_name
          gmail
          password
          creation_date
          state
        }
      }
`;

const VERIFY_ACCOUNT = gql`
    query Login($identifier: String!, $password: String!) {
        login(identifier: $identifier, password: $password) {
            success
            message
            id
        }
    }
`;

const Login = ({navigation}) => {
  console.log('Estoy en login');

  const [name, setName] = useState('Fam');
  const [password, setPassword] = useState('123');
  const [loginSuccess, setLoginSuccess] = useState(true);

  const [verifyAccount, { loading, data }] = useLazyQuery(VERIFY_ACCOUNT, {
    onCompleted: (result) => {
      if (result.login.success) {
        console.log('Inicio de sesión exitoso');
        console.log(data.login.id)
        navigation.navigate('Select Profile',{id: data.login.id});
      } else {
        console.log('Inicio de sesión fallido');
      }
      setLoginSuccess(result.login.success);
    },
  });
    
  const handleNameChange = (text) => {
    setName(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSignupButtonClick = () => {
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
        source={require('../images/logoSmartShop.png')}
        style={styles.logoImage}
        />
        <Text style={[fonts.textRegular, styles.slogan]}>Comer sano es comer bien</Text>
      </View>

      <View style={styles.containerForm}>

        <Text style={[styles.label,fonts.textButtonRegular, {color: 'black'}]}>Nombre de cuenta o gmail:</Text>
        <TextInput
          style={[inputs.largeTextSpace,  { paddingLeft: 10 }]}
          value={name}
          onChangeText={handleNameChange}
        />

        <Text style={[styles.label,fonts.textButtonRegular, {color: 'black'}]}>Contraseña:</Text>
        <TextInput
          style={[inputs.largeTextSpace,  { paddingLeft: 10 }]}
          secureTextEntry={true}
          value={password}
          onChangeText={handlePasswordChange}
        />
      </View>

      {data && data.login && !data.login.success && (
              <Text style={[fonts.textRegular,{color: colors.ruby200},{alignSelf:'center'},{marginTop:'1%'}]}> {data.login.message}</Text>
      )}

      <View>
        <TouchableOpacity 
          style={[buttons.thick, styles.button ,{backgroundColor: colors.platine400}]}
          onPress={() => {
              verifyAccount({ variables: { identifier: name, password } });
            }}
        >
        <Text style={[fonts.button, {color: 'white'}]}>Inicio de sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[buttons.thick, styles.button]}
          onPress={handleSignupButtonClick}
        >
        <Text style={[fonts.button, {color: 'white'}]}>Registrarse</Text>
        </TouchableOpacity>
      </View>
  </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    marginTop: '10%',
    width: '34%',
    height:'30%',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  logoImage: {
    resizeMode: "cover",
    width:'100%',
    height: '100%',
  },
  slogan: {
      color: 'black',
      textAlign: 'center',
      margin: '5%',
  },
  containerForm:{
    backgroundColor: colors.platine050,
    alignSelf: 'center',
    width: '80%',
    height: '27%',
    marginTop: '4%',
    borderRadius: borderRadius.L,
    minHeight: 160,
  },
  label: {
    margin: '3%',
  },
  button: {
      marginTop: '5%',
      alignSelf: 'center',
  },
})


export default Login