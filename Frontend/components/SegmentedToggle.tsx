import React from "react";
import { View, Text, Pressable } from "react-native";

interface SegmentedToggleProps<T extends string> {
  value: T;
  options: { label: string; value: T }[];
  onChange: (value: T) => void;
}

function SegmentedToggle<T extends string>({
  value,
  options,
  onChange,
}: SegmentedToggleProps<T>) {
  return (
    <View className="flex-row rounded-2xl bg-hairline p-1">
      {options.map((opt) => {
        const selected = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            className={`flex-1 items-center justify-center rounded-xl py-2 ${
              selected ? "bg-white" : ""
            }`}
            style={
              selected
                ? {
                    shadowColor: "#143355",
                    shadowOpacity: 0.08,
                    shadowRadius: 6,
                    shadowOffset: { width: 0, height: 2 },
                    elevation: 1,
                  }
                : undefined
            }
          >
            <Text
              className={`text-sm font-semibold ${
                selected ? "text-dark" : "text-muted"
              }`}
            >
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default SegmentedToggle;
