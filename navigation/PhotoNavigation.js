import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Tab = createMaterialTopTabNavigator();

export default () => {
    return (
        <Tab.Navigator>
            <Tab.Screen />
        </Tab.Navigator>
    );
};