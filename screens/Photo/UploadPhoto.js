import React, { useState } from "react";
import axios from "axios";
import { ActivityIndicator, Alert, Image } from "react-native";
import useInput from "../../hooks/useInput";
import styled from "styled-components";
import {gql} from "apollo-boost";
import constants from "../../constants";
import styles from "../../styles";
import { useMutation } from "react-apollo-hooks";
import { FEED_QUERY } from "../Tabs/Home";

const UPLOAD = gql`
  mutation upload($caption: String!, $files: [String!]!, $locations: String) {
    upload(caption: $caption, files: $files, locations: $locations) {
      id
      caption
      locations
    }
  }
`;

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
  const photo = route.params.photo;
  const captionInput = useInput("");
  const locationInput = useInput("");
  const [uploadMutation] = useMutation(UPLOAD, {
    refetchQueries:() => [{query:FEED_QUERY}]
  });
  const handleSubmit = async () => {
    if(captionInput.value === "" || locationInput.value === ""){
      Alert.alert("All fields are required");
    }
    const formData = new FormData();
    const name = photo.filename;
    const [,type] = name.split(".");
    formData.append("file", {
      name,
      type:type.toLowerCase(),
      uri:photo.uri
    });
    try{
      setIsLoading(true);
      const {data:{location}} = await axios.post("http://localhost:4000/api/upload", formData, {
        headers:{
          "content-type":"multipart/form-data"
        }
      });
      setFileUrl(location);
      const {data:{upload}} = await uploadMutation({
        variables:{
          files:[location],
          caption:captionInput.value,
          locations:locationInput.value
        }
      });
      if(upload.id){
        navigation.navigate("TabNavigation");
      }
    }catch(e){
      Alert.alert("Can't upload", "Try later");
    }finally{
      setIsLoading(false);
    }
  };
  return (
    <View>
      <Container>
        <Image
          source={{uri:photo.uri}}
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