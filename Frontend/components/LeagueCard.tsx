import React from "react";
import { View, Text, Pressable } from "react-native";
import { League } from "../types";
import LeagueBadge from "./LeagueBadge";
import FollowButton from "./FollowButton";
import { useApp } from "../context/AppContext";

interface LeagueCardProps {
  league: League;
  onPress?: () => void;
}

const LeagueCard: React.FC<LeagueCardProps> = ({ league, onPress }) => {
  const { followedLeagueIds, toggleFollowLeague } = useApp();
  const followed = followedLeagueIds.has(league.id);

  return (
    <Pressable
      onPress={onPress}
      className="mb-3 flex-row items-center rounded-2xl bg-white px-4 py-3"
      style={{
        shadowColor: "#143355",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
        borderWidth: 1,
        borderColor: "#f1f2f5",
      }}
    >
      <LeagueBadge
        sport={league.sport}
        color={league.color}
        badgeUrl={league.badge_url}
        size="md"
      />
      <View className="ml-3 flex-1">
        <Text className="text-[15px] font-semibold text-dark" numberOfLines={1}>
          {league.name}
        </Text>
        <Text className="text-[11px] font-medium text-muted">
          {league.sport} · League · {league.country}
        </Text>
      </View>
      <FollowButton
        followed={followed}
        onPress={() => toggleFollowLeague(league.id)}
      />
    </Pressable>
  );
};

export default LeagueCard;
