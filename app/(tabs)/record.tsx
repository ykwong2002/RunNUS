import { Text, View } from "react-native";
import { Stack } from "expo-router";

export default function Record() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the Record Page.</Text>
    </View>
  );
}
