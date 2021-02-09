import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Messages from "../screens/Messages/Messages"
import Message from "../screens/Messages/Message"
import { stackStyles } from "./config";

const Stack = createStackNavigator();

export default () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Messages" component={Messages} options={{headerStyle:{...stackStyles}}}/>
            <Stack.Screen name="Message" component={Message} options={{headerStyle:{...stackStyles}}}/>
        </Stack.Navigator>
    );
};