import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

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

export default function FeedScreen() {
  const [Posts, setPosts] = useState([]);

  //   useEffect(() => {
  //     getPosts().then((postData) => {
  //         setPosts(postData);
  //     });

  //     console.log("POST_DATA: ", Posts);
  //   }, [])

//   getPosts().then((postData) => {
//     setPosts(postData);
//   });

//   console.log("POST_DATA: ", postData);

  return (
    <Container>
      {/* <FlatList
        data={Posts}
        // renderItem={({ item }) => <PostCard item={item} />}
        renderItem={({ item }) => (
          <View>
            <Text>{item.user_id}</Text>
            <Text>{item.post_question}</Text>
            <Text>{item.post_title}</Text>
            <Text>{item.user_email}</Text>
            <Text>{item.user_name}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      /> */}
    </Container>
  );
}
