import React from "react";
import { View, Text, Pressable } from "react-native";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  title,
  subtitle,
  onBack,
  right,
}) => (
  <View className="px-5 pb-2 pt-1">
    <View className="flex-row items-center">
      {onBack ? (
        <Pressable
          onPress={onBack}
          className="mr-2 h-9 w-9 items-center justify-center rounded-full bg-white"
          style={{ borderWidth: 1, borderColor: "#f1f2f5" }}
          hitSlop={8}
        >
          <Text className="text-[18px] font-bold text-dark">‹</Text>
        </Pressable>
      ) : null}
      <View className="flex-1">
        <Text className="text-[26px] font-extrabold tracking-tight text-dark">
          {title}
        </Text>
        {subtitle ? (
          <Text className="text-[13px] font-medium text-muted">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {right}
    </View>
  </View>
);

export default ScreenHeader;
