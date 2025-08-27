import { useEffect } from "react";
import { LogBox } from "react-native";
import { SplashScreen } from "expo-router";
import { auth } from "@/src/lib/firebase/config";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Ignore specific Firebase warnings
LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core",
]);

export default function App() {
  useEffect(() => {
    // Ensure Firebase auth is initialized
    if (auth) {
      // Hide splash screen once auth is ready
      SplashScreen.hideAsync();
    }
  }, []);

  return null;
}
