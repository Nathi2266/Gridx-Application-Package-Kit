// screens/HomeTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardPage from './DashboardPage';
import TopUpScreen from './TopUpScreen';
import ImpactPage from './ImpactPage';
import ForumPage from './ForumPage';
import SettingsPage from './SettingsPage';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName = 'apps';
          if (route.name === 'Dashboard') iconName = 'speedometer';
          if (route.name === 'TopUp') iconName = 'cash';
          if (route.name === 'Impact') iconName = 'leaf';
          if (route.name === 'Forum') iconName = 'chatbubbles';
          if (route.name === 'Settings') iconName = 'settings';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardPage} />
      <Tab.Screen name="TopUp" component={TopUpScreen} />
      <Tab.Screen name="Impact" component={ImpactPage} />
      <Tab.Screen name="Forum" component={ForumPage} />
      <Tab.Screen name="Settings" component={SettingsPage} />
    </Tab.Navigator>
  );
}
