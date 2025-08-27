import { Tabs } from "expo-router";
import React from "react";
import { Platform, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { NUSColors } from "@/src/theme/colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const TabBackground = () => (
    <BlurView
      intensity={100}
      style={StyleSheet.absoluteFill}
      tint={isDark ? "dark" : "light"}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: isDark ? NUSColors.orange : NUSColors.blue,
        tabBarInactiveTintColor: NUSColors.gray[500],
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBackground,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              backgroundColor: "transparent",
            },
            android: {
              backgroundColor: isDark
                ? "rgba(0,0,0,0.8)"
                : "rgba(255,255,255,0.8)",
            },
          }),
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: isDark ? NUSColors.gray[800] : NUSColors.gray[200],
          height: 88,
          paddingBottom: Platform.OS === "ios" ? 34 : 16,
          paddingTop: 12,
        },
        tabBarLabelStyle: {
          fontWeight: "600",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="maps"
        options={{
          title: "Maps",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="map.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          title: "Record",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={32}
              name="plus.circle.fill"
              color={isDark ? NUSColors.orange : NUSColors.blue}
            />
          ),
          tabBarIconStyle: {
            marginTop: -16,
          },
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Community",
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="person.3.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={28}
              name="person.crop.circle.fill"
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
