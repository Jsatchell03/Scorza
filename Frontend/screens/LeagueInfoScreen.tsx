import React, { useMemo, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useApp } from "../context/AppContext";
import { getLeagueById, teams as allTeams } from "../data/mockData";
import { RootStackParamList } from "../types";
import LeagueBadge from "../components/LeagueBadge";
import FollowButton from "../components/FollowButton";
import SegmentedToggle from "../components/SegmentedToggle";
import FixtureCard from "../components/FixtureCard";
import TeamCard from "../components/TeamCard";
import ScreenHeader from "../components/ScreenHeader";
import EmptyState from "../components/EmptyState";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rte = RouteProp<RootStackParamList, "LeagueInfo">;
type Tab = "upcoming" | "past";

const LeagueInfoScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rte>();
  const { leagueId } = route.params;
  const { fixtures, followedLeagueIds, toggleFollowLeague } = useApp();
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<Tab>("upcoming");

  const league = getLeagueById(leagueId);

  const visibleFixtures = useMemo(() => {
    if (!league) return [];
    const leagueFixtures = fixtures.filter((f) => f.leagueId === league.id);
    if (tab === "upcoming") {
      return leagueFixtures
        .filter((f) => f.status !== "past")
        .sort((a, b) => {
          if (a.status === "live" && b.status !== "live") return -1;
          if (b.status === "live" && a.status !== "live") return 1;
          return a.startTime - b.startTime;
        });
    }
    return leagueFixtures
      .filter((f) => f.status === "past")
      .sort((a, b) => b.startTime - a.startTime);
  }, [fixtures, league, tab]);

  const leagueTeams = useMemo(
    () => (league ? allTeams.filter((t) => t.leagueId === league.id) : []),
    [league]
  );

  if (!league) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <ScreenHeader title="League" onBack={() => navigation.goBack()} />
        <View className="flex-1 items-center justify-center px-5">
          <EmptyState title="League not found" />
        </View>
      </SafeAreaView>
    );
  }

  const followed = followedLeagueIds.has(league.id);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScreenHeader title="League" onBack={() => navigation.goBack()} />

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
            <LeagueBadge
              sport={league.sport}
              color={league.color}
              badgeUrl={league.badge_url}
              size="lg"
            />
            <Text className="mt-3 text-[22px] font-extrabold text-dark">
              {league.name}
            </Text>
            <Text className="mt-0.5 text-[12px] font-medium text-muted">
              {league.sport} · {league.country}
            </Text>
            <View className="mt-4">
              <FollowButton
                followed={followed}
                onPress={() => toggleFollowLeague(league.id)}
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
          {visibleFixtures.length === 0 ? (
            <EmptyState
              icon={tab === "upcoming" ? "📅" : "🏁"}
              title={
                tab === "upcoming"
                  ? "No upcoming fixtures"
                  : "No past fixtures"
              }
            />
          ) : (
            visibleFixtures.map((f) => (
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

        {leagueTeams.length > 0 ? (
          <View className="px-5 pt-2">
            <Text className="mb-2 text-[12px] font-bold uppercase tracking-wider text-muted">
              Teams in {league.name}
            </Text>
            {leagueTeams.map((t) => (
              <TeamCard
                key={t.id}
                team={t}
                onPress={() =>
                  navigation.navigate("TeamInfo", { teamId: t.id })
                }
              />
            ))}
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LeagueInfoScreen;
