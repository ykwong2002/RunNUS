import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { signOut } from "firebase/auth";
import { router } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { NUSColors } from "@/src/theme/colors";
import { auth } from "@/src/lib/firebase/config";

const USER = {
  name: "John Doe",
  email: "e0123456@u.nus.edu",
  faculty: "School of Computing",
  year: "2023",
  avatar: "https://i.pravatar.cc/300",
  stats: {
    totalRuns: 42,
    totalDistance: 324.5,
    totalTime: 98460, // in seconds
    achievements: ["Early Bird", "Marathon Finisher", "Night Owl"],
  },
};

export default function ProfileScreen() {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/(auth)/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: USER.avatar }} style={styles.avatar} />
        <View style={styles.userInfo}>
          <ThemedText type="title">{USER.name}</ThemedText>
          <ThemedText style={styles.email}>{USER.email}</ThemedText>
          <View style={styles.facultyInfo}>
            <ThemedText style={styles.faculty}>{USER.faculty}</ThemedText>
            <ThemedText style={styles.year}>Year {USER.year}</ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <IconSymbol name="figure.run" size={24} color={NUSColors.blue} />
          <ThemedText type="title">{USER.stats.totalRuns}</ThemedText>
          <ThemedText>Total Runs</ThemedText>
        </View>
        <View style={styles.statBox}>
          <IconSymbol name="map" size={24} color={NUSColors.blue} />
          <ThemedText type="title">
            {USER.stats.totalDistance.toFixed(1)}km
          </ThemedText>
          <ThemedText>Distance</ThemedText>
        </View>
        <View style={styles.statBox}>
          <IconSymbol name="clock" size={24} color={NUSColors.blue} />
          <ThemedText type="title">
            {Math.floor(USER.stats.totalTime / 3600)}h{" "}
            {Math.floor((USER.stats.totalTime % 3600) / 60)}m
          </ThemedText>
          <ThemedText>Time</ThemedText>
        </View>
      </View>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Achievements</ThemedText>
        <View style={styles.achievements}>
          {USER.stats.achievements.map((achievement) => (
            <View key={achievement} style={styles.achievement}>
              <IconSymbol name="trophy" size={20} color={NUSColors.orange} />
              <ThemedText>{achievement}</ThemedText>
            </View>
          ))}
        </View>
      </ThemedView>

      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <ThemedText style={styles.signOutText}>Sign Out</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
  },
  email: {
    color: NUSColors.gray[600],
    marginBottom: 4,
  },
  facultyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  faculty: {
    fontSize: 14,
    color: NUSColors.gray[700],
  },
  year: {
    fontSize: 14,
    color: NUSColors.gray[600],
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    backgroundColor: NUSColors.gray[100],
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  section: {
    marginBottom: 24,
  },
  achievements: {
    marginTop: 12,
    gap: 8,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: NUSColors.gray[100],
    padding: 12,
    borderRadius: 8,
  },
  signOutButton: {
    backgroundColor: NUSColors.gray[200],
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: "auto",
  },
  signOutText: {
    color: NUSColors.gray[700],
    fontWeight: "600",
  },
});
