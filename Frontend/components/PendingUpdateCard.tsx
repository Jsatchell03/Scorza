import React from "react";
import { View, Text, Pressable } from "react-native";
import { PendingUpdate, Team } from "../types";
import { formatRelative } from "./formatters";

interface PendingUpdateCardProps {
  update: PendingUpdate;
  home: Team;
  away: Team;
  currentHomeScore: number;
  currentAwayScore: number;
  onConfirm: () => void;
  onDismiss: () => void;
}

const PendingUpdateCard: React.FC<PendingUpdateCardProps> = ({
  update,
  home,
  away,
  currentHomeScore,
  currentAwayScore,
  onConfirm,
  onDismiss,
}) => {
  const homeDelta = update.proposedHomeScore - currentHomeScore;
  const awayDelta = update.proposedAwayScore - currentAwayScore;

  const formatDelta = (n: number) =>
    n === 0 ? "no change" : n > 0 ? `+${n}` : `${n}`;

  return (
    <View
      className="mb-3 rounded-2xl bg-white p-4"
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
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-[11px] font-bold uppercase tracking-wider text-muted">
          Fan proposal
        </Text>
        <Text className="text-[11px] font-medium text-muted">
          {formatRelative(update.timestamp)}
        </Text>
      </View>

      <View className="flex-row items-end justify-center">
        <View className="flex-1 items-center">
          <Text
            className="text-[11px] font-semibold text-muted"
            numberOfLines={1}
          >
            {home.shortName}
          </Text>
          <Text className="text-[32px] font-extrabold leading-none text-dark">
            {update.proposedHomeScore}
          </Text>
          <Text
            className={`mt-1 text-[11px] font-semibold ${
              homeDelta > 0
                ? "text-primary"
                : homeDelta < 0
                ? "text-dark"
                : "text-muted"
            }`}
          >
            {formatDelta(homeDelta)}
          </Text>
        </View>
        <Text className="mx-2 pb-1.5 text-[22px] font-bold text-muted">–</Text>
        <View className="flex-1 items-center">
          <Text
            className="text-[11px] font-semibold text-muted"
            numberOfLines={1}
          >
            {away.shortName}
          </Text>
          <Text className="text-[32px] font-extrabold leading-none text-dark">
            {update.proposedAwayScore}
          </Text>
          <Text
            className={`mt-1 text-[11px] font-semibold ${
              awayDelta > 0
                ? "text-primary"
                : awayDelta < 0
                ? "text-dark"
                : "text-muted"
            }`}
          >
            {formatDelta(awayDelta)}
          </Text>
        </View>
      </View>

      <View className="mt-4 flex-row">
        <Pressable
          onPress={onDismiss}
          className="mr-2 flex-1 items-center justify-center rounded-xl bg-hairline py-2.5"
        >
          <Text className="text-[13px] font-semibold text-dark">Dismiss</Text>
        </Pressable>
        <Pressable
          onPress={onConfirm}
          className="flex-1 items-center justify-center rounded-xl bg-primary py-2.5"
        >
          <Text className="text-[13px] font-bold text-white">Confirm</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default PendingUpdateCard;
