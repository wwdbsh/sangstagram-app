import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { USER_FRAGMENT } from "../../fragments";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../components/Loader";
import { useQuery } from "react-apollo-hooks";
import UserProfile from "../../components/UserProfile";

export const ME = gql`
  {
    me{
      ...UserParts
    }
  }
  ${USER_FRAGMENT}
`;

const Text = styled.Text``;

export default ({navigation}) => {
  const {loading, data} = useQuery(ME);
  return (
    <ScrollView>
      {loading ? <Loader /> : data && data.me && <UserProfile {...data.me} /> }
    </ScrollView>
  );
};