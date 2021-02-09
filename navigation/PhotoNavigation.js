import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const PhotoTabs = () => {
    return (
        <Tab.Navigator tabBarPosition="bottom" >
            <Tab.Screen name="SelectPhoto" component={SelectPhoto} />
            <Tab.Screen name="TakePhoto" component={TakePhoto} />
        </Tab.Navigator>
    );
};

export default () => {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="PhotoTabs" component={PhotoTabs} options={{headerStyle:{...stackStyles}}} />
            <Stack.Screen name="UploadPhoto" component={UploadPhoto} options={{headerStyle:{...stackStyles}}} />
        </Stack.Navigator>
    );
};