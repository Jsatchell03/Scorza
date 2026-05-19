import React, { useMemo, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useApp } from "../context/AppContext";
import { getLeagueById, getTeamById } from "../data/mockData";
import { RootStackParamList } from "../types";
import TeamBadge from "../components/TeamBadge";
import FollowButton from "../components/FollowButton";
import SegmentedToggle from "../components/SegmentedToggle";
import FixtureCard from "../components/FixtureCard";
import ScreenHeader from "../components/ScreenHeader";
import EmptyState from "../components/EmptyState";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rte = RouteProp<RootStackParamList, "TeamInfo">;
type Tab = "upcoming" | "past";

const TeamInfoScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rte>();
  const { teamId } = route.params;
  const { fixtures, followedTeamIds, toggleFollowTeam } = useApp();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>("upcoming");

  const team = getTeamById(teamId);
  const league = team ? getLeagueById(team.leagueId) : undefined;

  const visible = useMemo(() => {
    if (!team) return [];
    const teamFixtures = fixtures.filter(
      (f) => f.homeTeamId === team.id || f.awayTeamId === team.id
    );
    if (tab === "upcoming") {
      return teamFixtures
        .filter((f) => f.status !== "past")
        .sort((a, b) => {
          if (a.status === "live" && b.status !== "live") return -1;
          if (b.status === "live" && a.status !== "live") return 1;
          return a.startTime - b.startTime;
        });
    }
    return teamFixtures
      .filter((f) => f.status === "past")
      .sort((a, b) => b.startTime - a.startTime);
  }, [fixtures, team, tab]);

  if (!team) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <ScreenHeader title="Team" onBack={() => navigation.goBack()} />
        <View className="flex-1 items-center justify-center px-5">
          <EmptyState title="Team not found" />
        </View>
      </SafeAreaView>
    );
  }

  const followed = followedTeamIds.has(team.id);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScreenHeader title="Team" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 + insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5">
          <View
            className="items-center rounded-3xl bg-white px-5 pb-5 pt-6"
            style={{
              borderWidth: 1,
              borderColor: "#f1f2f5",
            }}
          >
            <TeamBadge
              shortName={team.shortName}
              color={team.color}
              badgeUrl={team.badge_url}
              size="xl"
            />
            <Text className="mt-3 text-[22px] font-extrabold text-dark">
              {team.name}
            </Text>
            <Text className="mt-0.5 text-[12px] font-medium text-muted">
              {team.sport} · {league?.name ?? ""}
            </Text>
            <View className="mt-4">
              <FollowButton
                followed={followed}
                onPress={() => toggleFollowTeam(team.id)}
                size="md"
              />
            </View>
          </View>
        </View>

        <View className="px-5 pt-5">
          <SegmentedToggle<Tab>
            value={tab}
            options={[
              { label: "Upcoming", value: "upcoming" },
              { label: "Past", value: "past" },
            ]}
            onChange={setTab}
          />
        </View>

        <View className="px-5 pt-4">
          {visible.length === 0 ? (
            <EmptyState
              icon={tab === "upcoming" ? "📅" : "🏁"}
              title={
                tab === "upcoming"
                  ? "No upcoming fixtures"
                  : "No past fixtures"
              }
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeamInfoScreen;
