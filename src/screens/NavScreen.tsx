import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import NavHeader from "../components/NavHeader"; // ✅ Updated header

const amenities = [
  "Elevators", "Escalators", "Platforms", "Parking", "Medical Room",
  "Washrooms", "Station Master", "Food Court", "Bridges",
];

const NavScreen = ({ route }: { route: any }) => {
  const { selectedStation } = route.params || {};
  const [fromAmenity, setFromAmenity] = useState<string | null>(null);
  const [toAmenity, setToAmenity] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <NavHeader />

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <Image
          source={require("../../assets/KalwaMapMobile.png")}
          style={styles.mapImage}
          resizeMode="contain"
        />
      </View>

      {/* From */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>From:</Text>
        <Picker
          selectedValue={fromAmenity}
          style={styles.picker}
          onValueChange={(val: string) => setFromAmenity(val)}
        >
          <Picker.Item label="Select an amenity" value={null} />
          {amenities.map((a) => <Picker.Item key={a} label={a} value={a} />)}
        </Picker>
      </View>

      {/* To */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>To:</Text>
        <Picker
          selectedValue={toAmenity}
          style={styles.picker}
          onValueChange={(val: string) => setToAmenity(val)}
        >
          <Picker.Item label="Select an amenity" value={null} />
          {amenities.map((a) => <Picker.Item key={a} label={a} value={a} />)}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  stationContainer: {
    marginTop: 15,
    padding: 12,
    backgroundColor: "#FFF3E0",
    marginHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E56700",
  },
  stationText: {
    fontSize: 18,
    color: "#E56700",
    fontWeight: "bold",
  },
  mapContainer: {
    marginTop: 20,
    height: 450,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    padding: 10,
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginHorizontal: 20,
  },
  fieldLabel: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    flex: 1,
  },
  picker: {
    flex: 2,
    height: 50,
  },
});

export default NavScreen;
