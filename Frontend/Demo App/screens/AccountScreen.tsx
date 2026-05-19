import React from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import ScreenHeader from "../components/ScreenHeader";
import { useApp } from "../context/AppContext";

const Stat: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <View
    className="mr-3 flex-1 rounded-2xl bg-white px-4 py-4"
    style={{ borderWidth: 1, borderColor: "#f1f2f5" }}
  >
    <Text className="text-[24px] font-extrabold text-dark">{value}</Text>
    <Text className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
      {label}
    </Text>
  </View>
);

const Row: React.FC<{ label: string; value?: string; icon: string }> = ({
  label,
  value,
  icon,
}) => (
  <View
    className="mb-2 flex-row items-center rounded-2xl bg-white px-4 py-4"
    style={{ borderWidth: 1, borderColor: "#f1f2f5" }}
  >
    <View className="mr-3 h-9 w-9 items-center justify-center rounded-xl bg-dark-soft">
      <Text className="text-[16px]">{icon}</Text>
    </View>
    <Text className="flex-1 text-[14px] font-semibold text-dark">{label}</Text>
    {value ? (
      <Text className="text-[13px] font-medium text-muted">{value}</Text>
    ) : (
      <Text className="text-[16px] text-muted">›</Text>
    )}
  </View>
);

const AccountScreen: React.FC = () => {
  const { followedTeamIds, followedLeagueIds, fixtures } = useApp();
  const tabBarHeight = useBottomTabBarHeight();
  const pending = fixtures.reduce((n, f) => n + f.pendingUpdates.length, 0);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={["top"]}>
      <ScreenHeader title="Account" subtitle="Your fan profile" />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 12,
          paddingBottom: tabBarHeight + 24,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="mb-5 flex-row items-center rounded-3xl bg-white px-5 py-5"
          style={{ borderWidth: 1, borderColor: "#f1f2f5" }}
        >
          <View
            className="mr-4 h-16 w-16 items-center justify-center rounded-2xl bg-dark"
          >
            <Text className="text-[22px] font-extrabold text-white">SF</Text>
          </View>
          <View className="flex-1">
            <Text className="text-[18px] font-extrabold text-dark">
              Superfan
            </Text>
            <Text className="mt-0.5 text-[12px] font-medium text-muted">
              Demo profile · Joined this season
            </Text>
          </View>
        </View>

        <View className="mb-5 flex-row">
          <Stat label="Teams" value={followedTeamIds.size} />
          <Stat label="Leagues" value={followedLeagueIds.size} />
          <View className="flex-1">
            <View
              className="rounded-2xl bg-white px-4 py-4"
              style={{ borderWidth: 1, borderColor: "#f1f2f5" }}
            >
              <Text className="text-[24px] font-extrabold text-primary">
                {pending}
              </Text>
              <Text className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-muted">
                Pending
              </Text>
            </View>
          </View>
        </View>

        <Text className="mb-2 text-[12px] font-bold uppercase tracking-wider text-muted">
          Preferences
        </Text>
        <Row label="Notifications" icon="🔔" value="On" />
        <Row label="Appearance" icon="🎨" value="Light" />
        <Row label="Language" icon="🌐" value="English" />

        <Text className="mb-2 mt-4 text-[12px] font-bold uppercase tracking-wider text-muted">
          About
        </Text>
        <Row label="Help & Support" icon="💬" />
        <Row label="Privacy" icon="🔒" />
        <Row label="Version" icon="ℹ️" value="1.0.0" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;
