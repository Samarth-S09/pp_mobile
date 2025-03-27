import React from "react";
import { View, Text, TouchableOpacity, StatusBar, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as IntentLauncher from "expo-intent-launcher";

const NavHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const selectedStation = route.params?.selectedStation || "Select Station";

  const launchUnityApp = () => {
    IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
      packageName: "com.yourcompany.unityapp", // 🔁 Replace with your actual Unity APK package name
    });
  };

  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      <View style={styles.headerContainer}>
        {/* Language Button */}
        <TouchableOpacity style={styles.langButton}>
          <Text style={styles.langText}>🌐</Text>
        </TouchableOpacity>

        {/* Station Name in Center */}
        <Text style={styles.stationText}>{selectedStation}</Text>

        {/* 3D View Launcher */}
        <TouchableOpacity style={styles.unityButton} onPress={launchUnityApp}>
          <Text style={styles.unityText}>3D</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 12,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  langButton: {
    backgroundColor: "#F3F3F3",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E56700",
  },
  langText: {
    fontSize: 16,
    color: "#E56700",
  },
  stationText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#E56700",
  },
  unityButton: {
    backgroundColor: "#E56700",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  unityText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default NavHeader;
