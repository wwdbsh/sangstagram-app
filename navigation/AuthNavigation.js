import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignUp from "../screens/Auth/SignUp";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";

const Stack = createStackNavigator();

const AuthNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="AuthHome" component={AuthHome}/>
                <Stack.Screen name="SignUp" component={SignUp}/>
                <Stack.Screen name="Confirm" component={Confirm}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigation;