import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Introduction from '../views/introduction.jsx';
import Login from '../views/login.jsx';
import SelectProfile from "../views/selectProfile.jsx";
import ProfileAdmin from "../views/profileAdmin.jsx";

const Stack = createNativeStackNavigator();

const MainStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions = {{
                    headerShown: false,
                }}
                initialRouteName="Login"
                >
                
                <Stack.Screen
                    name = {'Introduction'}
                    component = {Introduction} 
                />

                <Stack.Screen
                    name = {'Login'}
                    component = {Login}
                />

                <Stack.Screen
                    name = {'Select Profile'}
                    component={SelectProfile}
                />

                <Stack.Screen
                    name = {'Profile Admin'}
                    component={ProfileAdmin}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack