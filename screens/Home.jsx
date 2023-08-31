import axios from "axios";
import {
  Alert,
  FlatList,
  View,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Post } from "../component/Post";
import { useEffect, useState } from "react";
import { Loading } from "../component/Loading";

export const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [items, setItems] = useState();

  const fetchPost = () => {
    setIsLoading(true);
    axios
      .get("https://64ef74d7219b3e2873c48849.mockapi.io/news")
      .then(({ data }) => {
        setItems(data);
      })
      .catch((e) => {
        console.log(e);
        Alert.alert("Errors", "Not download Data");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(fetchPost, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPost} />
        }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("FullPost", {id:item.id, title:item.title})}>
            <Post
              title={item.title}
              imageUrl={item.imageUrl}
              createAt={item.createdAt}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
