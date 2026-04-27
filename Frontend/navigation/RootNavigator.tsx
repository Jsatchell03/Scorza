import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabNavigator from "./TabNavigator";
import FixtureInfoScreen from "../screens/FixtureInfoScreen";
import TeamInfoScreen from "../screens/TeamInfoScreen";
import LeagueInfoScreen from "../screens/LeagueInfoScreen";
import { RootStackParamList } from "../types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: "#fdfcfb" },
      animation: "slide_from_right",
    }}
  >
    <Stack.Screen name="Tabs" component={TabNavigator} />
    <Stack.Screen name="FixtureInfo" component={FixtureInfoScreen} />
    <Stack.Screen name="TeamInfo" component={TeamInfoScreen} />
    <Stack.Screen name="LeagueInfo" component={LeagueInfoScreen} />
  </Stack.Navigator>
);

export default RootNavigator;
