import React from "react";
import { Platform } from "react-native";
import styled from "styled-components";
import { useNavigation } from '@react-navigation/native';
import NavIcon from "./NabIcon";

const Container = styled.TouchableOpacity`
    padding-right:20px;
`;

export default () => {
    const navigation = useNavigation();
    return (
        <Container onPress={() => navigation.navigate("MessageNavigation")}>
            <NavIcon name={Platform.OS === "ios" ? "ios-paper-plane" : "md-paper-plane"}/>
        </Container>
    )
};