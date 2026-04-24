import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import AccountScreen from "../screens/AccountScreen";
import { TabParamList } from "../types";

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICON: Record<keyof TabParamList, string> = {
  Home: "🏟",
  Search: "🔎",
  Account: "👤",
};

const TabIcon: React.FC<{ name: keyof TabParamList; focused: boolean }> = ({
  name,
  focused,
}) => (
  <View className="items-center justify-center">
    <Text
      style={{
        fontSize: 20,
        opacity: focused ? 1 : 0.55,
      }}
    >
      {TAB_ICON[name]}
    </Text>
    <Text
      style={{
        marginTop: 2,
        fontSize: 10,
        fontWeight: "700",
        letterSpacing: 0.3,
        color: focused ? "#fd4902" : "#8a94a6",
      }}
    >
      {name.toUpperCase()}
    </Text>
  </View>
);

const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#ffffff",
        borderTopColor: "#eef0f3",
        borderTopWidth: 1,
        height: 72,
        paddingTop: 8,
        paddingBottom: 10,
      },
      tabBarIcon: ({ focused }) => (
        <TabIcon name={route.name} focused={focused} />
      ),
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Search" component={SearchScreen} />
    <Tab.Screen name="Account" component={AccountScreen} />
  </Tab.Navigator>
);

export default TabNavigator;
