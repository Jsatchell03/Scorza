import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useApp } from "../context/AppContext";
import { getLeagueById, getTeamById } from "../data/mockData";
import { RootStackParamList } from "../types";
import TeamBadge from "../components/TeamBadge";
import StatusBadge from "../components/StatusBadge";
import ScoreUpdateModal from "../components/ScoreUpdateModal";
import PendingUpdateCard from "../components/PendingUpdateCard";
import EmptyState from "../components/EmptyState";
import ScreenHeader from "../components/ScreenHeader";
import { formatFixtureDate } from "../components/formatters";

type Nav = NativeStackNavigationProp<RootStackParamList>;
type Rte = RouteProp<RootStackParamList, "FixtureInfo">;

const FixtureInfoScreen: React.FC = () => {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Rte>();
  const { fixtureId } = route.params;
  const { getFixtureById, addPendingUpdate, confirmPendingUpdate, dismissPendingUpdate } =
    useApp();
  const [modalVisible, setModalVisible] = useState(false);

  const fixture = getFixtureById(fixtureId);

  if (!fixture) {
    return (
      <SafeAreaView className="flex-1 bg-background">
        <ScreenHeader title="Fixture" onBack={() => navigation.goBack()} />
        <View className="flex-1 items-center justify-center px-5">
          <EmptyState title="Fixture not found" subtitle="It may have ended." />
        </View>
      </SafeAreaView>
    );
  }

  const home = getTeamById(fixture.homeTeamId)!;
  const away = getTeamById(fixture.awayTeamId)!;
  const league = getLeagueById(fixture.leagueId)!;

  const isLive = fixture.status === "live";
  const isPast = fixture.status === "past";
  const isUpcoming = fixture.status === "upcoming";

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScreenHeader title="Fixture" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={{ paddingBottom: isLive ? 120 : 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5">
          <View
            className="rounded-3xl bg-white px-5 pb-5 pt-4"
            style={{
              shadowColor: "#143355",
              shadowOpacity: 0.08,
              shadowRadius: 14,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
              borderWidth: 1,
              borderColor: "#f1f2f5",
            }}
          >
            <View className="mb-4 flex-row items-center justify-between">
              <Pressable
                onPress={() =>
                  navigation.navigate("LeagueInfo", { leagueId: league.id })
                }
                className="flex-shrink"
              >
                <Text className="text-[12px] font-bold uppercase tracking-wider text-dark">
                  {league.name}
                </Text>
                {fixture.venue ? (
                  <Text className="text-[11px] text-muted">
                    {fixture.venue}
                  </Text>
                ) : null}
              </Pressable>
              <StatusBadge status={fixture.status} period={fixture.period} />
            </View>

            <View className="flex-row items-center">
              <Pressable
                onPress={() =>
                  navigation.navigate("TeamInfo", { teamId: home.id })
                }
                className="flex-1 items-center"
              >
                <TeamBadge
                  shortName={home.shortName}
                  color={home.color}
                  size="xl"
                />
                <Text
                  className="mt-3 text-center text-[15px] font-bold text-dark"
                  numberOfLines={1}
                >
                  {home.name}
                </Text>
                <Text className="text-[11px] font-medium text-muted">
                  Home
                </Text>
              </Pressable>

              <View className="mx-2 items-center">
                {isUpcoming ? (
                  <Text className="text-[22px] font-bold text-muted">VS</Text>
                ) : (
                  <View className="flex-row items-end">
                    <Text className="text-[48px] font-extrabold leading-none text-dark">
                      {fixture.homeScore}
                    </Text>
                    <Text className="mx-2 pb-2 text-[28px] font-bold text-muted">
                      –
                    </Text>
                    <Text className="text-[48px] font-extrabold leading-none text-dark">
                      {fixture.awayScore}
                    </Text>
                  </View>
                )}
              </View>

              <Pressable
                onPress={() =>
                  navigation.navigate("TeamInfo", { teamId: away.id })
                }
                className="flex-1 items-center"
              >
                <TeamBadge
                  shortName={away.shortName}
                  color={away.color}
                  size="xl"
                />
                <Text
                  className="mt-3 text-center text-[15px] font-bold text-dark"
                  numberOfLines={1}
                >
                  {away.name}
                </Text>
                <Text className="text-[11px] font-medium text-muted">
                  Away
                </Text>
              </Pressable>
            </View>

            <View className="mt-5 border-t border-hairline pt-4">
              <Text className="text-center text-[12px] font-medium text-muted">
                {isPast
                  ? `Final · ${formatFixtureDate(fixture.startTime)}`
                  : isLive
                  ? "Live · Scores are fan-verified in real time"
                  : `Kick-off · ${formatFixtureDate(fixture.startTime)}`}
              </Text>
            </View>
          </View>
        </View>

        {isLive ? (
          <View className="mt-6 px-5">
            <View className="mb-2 flex-row items-center justify-between">
              <Text className="text-[12px] font-bold uppercase tracking-wider text-muted">
                Pending updates
              </Text>
              <Text className="text-[12px] font-semibold text-muted">
                {fixture.pendingUpdates.length}
              </Text>
            </View>

            {fixture.pendingUpdates.length === 0 ? (
              <EmptyState
                icon="📡"
                title="No pending updates"
                subtitle="Be the first to propose a score update."
              />
            ) : (
              fixture.pendingUpdates.map((u) => (
                <PendingUpdateCard
                  key={u.id}
                  update={u}
                  home={home}
                  away={away}
                  currentHomeScore={fixture.homeScore}
                  currentAwayScore={fixture.awayScore}
                  onConfirm={() => confirmPendingUpdate(fixture.id, u.id)}
                  onDismiss={() => dismissPendingUpdate(fixture.id, u.id)}
                />
              ))
            )}
          </View>
        ) : (
          <View className="mt-6 px-5">
            <Text className="mb-2 text-[12px] font-bold uppercase tracking-wider text-muted">
              Match info
            </Text>
            <View
              className="rounded-2xl bg-white px-4 py-4"
              style={{ borderWidth: 1, borderColor: "#f1f2f5" }}
            >
              <InfoRow label="Competition" value={league.name} />
              <Divider />
              <InfoRow label="Sport" value={league.sport} />
              <Divider />
              <InfoRow
                label={isPast ? "Played" : "Kick-off"}
                value={formatFixtureDate(fixture.startTime)}
              />
              {fixture.venue ? (
                <>
                  <Divider />
                  <InfoRow label="Venue" value={fixture.venue} />
                </>
              ) : null}
            </View>
          </View>
        )}
      </ScrollView>

      {isLive ? (
        <View
          className="absolute inset-x-0 bottom-0 px-5 pb-6 pt-3"
          style={{
            backgroundColor: "rgba(253,252,251,0.95)",
            borderTopWidth: 1,
            borderTopColor: "#f1f2f5",
          }}
        >
          <Pressable
            onPress={() => setModalVisible(true)}
            className="items-center justify-center rounded-2xl bg-primary py-4"
            style={{
              shadowColor: "#fd4902",
              shadowOpacity: 0.25,
              shadowRadius: 12,
              shadowOffset: { width: 0, height: 6 },
              elevation: 4,
            }}
          >
            <Text className="text-[15px] font-bold text-white">
              Submit Score Update
            </Text>
          </Pressable>
        </View>
      ) : null}

      <ScoreUpdateModal
        visible={modalVisible}
        fixture={fixture}
        onClose={() => setModalVisible(false)}
        onSubmit={(h, a) => {
          addPendingUpdate(fixture.id, h, a);
          setModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
};

const InfoRow: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <View className="flex-row items-center justify-between py-2">
    <Text className="text-[12px] font-semibold text-muted">{label}</Text>
    <Text className="text-[13px] font-semibold text-dark">{value}</Text>
  </View>
);

const Divider = () => <View className="h-px bg-hairline" />;

export default FixtureInfoScreen;
