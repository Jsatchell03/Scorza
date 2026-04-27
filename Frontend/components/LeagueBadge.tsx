import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import { Sport } from "../types";

const SPORT_GLYPH: Record<Sport, string> = {
  Football: "⚽",
  Basketball: "🏀",
  "American Football": "🏈",
  Baseball: "⚾",
  Rugby: "🏉"
};

interface LeagueBadgeProps {
  sport: Sport;
  color: string;
  badgeUrl?: string;
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
  badgeUrl,
  size = "md",
}) => {
  const { box, font, radius } = SIZES[size];
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [badgeUrl]);

  const showImage = badgeUrl != undefined && !errored;
  return (
    <View
      style={{
        width: box,
        height: box,
        borderRadius: radius,
        backgroundColor: showImage ? "#ffffff" : color,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {showImage ? (
        <Image
          source={{ uri: badgeUrl }}
          style={{ width: box, height: box }}
          resizeMode="contain"
          onError={(e) => {setErrored(true)
          }}

        />
      ) : (
        <Text style={{ fontSize: font }}>{SPORT_GLYPH[sport]}</Text>
      )}
    </View>
  );
};

export default LeagueBadge;
