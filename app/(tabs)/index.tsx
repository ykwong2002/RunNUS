import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { NUSColors } from "@/src/theme/colors";
import { db } from "@/src/lib/firebase/config";
import { formatDuration } from "@/src/utils/run";

type Run = {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  distance: number;
  duration: number;
  timestamp: number;
  likes: number;
  comments: number;
  imageUrl?: string;
  caption?: string;
};

export default function FeedScreen() {
  const [runs, setRuns] = useState<Run[]>([]);

  useEffect(() => {
    loadRuns();
  }, []);

  const loadRuns = async () => {
    try {
      const runsRef = collection(db, "runs");
      const q = query(runsRef, orderBy("timestamp", "desc"), limit(20));
      const querySnapshot = await getDocs(q);
      const runData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Run[];
      setRuns(runData);
    } catch (error) {
      console.error("Error loading runs:", error);
    }
  };

  const renderRun = ({ item: run }: { item: Run }) => (
    <ThemedView style={styles.runCard}>
      <View style={styles.header}>
        <Image source={{ uri: run.userAvatar }} style={styles.avatar} />
        <View>
          <ThemedText type="defaultSemiBold">{run.userName}</ThemedText>
          <ThemedText style={styles.timestamp}>
            {new Date(run.timestamp).toLocaleDateString()}
          </ThemedText>
        </View>
      </View>

      {run.imageUrl && (
        <Image source={{ uri: run.imageUrl }} style={styles.runImage} />
      )}

      <View style={styles.stats}>
        <View style={styles.stat}>
          <IconSymbol name="figure.run" size={20} color={NUSColors.blue} />
          <ThemedText>{run.distance.toFixed(2)} km</ThemedText>
        </View>
        <View style={styles.stat}>
          <IconSymbol name="timer" size={20} color={NUSColors.blue} />
          <ThemedText>{formatDuration(run.duration)}</ThemedText>
        </View>
        <View style={styles.stat}>
          <IconSymbol name="flame" size={20} color={NUSColors.orange} />
          <ThemedText>{Math.round(run.distance * 60)} cal</ThemedText>
        </View>
      </View>

      {run.caption && (
        <ThemedText style={styles.caption}>{run.caption}</ThemedText>
      )}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.action}>
          <IconSymbol name="heart" size={20} color={NUSColors.gray[500]} />
          <ThemedText style={styles.actionText}>{run.likes}</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <IconSymbol
            name="text.bubble"
            size={20}
            color={NUSColors.gray[500]}
          />
          <ThemedText style={styles.actionText}>{run.comments}</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={runs}
        renderItem={renderRun}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    padding: 16,
    gap: 16,
  },
  runCard: {
    borderRadius: 12,
    padding: 16,
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  timestamp: {
    fontSize: 12,
    color: NUSColors.gray[500],
  },
  runImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: NUSColors.gray[200],
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    flexDirection: "row",
    gap: 24,
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    fontSize: 14,
    color: NUSColors.gray[500],
  },
});
