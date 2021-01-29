import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";
import PhotoNavigation from "./PhotoNavigation";

const Stack = createStackNavigator();

export default () => {
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode="none" mode="modal">
                <Stack.Screen name="TabNavigation" component={TabNavigation} />
                <Stack.Screen name="PhotoNavigation" component={PhotoNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};