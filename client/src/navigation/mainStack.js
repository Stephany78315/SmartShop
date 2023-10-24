import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Introduction from '../views/introduction.jsx';
import Login from '../views/login.jsx';

const Stack = createNativeStackNavigator();

const MainStack = () => {
    console.log('estas en MainStack');
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions = {{
                    headerShown: false,
                }}
                initialRouteName="Introduction"
                >
                
                <Stack.Screen
                    name = {'Introduction'}
                    component = {Introduction} 
                />

                <Stack.Screen
                    name = {'Login'}
                    component = {Login}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack