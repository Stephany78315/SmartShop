import {Text, StatusBar, View, Image, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import { colors , borderRadius, fonts, dropShadowS} from '../css/styles';
import { gql, useQuery} from '@apollo/client';
import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';
import HeaderMenu from '../components/headerMenu.jsx'


const USERBYID = gql`
  query UserById($userId: Int!) {
    userById(user_id: $userId) {
      user_id
      account_id
      user_name
      image
      gender
      date_of_birth
      city
      contribution {
        activity_type
        id_object
        activity_date
      }
      food_preferences {
        category
        characteristics {
          name
          importance
        }
      }
    }
  }
`;

const ACCOUNTBYID = gql`
 query AccountById($accountId: Int!) {
    accountById(id: $accountId) {
      id
      account_name
      gmail
      password
      creation_date
      state
      payments {
        payment_id
        payment_plan_id
        date
        payment_name
        state
        qr_code
      }
    }
  }
`;

const ProfileAdmin = ({route, navigation}) => {
  const { id_u, id_c } = route.params;

  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);

  const { loading: loadingUser, data: userData } = useQuery(USERBYID, { variables: { userId: id_u } });
  const { loading: loadingAccount, data: accountData } = useQuery(ACCOUNTBYID, { variables: { accountId: id_c } });

  useEffect(() => {
    if (!loadingUser && !loadingAccount) {
      setUser(userData.userById);
      setAccount(accountData.accountById);
    } 
  }, [loadingUser, loadingAccount, userData, accountData]);

  if (loadingUser && loadingAccount) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Cargando datos...</Text>
      </View>
    );
  }


  LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
  ]);

  const goSettings = () => {
    navigation.navigate('Main', {screen: "Ajustes de Perfil",params: {userData: userData, accountData: accountData, navigation}});
  }

  const goContributorProfile = () => {
    navigation.navigate('Main',{screen:"Perfil de Contribuidor",params:{userData: userData, accountData: accountData, navigation}});
  }

  const goFoodPreferences = () => {
    navigation.navigate('Main',{screen:"Preferencias Alimenticias",params:{userData: userData, accountData: accountData, navigation}});
  }

  const goAplicationSettings = () => {
    navigation.navigate('Main', {screen:"Ajustes de la Aplicación",params:{userData: userData, accountData: accountData, navigation}});
  }


 return (
  <ScrollView contentContainerStyle={styles.scrollView}>
  <View style={styles.container}>
   
    <StatusBar hidden/>
    <View>
     <HeaderMenu navigation={navigation}/>
    </View>
    {(userData !== undefined && userData.userById !== null) && (accountData !== undefined && accountData.accountById !== null) ? (
      <View>
        <View style={styles.imageContainer}>
          {userData.userById.image?
            <Image source={{uri: userData.userById.image}} style={styles.editImage} />
            :
            <Image source={require('../images/profileDefault.png')} style={styles.editImage} />
          }
          </View>
          <View style={styles.textContainer}>
            <Text style={[fonts.title]}>{userData.userById.user_name}</Text>
            <Text style={[fonts.subHeaderRegular]}>{accountData.accountById.account_name}</Text>
          </View>
      </View>)
    : (accountData !== undefined && accountData.accountById !== null)  && (userData == undefined || userData.userById == null)? (
      <View>
        <View style={styles.imageContainer}>
          <Image source={require('../images/profileDefault.png')} style={styles.editImage} />
        </View>
        <View style={styles.textContainer}>
            <Text style={[fonts.title]}>{""}</Text>
            <Text style={[fonts.subHeaderRegular]}>{accountData.accountById.account_name}</Text>
        </View>
      </View>
      )
    : (accountData == undefined ||  accountData.accountById == null)  && (userData == undefined || userData.userById == null)?  (
      <View>
        <View style={styles.imageContainer}>
          <Image source={require('../images/profileDefault.png')} style={styles.editImage} />
        </View>
        <View style={styles.textContainer}>
        <Text style={[fonts.title]}>{''}</Text>
        <Text style={[fonts.subHeaderRegular]}>{''}</Text>
        </View>
      </View>)
    : <View></View>}
    
    <View style={[styles.containerForm, dropShadowS]}>
      <View style={styles.itemForm}>
        <Image source={require('../images/icons/plusIcon.png')} style={styles.imageForm} />
        <View style={[styles.buttonForm, dropShadowS]}>
        <TouchableOpacity onPress={goSettings} >
          <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{"Ajuste de perfil"}</Text>
        </TouchableOpacity>
        </View>
       </View>

       <View style={styles.itemForm}>
        <Image source={require('../images/icons/profileCircleIcon.png')} style={styles.imageForm} />
        <View style={[styles.buttonForm, dropShadowS]}>
        <TouchableOpacity onPress={goContributorProfile} >
          <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{"Cuenta de contribuidor"}</Text>
        </TouchableOpacity>
        </View>
       </View>

       <View style={styles.itemForm}>
        <Image source={require('../images/icons/cartShopCircleIcon.png')} style={styles.imageForm} />
        <View style={[styles.buttonForm, dropShadowS]}>
        <TouchableOpacity onPress={goFoodPreferences} >
          <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{"Preferencias Alimentarias"}</Text>
        </TouchableOpacity>
        </View>
       </View>

       <View style={styles.itemForm}>
        <Image source={require('../images/icons/settingCircleIcon.png')} style={styles.imageForm} />
        <View style={[styles.buttonForm, dropShadowS]}>
        <TouchableOpacity onPress={goAplicationSettings} >
          <Text style={[fonts.textButtonRegular, {textAlign: 'center'}]}>{"Ajustes de la aplicación"}</Text>
        </TouchableOpacity>
        </View>
       </View>
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
 imageContainer: {
   width: 150,
   height: 150,
   marginTop: '10%',
   backgroundColor: colors.platine100, 
   justifyContent: 'center', 
   alignSelf: 'center', 
   borderRadius: borderRadius.L,
 },
 image: {
   width: '100%',
   height: '100%',
   resizeMode: 'cover', // Ajustar la imagen al contenedor
 },
 textContainer:{
   alignItems: 'center',
   textAlign: 'center',
 },
 editImageTouch:{
  position: 'absolute',
  bottom: 0,
  right: 0,
 },
 editImage: {
  width: '100%',
  height: '100%',
 },
 containerForm: {
  backgroundColor: colors.platine025,
  margin: '5%',
  borderRadius: borderRadius.L,
 },
 buttonForm: {
  backgroundColor: colors.platine025,
  padding: 10,
  width: '85%',
  height: 40,
  borderRadius: borderRadius.L,
 },
 itemForm: {
  flexDirection: 'row', alignItems: 'center', margin: '4%' 
 },
 imageForm: {
  width: 30, height: 30, marginRight: '4%'
 }
};

export default ProfileAdmin;