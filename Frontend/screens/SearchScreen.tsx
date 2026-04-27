import React, { useMemo, useState } from "react";
import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { leagues, teams } from "../data/mockData";
import TeamCard from "../components/TeamCard";
import LeagueCard from "../components/LeagueCard";
import ScreenHeader from "../components/ScreenHeader";
import EmptyState from "../components/EmptyState";
import { RootStackParamList } from "../types";

type Nav = NativeStackNavigationProp<RootStackParamList>;

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const tabBarHeight = useBottomTabBarHeight();
  const [query, setQuery] = useState("");

  const { filteredTeams, filteredLeagues } = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { filteredTeams: teams, filteredLeagues: leagues };
    return {
      filteredTeams: teams.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortName.toLowerCase().includes(q) ||
          t.sport.toLowerCase().includes(q)
      ),
      filteredLeagues: leagues.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.sport.toLowerCase().includes(q) ||
          l.country.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  const total = filteredTeams.length + filteredLeagues.length;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScreenHeader title="Search" subtitle="Find teams and leagues" />

      <View className="px-5 pb-2 pt-1">
        <View
          className="flex-row items-center rounded-2xl bg-white px-4 py-3"
          style={{ borderWidth: 1, borderColor: "#f1f2f5" }}
        >
          <Text className="mr-2 text-[16px]">🔎</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search teams, leagues, sports…"
            placeholderTextColor="#8a94a6"
            className="flex-1 text-[15px] text-dark"
            autoCorrect={false}
            autoCapitalize="none"
          />
          {query.length > 0 ? (
            <Pressable onPress={() => setQuery("")} hitSlop={6}>
              <Text className="ml-2 text-[13px] font-semibold text-muted">
                Clear
              </Text>
            </Pressable>
          ) : null}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: tabBarHeight + 24,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {total === 0 ? (
          <EmptyState
            icon="🧐"
            title="No matches"
            subtitle={`Nothing found for "${query}".`}
          />
        ) : (
          <>
            {filteredLeagues.length > 0 ? (
              <>
                <SectionHeader
                  label="Popular Leagues"
                  
                />
                {filteredLeagues.map((l) => (
                  <LeagueCard
                    key={l.id}
                    league={l}
                    onPress={() =>
                      navigation.navigate("LeagueInfo", { leagueId: l.id })
                    }
                  />
                ))}
              </>
            ) : null}
            {filteredTeams.length > 0 ? (
              <>
                <SectionHeader label="Popular Teams"  />
                {filteredTeams.map((t) => (
                  <TeamCard
                    key={t.id}
                    team={t}
                    onPress={() =>
                      navigation.navigate("TeamInfo", { teamId: t.id })
                    }
                  />
                ))}
              </>
            ) : null}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const SectionHeader: React.FC<{ label: string}> = ({
  label,
}) => (
  <View className="mb-2 mt-1 flex-row items-center justify-between">
    <Text className="text-[12px] font-bold uppercase tracking-wider text-muted">
      {label}
    </Text>
  </View>
);

export default SearchScreen;
