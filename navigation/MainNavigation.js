import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";
import MessageNavigation from "./MessageNavigation";
import { stackStyles } from "./config";

const Stack = createStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" mode="modal">
                <Stack.Screen name="TabNavigation" component={TabNavigation} options={{headerStyle:{...stackStyles}}}/>
                <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} options={{headerStyle:{...stackStyles}}} />
                <Stack.Screen name="MessageNavigation" component={MessageNavigation} options={{headerStyle:{...stackStyles}}} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};