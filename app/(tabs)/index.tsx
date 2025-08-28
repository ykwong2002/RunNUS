import { useState, useEffect } from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import PostCard from "../../src/components/home/PostCard";
import { Post } from "../../src/types/post";

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    //Dummy data for now
    const dummyPosts: Post[] = [
      {
        id: "1",
        userId: "1",
        userName: "John Doe",
        userAvatar: "https://placeholder.com/user1",
        caption: "Great run today!",
        distance: 5.2,
        duration: 1500,
        pace: 4.8,
        route: "https://placeholder.com/route1",
        likes: 10,
        comments: 2,
        timestamp: new Date(),
      }, //...more dummy posts
    ];

    setPosts(dummyPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchPosts();
    setRefreshing(false);
  };

  const handleLike = (postId: string) => {
    // Handle like action
    console.log(`Liked post ${postId}`);
  };

  const handleComment = (postId: string) => {
    // Handle comment action
    console.log(`Commented on post ${postId}`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard post={item} onLike={handleLike} onComment={handleComment} />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={["#0066ff"]}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
