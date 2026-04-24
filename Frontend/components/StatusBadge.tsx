import React from "react";
import { View, Text } from "react-native";
import { FixtureStatus } from "../types";

interface StatusBadgeProps {
  status: FixtureStatus;
  period?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, period }) => {
  if (status === "live") {
    return (
      <View className="flex-row items-center self-start rounded-full bg-primary-soft px-2.5 py-1">
        <View className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
        <Text className="text-[11px] font-bold tracking-wider text-primary">
          LIVE
        </Text>
        {period ? (
          <Text className="ml-1.5 text-[11px] font-medium text-primary/80">
            · {period}
          </Text>
        ) : null}
      </View>
    );
  }
  if (status === "past") {
    return (
      <View className="self-start rounded-full bg-dark-soft px-2.5 py-1">
        <Text className="text-[11px] font-bold tracking-wider text-dark">
          FINAL
        </Text>
      </View>
    );
  }
  return (
    <View className="self-start rounded-full bg-hairline px-2.5 py-1">
      <Text className="text-[11px] font-bold tracking-wider text-muted">
        UPCOMING
      </Text>
    </View>
  );
};

export default StatusBadge;
