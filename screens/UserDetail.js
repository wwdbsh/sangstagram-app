import { gql } from "apollo-boost";
import React from "react";
import { useQuery } from "react-apollo-hooks";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../components/Loader";
import { USER_FRAGMENT } from "../fragments";
import UserProfile from "../components/UserProfile";

const GET_USER = gql`
    query seeUser($username:String!){
        seeUser(username:$username){
            ...UserParts
        }
    }
    ${USER_FRAGMENT}
`;

export default ({route, navigation}) => {
    const {loading, data} = useQuery(GET_USER, {
        variables:{username:route.params.username}
    });
    return (
        <ScrollView>
            {loading ? (
                <Loader />
            ) : (
                data && 
                data.seeUser && 
                <UserProfile {...data.seeUser} />
            )}
        </ScrollView>
    );
};