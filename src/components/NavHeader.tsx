import React, { useState, useCallback, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StatusBar, StyleSheet, Image, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as IntentLauncher from "expo-intent-launcher";
import { useFocusEffect } from "@react-navigation/native";
import { Camera, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

type NavHeaderProps = {
  onQRScan: () => void;
};

const NavHeader: React.FC<NavHeaderProps> = ({ onQRScan }) => {
  const [station, setStation] = useState<string>("Select Station");
  const [cameraVisible, setCameraVisible] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const cameraRef = useRef<CameraView>(null);

  useFocusEffect(
    useCallback(() => {
      const getStation = async () => {
        const savedStation = await AsyncStorage.getItem("selectedStation");
        if (savedStation) setStation(savedStation);
      };
      getStation();
    }, [])
  );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const launchUnityApp = () => {
    IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
      packageName: "com.yourcompany.unityapp",
    });
  };

  const openCamera = () => {
    setCameraVisible(true);
  };

  const closeCamera = () => {
    setCameraVisible(false);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    setCameraVisible(false);
  };

  const openDefaultCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Camera permission is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log("Captured image:", result.assets[0].uri);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />

      {cameraVisible && hasPermission && (
        <View style={styles.cameraContainer}>
          <CameraView
            ref={cameraRef}
            style={styles.camera}
            barcodeScannerSettings={{
              barcodeTypes: ["qr"],
            }}
            isActive={true}
            onBarcodeScanned={handleBarCodeScanned}
          />
          {/* Close Camera Button */}
          <TouchableOpacity style={styles.closeButton} onPress={closeCamera}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.headerContainer}>
        {/* QR Code Scanner Button */}
        <TouchableOpacity style={styles.iconButton} onPress={onQRScan}>
          <Image source={require("../logo_asset/qrcode.png")} style={styles.icon} />
        </TouchableOpacity>

        {/* Station Name Container */}
        <View style={styles.stationContainer}>
          <Text style={styles.stationText}>{station}</Text>
        </View>

        {/* Language Button */}
        <TouchableOpacity style={styles.iconButton}>
          <Image source={require("../logo_asset/language.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 10,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
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
