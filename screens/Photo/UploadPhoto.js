import React, { useState } from "react";
import { ActivityIndicator, Alert, Image } from "react-native";
import useInput from "../../hooks/useInput";
import styled from "styled-components";
import constants from "../../constants";
import styles from "../../styles";

const View = styled.View`
  flex: 1;
`;

const Container = styled.View`
  padding:20px;
  flex-direction:row;
`;

const Form = styled.View`
  justify-content:flex-start;
`;

const STextInput = styled.TextInput`
  margin-bottom:10px;
  border:0px solid ${styles.lightGreyColor};
  border-bottom-width:1px;
  padding-bottom: 10px;
  width:${constants.width - 180};
`;

const Button = styled.TouchableOpacity`
  background-color:${props => props.theme.blueColor};
  padding:10px;
  border-radius:4px;
  align-items:center;
  justify-content:center;
`;

const Text = styled.Text`
  color:#fff;
  font-weight:600;
`;

export default ({navigation, route}) => {
  const [loading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const captionInput = useInput("");
  const locationInput = useInput("");
  const handleSubmit = async () => {
    if(captionInput.value === "" || locationInput.value === ""){
      Alert.alert("All fields are required");
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{uri:route.params.photo.uri}}
          style={{height:80, width:80, marginRight:30}}
        />
        <Form>
          <STextInput
            onChangeText={captionInput.onChange}
            value={captionInput.value}
            placeholder="Caption"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <STextInput
            onChangeText={locationInput.onChange}
            value={locationInput.value}
            placeholder="Location"
            multiline={true}
            placeholderTextColor={styles.darkGreyColor}
          />
          <Button onPress={handleSubmit}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text>Upload</Text>
            )}
          </Button>
        </Form>
      </Container>
    </View>
  );
};