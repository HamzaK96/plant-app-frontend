import React from "react";

import {
  Container,
  Card,
  UserImg,
  UserInfo,
  UserName,
  PostTime,
  UserInfoText,
  PostText,
  PostImg,
  InteractionWrapper,
  Interaction,
  InteractionText,
} from "../styles/FeedStyles";

import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Divider } from "react-native-paper";

const PostCard = ({ item }) => {



  likeIcon = item.liked ? "favorite" : "favorite-border";
  likeIconColor = item.liked ? "#2e64e5" : "#333";

  if (item.likes == 1) {
    likeText = "1 Like";
  } else if (item.likes > 1) {
    likeText = item.likes + " Likes";
  } else {
    likeText = "Like";
  }

  if (item.comments == 1) {
    commentText = "1 Comment";
  } else if (item.comments > 1) {
    commentText = item.comments + " Comments";
  } else {
    commentText = "Comment";
  }

  return (
    <Card>
      <UserInfo>
        {/* <UserImg source={item.userImg} /> */}
        <UserInfoText>
          <UserName>{item.userName}</UserName>
          {/* <PostTime>{item.postTime}</PostTime> */}
        </UserInfoText>
      </UserInfo>
      <PostText>{item.post}</PostText>
      {item.postImg != "none" ? <PostImg source={item.postImg} /> : <Divider />}
      {/* <PostImg source={require("../assets/images/1.jpg")} /> */}

      <InteractionWrapper>
        <Interaction active={item.liked}>
          <MaterialIcons name={likeIcon} color={likeIconColor} size={24} />
          <InteractionText active>Like</InteractionText>
        </Interaction>
        <Interaction>
          <MaterialIcons name="forum" color="white" size={24} />
          <InteractionText>{commentText}</InteractionText>
        </Interaction>
      </InteractionWrapper>
    </Card>
  );
};

export default PostCard;
