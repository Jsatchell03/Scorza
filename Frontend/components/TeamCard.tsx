import React from "react";
import { View, Text, Pressable } from "react-native";
import { Team } from "../types";
import TeamBadge from "./TeamBadge";
import FollowButton from "./FollowButton";
import { useApp } from "../context/AppContext";

interface TeamCardProps {
  team: Team;
  onPress?: () => void;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, onPress }) => {
  const { followedTeamIds, toggleFollowTeam } = useApp();
  const followed = followedTeamIds.has(team.id);

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
      <TeamBadge
        shortName={team.shortName}
        color={team.color}
        badgeUrl={team.badge_url}
        size="md"
      />
      <View className="ml-3 flex-1">
        <Text className="text-[15px] font-semibold text-dark" numberOfLines={1}>
          {team.name}
        </Text>
        <Text className="text-[11px] font-medium text-muted">
          {team.sport} · Team
        </Text>
      </View>
      <FollowButton
        followed={followed}
        onPress={() => toggleFollowTeam(team.id)}
      />
    </Pressable>
  );
};

export default TeamCard;
