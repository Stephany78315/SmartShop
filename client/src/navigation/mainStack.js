import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Introduction from '../views/introduction.jsx';
import Login from '../views/login.jsx';
import SelectProfile from "../views/selectProfile.jsx";
import ProfileAdmin from "../views/profileAdmin.jsx";
import ProfileSettings from "../views/profileSettings.jsx";
import ContributorProfile from "../views/contributorProfile.jsx";
import FoodPreferences from "../views/foodPreferences.jsx";
import AplicationSettings from "../views/aplicationSettings.jsx";
import CustomDrawer from "../components/customDrawer.jsx";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()

const MainStack = () => {
    return (
        <Stack.Navigator initialRouteName="Login">                
            <Stack.Screen name={'Introduccion'} component={Introduction} options={{headerShown: false}}/>
            <Stack.Screen name={'Inicio de Sesión'} component={Login} options={{headerShown: false}}/>
            <Stack.Screen name={'Selección de Perfil'} component={SelectProfile} options={{headerShown: true}}/>
            <Stack.Screen name={'Administración de Perfil'} component={ProfileAdmin} options={{headerShown: false}}/>
            <Stack.Screen name={'Ajustes de Perfil'} component={ProfileSettings} options={{headerShown: true}}/>
            <Stack.Screen name={'Perfil de Contribuidor'} component={ContributorProfile} options={{headerShown: true}}/>
            <Stack.Screen name={'Preferencias Alimenticias'} component={FoodPreferences} options={{headerShown: true}}/>
            <Stack.Screen name={'Ajustes de la Aplicación'} component={AplicationSettings} options={{headerShown: true}}/>
        </Stack.Navigator>
    )
}

const MainDrawer = () => {
    return (
        <NavigationContainer>
            <Drawer.Navigator screenOptions={{headerShown: false}} initialRouteName="Introduction" drawerContent={(props) => <CustomDrawer {...props} />}>
                
                <Drawer.Screen name={'Introducción'} component={Introduction}/>
                <Drawer.Screen name={'Inicio de Sesión'} component={Login}/>
                <Drawer.Screen name='Main' component={MainStack} options={{ drawerLabel: () => null }}/>
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default MainDrawer