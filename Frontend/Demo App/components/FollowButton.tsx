import React from "react";
import { Pressable, Text } from "react-native";

interface FollowButtonProps {
  followed: boolean;
  onPress: () => void;
  size?: "sm" | "md";
}

const FollowButton: React.FC<FollowButtonProps> = ({
  followed,
  onPress,
  size = "sm",
}) => {
  const isMd = size === "md";
  return (
    <Pressable
      onPress={onPress}
      className={`items-center justify-center rounded-full ${
        followed ? "bg-dark" : "bg-primary"
      } ${isMd ? "px-5 py-2.5" : ""}`}
      style={
        isMd
          ? undefined
          : { width: 32, height: 32 }
      }
    >
      <Text
        className={`font-bold text-white ${
          isMd ? "text-[13px] tracking-wide" : "text-[16px]"
        }`}
      >
        {isMd ? (followed ? "Following ✓" : "Follow +") : followed ? "✓" : "+"}
      </Text>
    </Pressable>
  );
};

export default FollowButton;
