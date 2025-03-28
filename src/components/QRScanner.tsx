// QRScanner.tsx
import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { CameraView, Camera } from "expo-camera";

type QRScannerProps = {
  onScan: (value: string) => void;
  onClose: () => void;
};

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onClose }) => {
  const cameraRef = useRef<CameraView>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    console.log("✅ Scanned QR:", data);
    if (data) {
      onScan(data);
      onClose();
    }
  };

  if (hasPermission === false) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={{ color: "#fff" }}>No access to camera</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        isActive
        onBarcodeScanned={handleBarCodeScanned}
      />

      <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 10,
    borderRadius: 10,
  },
  closeText: {
    color: "white",
    fontWeight: "bold",
  },
});
