import React, { useState } from "react";
import { Image, Platform, View } from "react-native";
import styled from "styled-components";
import PropTypes from "prop-types";
import Swiper from "react-native-swiper";
import { gql } from "apollo-boost";
import constants from "../constants";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles";
import { useMutation } from "react-apollo-hooks";
import { useNavigation } from "@react-navigation/native";

export const TOGGLE_LIKE = gql`
  mutation toggelLike($postId: String!) {
    toggleLike(postId: $postId)
  }
`;

const Container = styled.View``;
const Header = styled.View`
    padding:15px;
    flex-direction:row;
    align-items:center;
`;
const Touchable = styled.TouchableOpacity``;
const HeaderUserContainer = styled.View`
    margin-left:10px;
`;
const Bold = styled.Text`
    font-weight:500;
`;
const Text = styled.Text``;
const Comment = styled.Text``;
const Location = styled.Text`
    font-size:12px;
`;
const IconsContainer = styled.View`
    flex-direction:row;
    margin-bottom:5px;
`;
const IconContainer = styled.View`
    margin-right:10px;
`;
const InfoContainer = styled.View`
    padding:10px;
`;
const Caption = styled.Text`
    margin:3px 0px;
`;
const CommentCount = styled.Text`
    opacity:0.5;
    font-size:13px;
`;

const Post = ({
    id,
    user,
    locations,
    files=[],
    likeCount:likeCountProp,
    caption,
    comments=[],
    isLiked:isLikedProp,
    pressedBubble:pressdBubbleProp
}) => {
    const [isLiked, setIsLiked] = useState(isLikedProp);
    const [likeCount, setLikeCount] = useState(likeCountProp);
    const [pressedBubble, setPressedBubble] = useState(pressdBubbleProp);
    const [seeComment, setSeeComment] = useState(false);
    const [toggleeLikeMutation] = useMutation(TOGGLE_LIKE, {
        variables:{
            postId:id
        }
    });
    const handleLike = async () => {
        if(isLiked === true){
            setLikeCount(l => l-1);
        }else{
            setLikeCount(l => l+1);
        }
        setIsLiked(p => !p);
        try{
            await toggleeLikeMutation();
        }catch(e){
            console.log(e);
        }
    };
    const handleBubble = () => {
        setPressedBubble(b => !b);
    };
    const handleSeeComment = () => {
        setSeeComment(c => !c);
    };
    const organizeCaption = (caption) => {
        let rt = "";
        caption = caption.split(" ");
        for(let i = 1; i < caption.length; i++){
            rt += (caption[i] + " ");
        }
        return rt;
    };
    const navigation = useNavigation();
    return (
        <Container>
            <Header>
                <Touchable onPress={() => navigation.navigate("UserDetail", {username:user.username})}>
                    <Image
                     style={{height:40, width:40, borderRadius:20}} 
                     source={{uri:user.avatar}} 
                     />
                </Touchable>
                <HeaderUserContainer>
                    <Touchable onPress={() => navigation.navigate("UserDetail", {username:user.username})}>
                        <Bold>{user.username}</Bold>
                    </Touchable>
                    <Location>{locations}</Location>
                </HeaderUserContainer>
            </Header>
            <Swiper
             loop={false} 
             style={{height:constants.height/1.9}}
             >
                {files.map(file => (
                    <Image
                     style={{height:constants.height/1.9, width:constants.width}} 
                     key={file.id} 
                     source={{uri:file.url}}
                     />
                ))}
            </Swiper>
            <InfoContainer>
                <IconsContainer>
                    <Touchable onPress={handleLike}>
                        <IconContainer>
                            <Ionicons
                            size={24}
                            color={isLiked ? styles.redColor : styles.blackColor}
                            name={Platform.OS === "ios"
                            ? isLiked
                              ? "ios-heart"
                              : "ios-heart-outline"
                            : isLiked
                              ? "md-heart"
                              : "md-heart-outline"
                            } 
                            />
                        </IconContainer>
                    </Touchable>
                    <Touchable onPress={handleBubble}>
                        <IconContainer>
                            <Ionicons
                            size={24}
                            color={pressedBubble && styles.blackColor}
                            name={Platform.OS === "ios"
                            ? pressedBubble
                              ? "ios-chatbubble"
                              : "ios-chatbubble-outline"
                            : pressedBubble
                              ? "md-chatbubble"
                              : "md-chatbubble-outline"
                            } 
                            />
                        </IconContainer>
                    </Touchable>
                </IconsContainer>
                <Touchable>
                    <Bold>{likeCount === 1 ? "1 like" : `${likeCount} likes`}</Bold>
                </Touchable>
                <Caption>
                    <Bold>{user.username}</Bold> {organizeCaption(caption)}
                </Caption>
                {comments.length !== 0 &&
                    <Touchable onPress={handleSeeComment}>
                        {!seeComment && <CommentCount>View all {comments.length} comments</CommentCount>}
                    </Touchable>
                }
                <Touchable onPress={handleSeeComment}>
                    {seeComment && <CommentCount>Hide all comments</CommentCount>}
                </Touchable>
                {seeComment &&
                    comments.map(obj => <Comment><Bold key={obj.id}>{obj.user.username}</Bold><Text> {obj.text}</Text></Comment>)
                }
            </InfoContainer>
        </Container>
    );
};

Post.propTypes = {
    id:PropTypes.string.isRequired,
    user:PropTypes.shape({
        id:PropTypes.string.isRequired,
        avatar:PropTypes.string,
        username:PropTypes.string.isRequired
    }).isRequired,
    files:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.string.isRequired,
            url:PropTypes.string.isRequired
        })
    ).isRequired,
    likeCount:PropTypes.number.isRequired,
    isLiked:PropTypes.bool.isRequired,
    comments:PropTypes.arrayOf(
        PropTypes.shape({
            id:PropTypes.string.isRequired,
            text:PropTypes.string.isRequired,
            user:PropTypes.shape({
                id:PropTypes.string.isRequired,
                username:PropTypes.string.isRequired
            }).isRequired
        })
    ).isRequired,
    caption:PropTypes.string.isRequired,
    location:PropTypes.string,
    createdAt:PropTypes.string.isRequired,
};

export default Post;