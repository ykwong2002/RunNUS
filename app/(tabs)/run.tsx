import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import MapView, { Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NUSColors } from "@/src/theme/colors";
import {
  calculateDistance,
  formatDuration,
  calculatePace,
} from "@/src/utils/run";

type Coordinate = {
  latitude: number;
  longitude: number;
  timestamp: number;
};

export default function RunScreen() {
  const [isRunning, setIsRunning] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinate[]>([]);
  const [duration, setDuration] = useState(0);
  const [locationSubscription, setLocationSubscription] =
    useState<Location.LocationSubscription | null>(null);
  const [timer, setTimer] = useState<ReturnType<typeof setInterval> | null>(
    null
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  const startRun = async () => {
    const location = await Location.getCurrentPositionAsync({});
    const initialCoordinate: Coordinate = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      timestamp: Date.now(),
    };

    setCoordinates([initialCoordinate]);
    setIsRunning(true);

    const subscription = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.BestForNavigation,
        distanceInterval: 10, // Update every 10 meters
        timeInterval: 1000, // Or every second
      },
      (location) => {
        setCoordinates((prevCoordinates) => [
          ...prevCoordinates,
          {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            timestamp: Date.now(),
          },
        ]);
      }
    );

    setLocationSubscription(subscription);

    const timerInterval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    setTimer(timerInterval);
  };

  const stopRun = () => {
    if (locationSubscription) {
      locationSubscription.remove();
    }
    if (timer) {
      clearInterval(timer);
    }
    setIsRunning(false);
    // Here you would typically save the run data to Firebase
  };

  const distance = calculateDistance(coordinates);
  const pace = calculatePace(distance, duration);

  return (
    <ThemedView style={styles.container}>
      <MapView style={styles.map} showsUserLocation followsUserLocation>
        {coordinates.length > 0 && (
          <Polyline
            coordinates={coordinates}
            strokeColor={NUSColors.blue}
            strokeWidth={3}
          />
        )}
      </MapView>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <ThemedText type="defaultSemiBold">Distance</ThemedText>
          <ThemedText type="title">{distance.toFixed(2)} km</ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText type="defaultSemiBold">Duration</ThemedText>
          <ThemedText type="title">{formatDuration(duration)}</ThemedText>
        </View>
        <View style={styles.stat}>
          <ThemedText type="defaultSemiBold">Pace</ThemedText>
          <ThemedText type="title">{pace}/km</ThemedText>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isRunning && styles.buttonStop]}
        onPress={isRunning ? stopRun : startRun}
      >
        <ThemedText style={styles.buttonText}>
          {isRunning ? "Stop Run" : "Start Run"}
        </ThemedText>
      </TouchableOpacity>
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
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: NUSColors.white,
    borderTopWidth: 1,
    borderTopColor: NUSColors.gray[200],
  },
  stat: {
    alignItems: "center",
  },
  button: {
    backgroundColor: NUSColors.blue,
    margin: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonStop: {
    backgroundColor: NUSColors.orange,
  },
  buttonText: {
    color: NUSColors.white,
    fontSize: 18,
    fontWeight: "600",
  },
});
