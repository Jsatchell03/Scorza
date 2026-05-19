import React from "react";
import { View, Text, Pressable } from "react-native";
import { Fixture } from "../types";
import { getLeagueById, getTeamById } from "../data/mockData";
import TeamBadge from "./TeamBadge";
import StatusBadge from "./StatusBadge";
import { formatFixtureDate } from "./formatters";

interface FixtureCardProps {
  fixture: Fixture;
  onPress?: () => void;
}

const FixtureCard: React.FC<FixtureCardProps> = ({ fixture, onPress }) => {
  const home = getTeamById(fixture.homeTeamId);
  const away = getTeamById(fixture.awayTeamId);
  const league = getLeagueById(fixture.leagueId);
  if (!home || !away || !league) return null;

  const isPast = fixture.status === "past";
  const isLive = fixture.status === "live";
  const isUpcoming = fixture.status === "upcoming";
  const homeWon = isPast && fixture.homeScore > fixture.awayScore;
  const awayWon = isPast && fixture.awayScore > fixture.homeScore;

  return (
    <Pressable
      onPress={onPress}
      className="mb-3 rounded-2xl bg-white px-4 py-4"
      style={{
        shadowColor: "#143355",
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
        borderWidth: 1,
        borderColor: "#f1f2f5",
      }}
    >
      <View className="mb-3 flex-row items-center justify-between">
        <View className="flex-shrink">
          <Text
            className="text-[12px] font-semibold tracking-wide text-muted"
            numberOfLines={1}
          >
            {league.name.toUpperCase()}
          </Text>
          {fixture.venue ? (
            <Text className="text-[11px] text-muted/80" numberOfLines={1}>
              {fixture.venue}
            </Text>
          ) : null}
        </View>
        <StatusBadge status={fixture.status} period={fixture.period} />
      </View>

      <View className="flex-row items-center">
        <View className="flex-1 flex-row items-center">
          <TeamBadge
            shortName={home.shortName}
            color={home.color}
            badgeUrl={home.badge_url}
            size="md"
          />
          <View className="ml-3 flex-1">
            <Text
              className={`text-[15px] ${
                homeWon ? "font-extrabold text-dark" : "font-semibold text-dark"
              }`}
              numberOfLines={1}
            >
              {home.name}
            </Text>
            <Text className="text-[11px] text-muted">Home</Text>
          </View>
        </View>

        {isUpcoming ? null : (
          <Text
            className={`ml-3 ${
              homeWon ? "text-[26px]" : "text-[24px]"
            } font-bold ${homeWon ? "text-dark" : "text-dark/80"}`}
          >
            {fixture.homeScore}
          </Text>
        )}
      </View>

      <View className="mt-3 flex-row items-center">
        <View className="flex-1 flex-row items-center">
          <TeamBadge
            shortName={away.shortName}
            color={away.color}
            badgeUrl={away.badge_url}
            size="md"
          />
          <View className="ml-3 flex-1">
            <Text
              className={`text-[15px] ${
                awayWon ? "font-extrabold text-dark" : "font-semibold text-dark"
              }`}
              numberOfLines={1}
            >
              {away.name}
            </Text>
            <Text className="text-[11px] text-muted">Away</Text>
          </View>
        </View>

        {isUpcoming ? null : (
          <Text
            className={`ml-3 ${
              awayWon ? "text-[26px]" : "text-[24px]"
            } font-bold ${awayWon ? "text-dark" : "text-dark/80"}`}
          >
            {fixture.awayScore}
          </Text>
        )}
      </View>

      <View className="mt-3 border-t border-hairline pt-3">
        {isLive ? (
          <View className="flex-row items-center justify-between">
            <Text className="text-[12px] font-medium text-muted">
              {fixture.pendingUpdates.length > 0
                ? `${fixture.pendingUpdates.length} pending update${
                    fixture.pendingUpdates.length === 1 ? "" : "s"
                  }`
                : "Live from fans"}
            </Text>
            <Text className="text-[12px] font-semibold text-primary">
              Tap to track →
            </Text>
          </View>
        ) : isUpcoming ? (
          <Text className="text-[12px] font-medium text-dark">
            {formatFixtureDate(fixture.startTime)}
          </Text>
        ) : (
          <View className="flex-row items-center justify-between">
            <Text className="text-[12px] font-medium text-muted">
              {formatFixtureDate(fixture.startTime)}
            </Text>
            <Text className="text-[12px] font-semibold text-dark">
              {homeWon
                ? `${home.name} win`
                : awayWon
                ? `${away.name} win`
                : "Draw"}
            </Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default FixtureCard;
