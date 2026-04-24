import React from "react";
import { View, Text } from "react-native";
import { Sport } from "../types";

const SPORT_GLYPH: Record<Sport, string> = {
  Football: "⚽",
  Basketball: "🏀",
  "American Football": "🏈",
  Baseball: "⚾",
};

interface LeagueBadgeProps {
  sport: Sport;
  color: string;
  size?: "sm" | "md" | "lg";
}

const SIZES = {
  sm: { box: 32, font: 16, radius: 10 },
  md: { box: 44, font: 20, radius: 14 },
  lg: { box: 56, font: 24, radius: 18 },
};

const LeagueBadge: React.FC<LeagueBadgeProps> = ({
  sport,
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
      }}
    >
      <Text style={{ fontSize: font }}>{SPORT_GLYPH[sport]}</Text>
    </View>
  );
};

export default LeagueBadge;
