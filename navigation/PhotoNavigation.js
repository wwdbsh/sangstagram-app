import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import SelectPhoto from "../screens/Photo/SelectPhoto";
import TakePhoto from "../screens/Photo/TakePhoto";
import UploadPhoto from "../screens/Photo/UploadPhoto";
import { stackStyles } from "./config";
import styles from "../styles";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const stackScreenOption = (title) => ({
    headerStyle:{...stackStyles},
    headerBackTitle:null,
    headerTintColor:styles.blackColor,
    headerTitle:title
});

const PhotoTabs = () => {
    return (
        <Tab.Navigator
         tabBarPosition="bottom"
         tabBarOptions={{
             style:{
                 ...stackStyles
             },
             labelStyle:{
                 color:styles.blackColor,
                 fontWeight:"600"
             }
         }}
        >
            <Tab.Screen name="Select" component={SelectPhoto} />
            <Tab.Screen name="Take" component={TakePhoto} />
        </Tab.Navigator>
    );
};

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
             name="PhotoTabs"
             component={PhotoTabs}
             options={stackScreenOption("Choose Photo")}
            />
            <Stack.Screen
             name="UploadPhoto"
             component={UploadPhoto}
             options={stackScreenOption("Upload")}
            />
        </Stack.Navigator>
    );
};