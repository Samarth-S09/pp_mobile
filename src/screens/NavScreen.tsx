import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
} from "react-native";
import NavHeader from "../components/NavHeader";
import StationMap from "../components/StationMap";
import { coordinates } from "../data/coordinates";
import { stationGraph } from "../data/stationgraph";
import { dijkstra } from "../utils/dijkstra";
import { Picker } from "@react-native-picker/picker";
import QRScanner from "../components/QRScanner";

const menuItems = [
  { label: "Platform 1 (Upper)", value: "up1" },
  { label: "Platform 2 (Upper)", value: "up2" },
  { label: "Platform 3 (Upper)", value: "up3" },
  { label: "Platform 4 (Upper)", value: "up4" },
  { label: "Platform 1 (Lower)", value: "lp1" },
  { label: "Platform 2 (Lower)", value: "lp2" },
  { label: "Platform 3 (Lower)", value: "lp3" },
  { label: "Platform 4 (Lower)", value: "lp4" },
  { label: "Ticket Counter 1", value: "tc1" },
  { label: "Ticket Counter 2", value: "tc2" },
  { label: "Waiting Room", value: "wtrm" },
  { label: "Washroom", value: "wsrm" },
  { label: "Escalator 1", value: "esc1" },
  { label: "Escalator 2", value: "esc2" },
  { label: "Escalator 3", value: "esc3" },
  { label: "Escalator 4", value: "esc4" },
  { label: "Escalator 5", value: "esc5" },
  { label: "Elevator", value: "elv" },
  { label: "Kiosk", value: "kiosk" },
  { label: "Station Master", value: "stm" },
  { label: "Bus Station", value: "bus_st" },
  { label: "Parking", value: "pkng" },
  { label: "East Exit 1", value: "enex_e1" },
  { label: "East Exit 2", value: "enex_e2" },
  { label: "West Exit", value: "enex_w" },
  { label: "Food Court", value: "fd_ct" },
  { label: "Taxi/Auto Stand", value: "autost" },
];

const NavScreen = () => {
  const [fromNode, setFromNode] = useState("default_from");
  const [toNode, setToNode] = useState("default_to");
  const [qrVisible, setQRVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const path = dijkstra(stationGraph, fromNode, toNode);

  return (
  <View style={{ flex: 1 }}>
    {/* 🎉 Modal shown on screen load */}
    <Modal visible={showPopup} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalEmoji}>📍</Text>
          <Text style={styles.modalTitle}>Instant Location</Text>
          <Text style={styles.modalMessage}>Use the QR button to fetch your live location instantly!</Text>
        </View>
      </View>
    </Modal>


    <ScrollView style={styles.container}>
      <NavHeader onQRScan={() => setQRVisible(true)} />
      <View style={styles.mapContainer}>
      <StationMap
        path={path}
        coordinates={coordinates}
        fromNode={fromNode}
        toNode={toNode}
        onReset={() => {
          setFromNode("");
          setToNode("");
          console.log("🔄 Map + dropdowns reset.");
        }}
      />
      </View>

      <Text style={styles.label}>From:</Text>
      <Picker
        selectedValue={fromNode}
        onValueChange={(value) => setFromNode(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select your Location" value="" />
        {menuItems.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>


      <Text style={styles.label}>To:</Text>
      <Picker
        selectedValue={toNode}
        onValueChange={(value) => setToNode(value)}
        style={styles.picker}
      >
        <Picker.Item label="Select your Destination" value="" />
        {menuItems.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
      </Picker>

    </ScrollView>
     {/* ✅ Overlay QR Scanner */}
     {qrVisible && (
      <QRScanner
        onScan={(scannedValue) => {
          setFromNode(scannedValue); // update from picker
          setQRVisible(false);
          console.log("FROM updated:", scannedValue);
        }}
        onClose={() => setQRVisible(false)}
      />
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapContainer: {
    marginTop: -15,
    marginBottom: -65,
    height: 500,
    borderRadius: 20,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 10,
  },
  picker: {
    marginHorizontal: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  
  modalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 25,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  
  modalEmoji: {
    fontSize: 42,
    marginBottom: 10,
  },
  
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  
});

export default NavScreen;
