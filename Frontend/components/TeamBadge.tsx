import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

interface TeamBadgeProps {
  shortName: string;
  color: string;
  badgeUrl?: string;
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
  badgeUrl,
  size = "md",
}) => {
  const { box, font, radius } = SIZES[size];
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [badgeUrl]);

  const showImage = !!badgeUrl && !errored;

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
        shadowColor: showImage ? "#143355" : color,
        shadowOpacity: showImage ? 0.1 : 0.18,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
      }}
    >
      {showImage ? (
        <Image
          source={{ uri: badgeUrl }}
          style={{ width: box, height: box }}
          resizeMode="contain"
          onError={() => setErrored(true)}
        />
      ) : (
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
      )}
    </View>
  );
};

export default TeamBadge;
