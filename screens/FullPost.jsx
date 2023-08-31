import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Loading } from "../component/Loading";
import axios from "axios";
import { View } from "react-native";

const PostImage = styled.Image`
  width: 100%;
  height: 250px;
  border-radius: 10px;
  margin-bottom: 20;
`;

const PostText = styled.Text`
  font-size: 18px;
  line-height: 24px;
`;

export const FullPost = ({route, navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const {id, title} = route.params;

  useEffect(() => {
    navigation.setOptions({title})
    setIsLoading(true);
    axios
      .get("https://64ef74d7219b3e2873c48849.mockapi.io/news/"+id)
      .then(({ data }) => {
        setData(data);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Errors", "Not download News");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);



  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={{ padding: 20 }}>
      <PostImage source={{ uri:data.imageUrl }} />
      <PostText>
       {data.text}
      </PostText>
    </View>
  );
};
