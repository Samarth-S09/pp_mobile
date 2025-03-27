import React from "react";
import { View, Image, TouchableOpacity, StatusBar, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RemixIcon from "react-native-remix-icon"; // ✅ Import Remix Icons

const Header = () => {
  const navigation = useNavigation();

  return (
    <>
      {/* ✅ Status Bar with background matching header */}
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      
      <View style={styles.headerContainer}>
        {/* ✅ Logo Instead of "Hello User" */}
        <Image 
          source={require("../logo_asset/pravasi_path_logo.png")} // Ensure this path is correct
          style={styles.logo}
        />

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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,  // ✅ Reduced padding to bring the logo closer
    paddingTop: 15,
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 20,
    zIndex: 100, // ✅ Ensures it stays on top of all screens
    borderBottomRightRadius: 20,
    elevation: 5,

    // ✅ iOS Shadow
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  logo: {
    width: 220, // Adjust width as needed
    height: 60, // Adjust height as needed
    resizeMode: "contain",
  },
  
  icon: {
    width: 22,
    height: 22,
    resizeMode: "contain",
    tintColor: "#fff",
  },
  iconButton: {
    backgroundColor: "#ff7300",
    padding: 10,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: "#E56700",
  },
});

export default Header;
