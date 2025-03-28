import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
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
  const [fromNode, setFromNode] = useState("");
  const [toNode, setToNode] = useState("");
  const [qrVisible, setQRVisible] = useState(false);


  const path = dijkstra(stationGraph, fromNode, toNode);

  return (
  <View style={{ flex: 1 }}>
    <ScrollView style={styles.container}>
      <NavHeader onQRScan={() => setQRVisible(true)} />
      <View style={styles.mapContainer}>
        <StationMap path={path} coordinates={coordinates} />
      </View>

      <Text style={styles.label}>From:</Text>
      <Picker
        selectedValue={fromNode}
        onValueChange={(value) => setFromNode(value)}
        style={styles.picker}
      >
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
});

export default NavScreen;
