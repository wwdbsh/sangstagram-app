import React from "react";
import { View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NabIcon";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackFactory = (initialRoute, name, customConfig) => (
    <Stack.Navigator>
        <Stack.Screen
         name={name}
         component={initialRoute}
         options={{...customConfig, headerTitleAlign:"center"}}
        />
    </Stack.Navigator>
);

export default () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home">
                {() => stackFactory(Home, "Home", {
                        title:"Home",
                        headerTitle: (
                            <NavIcon name="logo-instagram" size={36}/>
                        //  <Image
                        //   style={{height:35}}
                        //   resizeMode="contain"
                        //   source={require("../assets/logo.png")}
                        //   />
                        ),
                        headerRight: () => <MessagesLink/>
                    }
                )}
            </Tab.Screen>
            <Tab.Screen name="Search">
                {() => stackFactory(Search, "Search", {title:"Search"})}
            </Tab.Screen>
            <Tab.Screen name="Add" component={View} listeners={({ navigation, route }) => ({
                tabPress: e => {
                        e.preventDefault();
                        navigation.navigate("PhotoNavigation");
                    }
                })}
            />
            <Tab.Screen name="Notifications">
                {() => stackFactory(Notifications, "Notifications", {title:"Notifications"})}
            </Tab.Screen>
            <Tab.Screen name="Profile">
                {() => stackFactory(Profile, "Profile", {title:"Profile"})}
            </Tab.Screen>
        </Tab.Navigator>
    );
};