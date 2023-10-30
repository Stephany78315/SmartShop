import {Text, StatusBar, View, Image, ActivityIndicator, ScrollView, TouchableOpacity} from 'react-native';
import HeaderMenu from '../components/headerMenu';
import { colors , borderRadius, fonts} from '../css/styles';
import FormButtonsAndIcons from '../components/formButtons&Icons';
import { gql, useQuery} from '@apollo/client';
import CameraModal from '../components/camara';
import React, { useState, useEffect } from 'react';
import { LogBox } from 'react-native';

const specify = [
 {
 icon: require('../images/icons/plusIcon.png'),
 text: "Ajuste de perfil",
 navegateTo: "Configuration Profile"
 },
 {
  icon: require('../images/icons/profileCircleIcon.png'),
  text: "Cuenta de contribuidor",
  navegateTo: "Contribuidor"
 },
 {
  icon: require('../images/icons/cartShopCircleIcon.png'),
  text: "Preferencias alimentarias",
  navegateTo: "Contribuidor"
 },
 {
  icon: require('../images/icons/settingCircleIcon.png'),
  text: "Ajustes de la aplicación",
  navegateTo: "Contribuidor"
 }
]

const USERBYID = gql`
  query UserById($userId: Int!) {
    userById(user_id: $userId) {
      user_name
      image
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

 return (
  <ScrollView contentContainerStyle={styles.scrollView}>
  <View style={styles.container}>
   
    <StatusBar hidden/>
    <View>
     <HeaderMenu/>
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
    
    <View>
      <FormButtonsAndIcons specify={specify} title={''} navigation={navigation}/>
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
 }
};

export default ProfileAdmin;