import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "../../types/post";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
}

export default function PostCard({ post, onLike, onComment }: PostCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image
          source={{ uri: post.userAvatar || "https://placeholder.com/user" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.userName}>{post.userName}</Text>
          <Text style={styles.timestamp}>
            {post.timestamp.toLocaleDateString()}
          </Text>
        </View>
      </View>

      {post.route && (
        <Image source={{ uri: post.route }} style={styles.routeImage} />
      )}

      <View style={styles.stats}>
        <Text style={styles.stat}>🏃‍♂️ {post.distance.toFixed(2)} km</Text>
        <Text style={styles.stat}>
          ⏱️ {Math.floor(post.duration / 60)}:
          {(post.duration % 60).toString().padStart(2, "0")}
        </Text>
        <Text style={styles.stat}>⚡ {post.pace.toFixed(2)} min/km</Text>
      </View>

      <Text style={styles.caption}>{post.caption}</Text>

      <View style={styles.actions}>
        <Pressable onPress={() => onLike(post.id)} style={styles.action}>
          <Ionicons name="heart-outline" size={24} color="#0066ff" />
          <Text style={styles.actionText}>{post.likes}</Text>
        </Pressable>
        <Pressable onPress={() => onComment(post.id)} style={styles.action}>
          <Ionicons name="chatbubble-outline" size={24} color="#0066ff" />
          <Text style={styles.actionText}>{post.comments}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
  },
  timestamp: {
    fontSize: 12,
    color: "#666",
  },
  routeImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  stat: {
    fontSize: 14,
    fontWeight: "500",
  },
  caption: {
    fontSize: 14,
    marginBottom: 12,
  },
  actions: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 12,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  actionText: {
    marginLeft: 4,
    color: "#666",
  },
});
