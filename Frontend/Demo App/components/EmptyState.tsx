import React from "react";
import { View, Text } from "react-native";

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  icon?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle, icon }) => (
  <View className="items-center justify-center rounded-2xl border border-dashed border-hairline bg-white/60 px-6 py-10">
    {icon ? <Text className="mb-2 text-[28px]">{icon}</Text> : null}
    <Text className="text-center text-[15px] font-semibold text-dark">
      {title}
    </Text>
    {subtitle ? (
      <Text className="mt-1 text-center text-[12px] text-muted">
        {subtitle}
      </Text>
    ) : null}
  </View>
);

export default EmptyState;
