import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as IntentLauncher from "expo-intent-launcher";
import { useFocusEffect } from "@react-navigation/native";

const NavHeader = () => {
  const [station, setStation] = useState("Select Station");

  useFocusEffect(
    useCallback(() => {
      const getStation = async () => {
        const savedStation = await AsyncStorage.getItem("selectedStation");
        if (savedStation) setStation(savedStation);
      };
      getStation();
    }, [])
  );

  const launchUnityApp = () => {
    IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
      packageName: "com.yourcompany.unityapp",
    });
  };

  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      <View style={styles.headerContainer}>
        {/* Language Button */}
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require("../logo_asset/qrcode.png")}
            style={styles.icon}
          />
        </TouchableOpacity>

        {/* Station Name Container */}
        <View style={styles.stationContainer}>
          <Text style={styles.stationText}>{station}</Text>
        </View>

        {/* Language Button */}
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require("../logo_asset/language.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  iconButton: {
    backgroundColor: "#ff7300",
    padding: 10,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#E56700",
  },
  iconText: {
    color: "#fff",
    fontWeight: "bold",
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: "#fff",
  },
  stationContainer: {
    backgroundColor: "#ddd",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 50,
    borderWidth: 2,
  },
  stationText: {
    color: "#060606",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NavHeader;