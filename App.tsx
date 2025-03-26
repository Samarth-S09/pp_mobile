'use client';

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from './src/config/firebase';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import NavScreen from './src/screens/NavScreen';
import MarketScreen from './src/screens/Home';
import CommunityScreen from './src/screens/CommunityScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ChatbotScreen from './src/screens/ChatbotScreen';
import ChatScreen from './src/screens/ChatScreen';
import RemixIcon from "react-native-remix-icon"; // ✅ Import Remix Icons


// ✅ Import Animatable for Animations
import * as Animatable from 'react-native-animatable';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  const [animationKey, setAnimationKey] = useState(0); // ✅ Force animation update
  const [activeTab, setActiveTab] = useState("Home"); // ✅ Track active tab

  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        headerShown: false, // Hide individual screen headers in tab navigator
        tabBarIcon: ({ focused }) => {
          let iconName: string = "";

          if (route.name === "Home") {
            iconName = "home-9-fill"; // ✅ Correct Remix Icon
          } else if (route.name === "Navigation") {
            iconName = "ri-map-pin-line"; // ✅ Correct Remix Icon
          } else if (route.name === "Community") {
            iconName = "ri-wechat-line"; // ✅ Correct Remix Icon
          } else if (route.name === "Profile") {
            iconName = "user-3-fill"; // ✅ Correct Remix Icon
          }

          return (
            <TouchableOpacity
              onPress={() => {
                if (route.name === activeTab) {
                  setAnimationKey((prev) => prev + 1); // ✅ Reanimate only if already active
                }
                setActiveTab(route.name);
                navigation.navigate(route.name);
              }}
              activeOpacity={1}
            >
              <Animatable.View
                key={animationKey} // ✅ Ensures animation only when needed
                animation={route.name === activeTab ? "zoomIn" : undefined} // ✅ Animate only if tab is already selected
                duration={600}
              >
                <View style={focused ? styles.activeTabWrapper : styles.inactiveTab}>
                  <View style={focused ? styles.activeTab : styles.inactiveTab}>
                    <RemixIcon name={iconName} size={focused ? 28 : 24} color={focused ? "#FFFFFF" : "#B0B0B0"} />
                  </View>
                </View>
              </Animatable.View>
            </TouchableOpacity>
          );
        },
        tabBarLabel: ({ focused }) =>
          focused ? <Text style={styles.activeLabel}>{route.name}</Text> : null,
        tabBarActiveTintColor: "#ff7300",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBar,
      })}
    >
      {/* Removed SellScreen */}
      <Tab.Screen name="Home" component={MarketScreen} />
      <Tab.Screen name="Navigation" component={NavScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};


const App = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          headerShown: route.name !== "Login" && route.name !== "Signup",
          headerStyle: { backgroundColor: "#A3CB38", elevation: 2 },
          headerTitleAlign: "center",
        })}
      >
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
            <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen name="Chatbot" component={ChatbotScreen} />

          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// 🎨 Updated Styles for Chatbot Button & Tabs
const styles = StyleSheet.create({
  chatbotButton: {
    marginRight: 15,
    backgroundColor: "#ff7300",
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 2, height: 2 },
  },
  tabBar: {
    backgroundColor: "#FFFFFF",
    height: 80,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
    shadowOpacity: 0.1,
    position: "absolute",
    paddingTop: 12,
    bottom: 0,
    left: 0,
    right: 0,
  },
  activeTabWrapper: {
    top: -20,
  },
  activeTab: {
    backgroundColor: "#ff7300",
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    borderWidth: 2,
    borderColor: "#E56700",
  },
  inactiveTab: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  activeLabel: {
    fontSize: 10,
    fontWeight: 600,
    color: "#ff7300",
    marginTop: 4,
    textAlign: "center",
  },
});

export default App;
