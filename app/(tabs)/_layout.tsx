import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: true, // show header at the top
        headerTitle: getHeaderTitle(route.name),
        tabBarActiveTintColor: "#0066ff", // NUS Blue
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case "index":
              iconName = "home";
              break;
            case "maps":
              iconName = "map";
              break;
            case "record":
              iconName = "radio-button-on";
              break;
            case "community":
              iconName = "people";
              break;
            case "profile":
              iconName = "person";
              break;
            default:
              iconName = "ellipse";
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: "Home" }} />
      <Tabs.Screen name="maps" options={{ title: "Maps" }} />
      <Tabs.Screen name="record" options={{ title: "Record Run" }} />
      <Tabs.Screen name="community" options={{ title: "Community" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}

// Helper function for header titles
function getHeaderTitle(routeName: string) {
  switch (routeName) {
    case "index":
      return "Home";
    case "maps":
      return "Maps";
    case "record":
      return "Record Run";
    case "community":
      return "Community";
    case "profile":
      return "Profile";
    default:
      return "";
  }
}
