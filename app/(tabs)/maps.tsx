import { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, ScrollView } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { NUSColors } from "@/src/theme/colors";
import { SFSymbols6_0 } from "@/constants/SFSymbols";

type RouteFilter = "distance" | "elevation" | "popular" | "recent";

type Route = {
  id: string;
  name: string;
  distance: number;
  elevation: number;
  coordinates: { latitude: number; longitude: number }[];
  likes: number;
  completions: number;
  createdAt: number;
};

const MOCK_ROUTES: Route[] = [
  {
    id: "1",
    name: "Kent Ridge Loop",
    distance: 5.2,
    elevation: 127,
    coordinates: [
      { latitude: 1.2966, longitude: 103.7764 },
      { latitude: 1.2934, longitude: 103.7751 },
      { latitude: 1.2921, longitude: 103.7805 },
      { latitude: 1.2957, longitude: 103.7816 },
    ],
    likes: 45,
    completions: 128,
    createdAt: Date.now() - 86400000 * 3,
  },
  // Add more mock routes here
];

export default function MapsScreen() {
  // We'll use the user location later for route creation
  const [selectedFilter, setSelectedFilter] = useState<RouteFilter>("popular");
  const [routes, setRoutes] = useState<Route[]>(MOCK_ROUTES);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      // We'll use location permissions later for route creation
      await Location.getCurrentPositionAsync({});
    })();
  }, []);

  const filterRoutes = (filter: RouteFilter) => {
    setSelectedFilter(filter);
    let filtered = [...MOCK_ROUTES];
    switch (filter) {
      case "distance":
        filtered.sort((a, b) => a.distance - b.distance);
        break;
      case "elevation":
        filtered.sort((a, b) => b.elevation - a.elevation);
        break;
      case "popular":
        filtered.sort((a, b) => b.completions - a.completions);
        break;
      case "recent":
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
    }
    setRoutes(filtered);
  };

  const renderFilterButton = (
    filter: RouteFilter,
    label: string,
    icon: SFSymbols6_0
  ) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.filterButtonActive,
      ]}
      onPress={() => filterRoutes(filter)}
    >
      <IconSymbol
        name={icon}
        size={20}
        color={
          selectedFilter === filter ? NUSColors.white : NUSColors.gray[600]
        }
      />
      <ThemedText
        style={[
          styles.filterText,
          selectedFilter === filter && styles.filterTextActive,
        ]}
      >
        {label}
      </ThemedText>
    </TouchableOpacity>
  );

  return (
    <ThemedView style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude: 1.2966,
          longitude: 103.7764,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {routes.map((route) => (
          <Polyline
            key={route.id}
            coordinates={route.coordinates}
            strokeColor={
              selectedRoute?.id === route.id ? NUSColors.orange : NUSColors.blue
            }
            strokeWidth={3}
          />
        ))}
      </MapView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filters}
      >
        {renderFilterButton("popular", "Popular", "star.fill")}
        {renderFilterButton("distance", "Distance", "ruler.fill")}
        {renderFilterButton("elevation", "Elevation", "mountain.2.fill")}
        {renderFilterButton("recent", "Recent", "clock.fill")}
      </ScrollView>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.routesContainer}
        contentContainerStyle={styles.routes}
      >
        {routes.map((route) => (
          <TouchableOpacity
            key={route.id}
            style={[
              styles.routeCard,
              selectedRoute?.id === route.id && styles.routeCardActive,
            ]}
            onPress={() => setSelectedRoute(route)}
          >
            <ThemedText type="defaultSemiBold">{route.name}</ThemedText>
            <View style={styles.routeStats}>
              <View style={styles.routeStat}>
                <IconSymbol
                  name="ruler.fill"
                  size={16}
                  color={NUSColors.gray[500]}
                />
                <ThemedText style={styles.routeStatText}>
                  {route.distance.toFixed(1)} km
                </ThemedText>
              </View>
              <View style={styles.routeStat}>
                <IconSymbol
                  name="mountain.2.fill"
                  size={16}
                  color={NUSColors.gray[500]}
                />
                <ThemedText style={styles.routeStatText}>
                  {route.elevation}m
                </ThemedText>
              </View>
              <View style={styles.routeStat}>
                <IconSymbol
                  name="person.3.fill"
                  size={16}
                  color={NUSColors.gray[500]}
                />
                <ThemedText style={styles.routeStatText}>
                  {route.completions}
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  filtersContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
  },
  filters: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButtonActive: {
    backgroundColor: NUSColors.blue,
  },
  filterText: {
    color: NUSColors.gray[600],
    fontSize: 14,
    fontWeight: "600",
  },
  filterTextActive: {
    color: NUSColors.white,
  },
  routesContainer: {
    position: "absolute",
    bottom: 100,
    left: 0,
    right: 0,
  },
  routes: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 16,
  },
  routeCard: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 16,
    borderRadius: 12,
    width: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeCardActive: {
    backgroundColor: NUSColors.blue,
  },
  routeStats: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  routeStat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  routeStatText: {
    fontSize: 12,
    color: NUSColors.gray[500],
  },
});
