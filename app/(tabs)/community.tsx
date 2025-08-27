import { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { NUSColors } from "@/src/theme/colors";
import { Collapsible } from "@/components/Collapsible";

type Community = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  type: "hostel" | "cca" | "faculty" | "interest";
};

const COMMUNITIES: Community[] = [
  {
    id: "1",
    name: "NUS Running Club",
    description:
      "Official running club of NUS. Weekly training sessions and monthly events.",
    memberCount: 120,
    type: "cca",
  },
  {
    id: "2",
    name: "Kent Ridge Hall Runners",
    description:
      "KR Hall running community. Morning runs and weekend long runs.",
    memberCount: 45,
    type: "hostel",
  },
  {
    id: "3",
    name: "Computing Night Runners",
    description: "SOC students who run at night to destress from coding.",
    memberCount: 67,
    type: "faculty",
  },
  {
    id: "4",
    name: "UTown Trail Runners",
    description: "Trail running group exploring UTown and Kent Ridge trails.",
    memberCount: 89,
    type: "interest",
  },
];

const CATEGORIES = [
  "All",
  "CCAs",
  "Hostels",
  "Faculties",
  "Interest Groups",
] as const;

export default function CommunityScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("All");

  const filteredCommunities = COMMUNITIES.filter((community) => {
    if (selectedCategory === "All") return true;
    const categoryMap = {
      CCAs: "cca",
      Hostels: "hostel",
      Faculties: "faculty",
      "Interest Groups": "interest",
    };
    return (
      community.type ===
      categoryMap[selectedCategory as keyof typeof categoryMap]
    );
  });

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={filteredCommunities}
        ListHeaderComponent={() => (
          <>
            <ThemedText type="title" style={styles.header}>
              Communities
            </ThemedText>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={CATEGORIES}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryButton,
                    selectedCategory === item && styles.categoryButtonActive,
                  ]}
                  onPress={() => setSelectedCategory(item)}
                >
                  <ThemedText
                    style={[
                      styles.categoryText,
                      selectedCategory === item && styles.categoryTextActive,
                    ]}
                  >
                    {item}
                  </ThemedText>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.categoryList}
            />
          </>
        )}
        renderItem={({ item }) => (
          <Collapsible title={item.name}>
            <ThemedText style={styles.description}>
              {item.description}
            </ThemedText>
            <ThemedText style={styles.memberCount}>
              {item.memberCount} members
            </ThemedText>
            <TouchableOpacity style={styles.joinButton}>
              <ThemedText style={styles.joinButtonText}>
                Join Community
              </ThemedText>
            </TouchableOpacity>
          </Collapsible>
        )}
        contentContainerStyle={styles.list}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 28,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  list: {
    padding: 16,
  },
  categoryList: {
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: NUSColors.gray[200],
  },
  categoryButtonActive: {
    backgroundColor: NUSColors.blue,
  },
  categoryText: {
    color: NUSColors.gray[700],
  },
  categoryTextActive: {
    color: NUSColors.white,
  },
  description: {
    marginBottom: 8,
    fontSize: 14,
    lineHeight: 20,
  },
  memberCount: {
    color: NUSColors.gray[600],
    marginBottom: 12,
  },
  joinButton: {
    backgroundColor: NUSColors.orange,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  joinButtonText: {
    color: NUSColors.white,
    fontWeight: "600",
  },
});
