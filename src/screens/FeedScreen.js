import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  InteractionManager,
} from "react-native";
import firebase from "firebase/app";

import PostCard from "../components/PostCard";

import { Container } from "../styles/FeedStyles";

import { MaterialIcons } from "@expo/vector-icons";
import { getPosts } from "../api/auth-api";

// const Posts = [
//   {
//     id: "1",
//     userName: "Jenny Doe",
//     userImg: require("../assets/images/my-face.jpg"),
//     postTime: "4 mins ago",
//     post: "Hey there, this is my test for a post of my social app in React Native.",
//     postImg: require("../assets/images/1.jpg"),
//     liked: true,
//     likes: "14",
//     comments: "5",
//   },
//   {
//     id: "2",
//     userName: "John Doe",
//     userImg: require("../assets/images/my-face.jpg"),
//     postTime: "2 hours ago",
//     post: "Hey there, this is my test for a post of my social app in React Native.",
//     postImg: "none",
//     liked: false,
//     likes: "8",
//     comments: "0",
//   },
//   {
//     id: "3",
//     userName: "Ken William",
//     userImg: require("../assets/images/my-face.jpg"),
//     postTime: "1 hours ago",
//     post: "Hey there, this is my test for a post of my social app in React Native.",
//     postImg: require("../assets/images/1.jpg"),
//     liked: true,
//     likes: "1",
//     comments: "0",
//   },
//   {
//     id: "4",
//     userName: "Selina Paul",
//     userImg: require("../assets/images/my-face.jpg"),
//     postTime: "1 day ago",
//     post: "Hey there, this is my test for a post of my social app in React Native.",
//     postImg: require("../assets/images/1.jpg"),
//     liked: true,
//     likes: "22",
//     comments: "4",
//   },
//   {
//     id: "5",
//     userName: "Christy Alex",
//     userImg: require("../assets/images/my-face.jpg"),
//     postTime: "2 days ago",
//     post: "Hey there, this is my test for a post of my social app in React Native.",
//     postImg: "none",
//     liked: false,
//     likes: "0",
//     comments: "0",
//   },
// ];

export default function FeedScreen({navigation}) {
  const [all_posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then((postData) => {
      setPosts(postData.data);
    });

    
  }, []);

  console.log("POST_DATA: ", all_posts);

  return (
    <Container>
      <FlatList
        data={all_posts}
        // data={JSON.stringify(Posts)}
        renderItem={({ item }) => <PostCard item={item} navigation = {navigation} />}
        // keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
}
