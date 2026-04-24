import React, { useMemo, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useApp } from "../context/AppContext";
import FixtureCard from "../components/FixtureCard";
import SegmentedToggle from "../components/SegmentedToggle";
import ScreenHeader from "../components/ScreenHeader";
import EmptyState from "../components/EmptyState";
import { RootStackParamList } from "../types";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Tab = "upcoming" | "past";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const { fixtures } = useApp();
  const [tab, setTab] = useState<Tab>("upcoming");

  const { liveCount, visible } = useMemo(() => {
    const sorted = [...fixtures];
    if (tab === "upcoming") {
      const pool = sorted.filter(
        (f) => f.status === "live" || f.status === "upcoming"
      );
      pool.sort((a, b) => {
        if (a.status === "live" && b.status !== "live") return -1;
        if (b.status === "live" && a.status !== "live") return 1;
        return a.startTime - b.startTime;
      });
      return {
        liveCount: fixtures.filter((f) => f.status === "live").length,
        visible: pool,
      };
    }
    const pool = sorted.filter((f) => f.status === "past");
    pool.sort((a, b) => b.startTime - a.startTime);
    return {
      liveCount: fixtures.filter((f) => f.status === "live").length,
      visible: pool,
    };
  }, [fixtures, tab]);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScreenHeader
        title="Scorza"
        subtitle={
          liveCount > 0
            ? `${liveCount} match${liveCount === 1 ? "" : "es"} live right now`
            : "Live, fan-driven scores"
        }
      />

      <View className="px-5 pb-2 pt-2">
        <SegmentedToggle<Tab>
          value={tab}
          options={[
            { label: "Upcoming", value: "upcoming" },
            { label: "Past", value: "past" },
          ]}
          onChange={setTab}
        />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 16, paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        {tab === "upcoming" && liveCount > 0 ? (
          <View className="mb-2 flex-row items-center">
            <View className="mr-2 h-2 w-2 rounded-full bg-primary" />
            <Text className="text-[12px] font-bold uppercase tracking-wider text-primary">
              Live now
            </Text>
          </View>
        ) : null}

        {visible.length === 0 ? (
          <EmptyState
            icon={tab === "upcoming" ? "📅" : "🏁"}
            title={
              tab === "upcoming"
                ? "No upcoming fixtures"
                : "No past fixtures yet"
            }
            subtitle="Check back soon — new matches drop daily."
          />
        ) : (
          visible.map((f) => (
            <FixtureCard
              key={f.id}
              fixture={f}
              onPress={() =>
                navigation.navigate("FixtureInfo", { fixtureId: f.id })
              }
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
