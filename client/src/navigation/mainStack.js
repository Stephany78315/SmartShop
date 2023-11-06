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

                <Stack.Screen 
                    name = {'Profile Settings'}
                    component={ProfileSettings}
                />

                <Stack.Screen 
                    name = {'Contributor Profile'}
                    component={ContributorProfile}
                />

                <Stack.Screen 
                    name = {'Food Preferences'}
                    component={FoodPreferences}
                />
                <Stack.Screen 
                    name = {'Aplication Settings'}
                    component={AplicationSettings}
                />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack