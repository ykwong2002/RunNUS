import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NUSColors } from "@/src/theme/colors";
import { auth } from "@/src/lib/firebase/config";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email.endsWith("@u.nus.edu") && !email.endsWith("@nus.edu.sg")) {
      setError("Please use your NUS email address");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.logoContainer}>
        <ThemedText style={styles.title}>RunNUS</ThemedText>
        <ThemedText style={styles.subtitle}>
          Your Campus Running Community
        </ThemedText>
      </ThemedView>

      <ThemedView style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="NUS Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {error ? <ThemedText style={styles.error}>{error}</ThemedText> : null}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <ThemedText style={styles.buttonText}>Login</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: NUSColors.blue,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: NUSColors.gray[600],
  },
  form: {
    gap: 16,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: NUSColors.gray[300],
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: NUSColors.white,
  },
  error: {
    color: "#FF3B30",
    fontSize: 14,
  },
  button: {
    height: 48,
    backgroundColor: NUSColors.orange,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: NUSColors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
