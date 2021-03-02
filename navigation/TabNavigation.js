import React from "react";
import { View, Image, Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search/SearchContainer";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import Detail from "../screens/Detail";
import MessagesLink from "../components/MessagesLink";
import NavIcon from "../components/NabIcon";
import { Ionicons } from "@expo/vector-icons";
import { stackStyles } from "./config";
import styles from "../styles";
import UserDetail from "../screens/UserDetail";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackFactory = (initialRoute, name, customConfig) => (
    <Stack.Navigator>
        <Stack.Screen
         name={name}
         component={initialRoute}
         options={{
             ...customConfig, 
             headerTitleAlign:"center",
             headerStyle:{...stackStyles},
             headerBackTitle:null
            }}
        />
        <Stack.Screen
         name={"Detail"}
         component={Detail}
         options={{
             headerStyle:{...stackStyles},
             headerTintColor:styles.blackColor,
             title:"Photo",
             headerBackTitle:null
         }}
        />
        <Stack.Screen
         name={"UserDetail"}
         component={UserDetail}
         options={({route}) => ({
             headerStyle:{...stackStyles},
             headerTintColor:styles.blackColor,
             title:route.params.username,
             headerBackTitle:null
         })}
        />
    </Stack.Navigator>
);

export default () => {
    return (
        <Tab.Navigator
         screenOptions={({route}) => ({
             tabBarIcon:({focused, color, size}) => {
                 let iconName;
                 const os = Platform.OS;
                 switch(route.name){
                     case "Home":
                         if(focused){
                            iconName = os === "ios" ? "ios-home" : "md-home";
                         }else{
                            iconName = os === "ios" ? "ios-home-outline" : "md-home-outline";
                         }
                         break;
                     case "Search":
                        if(focused){
                            iconName = os === "ios" ? "ios-search" : "md-search";
                         }else{
                            iconName = os === "ios" ? "ios-search-outline" : "md-search-outline";
                         }
                         break;
                     case "Add":
                        size = 28;
                        if(focused){
                            iconName = os === "ios" ? "ios-add" : "md-add";
                         }else{
                            iconName = os === "ios" ? "ios-add-outline" : "md-add-outline";
                         }
                         break;
                     case "Notifications":
                        if(focused){
                            iconName = os === "ios" ? "ios-heart" : "md-heart";
                         }else{
                            iconName = os === "ios" ? "ios-heart-outline" : "md-heart-outline";
                         }
                         break;
                     case "Profile":
                        if(focused){
                            iconName = os === "ios" ? "ios-person" : "md-person";
                         }else{
                            iconName = os === "ios" ? "ios-person-outline" : "md-person-outline";
                         }
                 }
                 return <Ionicons name={iconName} size={size} color={color} />
             }
         })}
         tabBarOptions={{
             showLabel:false,
             activeTintColor:"black",
             inactiveTintColor:"black",
             style:{
                 backgroundColor:"#FAFAFA"
             }
         }}
        >
            <Tab.Screen name="Home">
                {() => stackFactory(Home, "Home", {
                        title:"Home",
                        headerTitle: (
                         <Image
                          style={{height:35}}
                          resizeMode="contain"
                          source={require("../assets/logo.png")}
                          />
                        ),
                        headerRight: () => <MessagesLink/>
                    }
                )}
            </Tab.Screen>
            <Tab.Screen name="Search">
                {() => stackFactory(Search, "Search", {
                        title:"Search",
                        headerBackTitle:null
                    }
                )}
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