import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Stack, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/src/lib/firebase/config";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { NUSColors } from "@/src/theme/colors";

export default function AuthLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          router.replace("/(tabs)");
        }
        setIsLoading(false);
      },
      (error) => {
        console.error("Auth error:", error);
        setError(error.message);
        setIsLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  if (isLoading) {
    return (
      <ThemedView style={styles.container}>
        <ActivityIndicator size="large" color={NUSColors.blue} />
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText style={styles.error}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "transparent" },
      }}
    >
      <Stack.Screen name="login" />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  error: {
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 20,
  },
});
