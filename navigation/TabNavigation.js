import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import Search from "../screens/Search";
import Notifications from "../screens/Notifications";
import Profile from "../screens/Profile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackFactory = (initialRoute, name, customConfig) => (
    <Stack.Navigator>
        <Stack.Screen
         name={name}
         component={initialRoute}
         options={{...customConfig}}
        />
    </Stack.Navigator>
);

export default () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home">
                {() => stackFactory(Home, "Home", {
                    title:"Home",
                    headerRight: () => (
                        <TouchableOpacity>
                            <Text>Hello</Text>
                        </TouchableOpacity>
                    )}
                )}
            </Tab.Screen>
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Add" component={View} listeners={({ navigation, route }) => ({
                tabPress: e => {
                        e.preventDefault();
                        navigation.navigate("PhotoNavigation");
                    }
                })}
            />
            <Tab.Screen name="Notifications" component={Notifications} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};