import React from "react";
import { View, Text } from "react-native";

interface TeamBadgeProps {
  shortName: string;
  color: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const SIZES: Record<
  NonNullable<TeamBadgeProps["size"]>,
  { box: number; font: number; radius: number }
> = {
  sm: { box: 32, font: 11, radius: 10 },
  md: { box: 44, font: 13, radius: 14 },
  lg: { box: 56, font: 15, radius: 18 },
  xl: { box: 72, font: 18, radius: 22 },
};

const TeamBadge: React.FC<TeamBadgeProps> = ({
  shortName,
  color,
  size = "md",
}) => {
  const { box, font, radius } = SIZES[size];
  return (
    <View
      style={{
        width: box,
        height: box,
        borderRadius: radius,
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: color,
        shadowOpacity: 0.18,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      <Text
        style={{
          color: "#fff",
          fontSize: font,
          fontWeight: "800",
          letterSpacing: 0.5,
        }}
      >
        {shortName}
      </Text>
    </View>
  );
};

export default TeamBadge;
