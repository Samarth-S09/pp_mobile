import React, { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Header from "../components/Header";

const amenities = [
  "Elevators",
  "Escalators",
  "Platforms",
  "Parking",
  "Medical Room",
  "Washrooms",
  "Station Master",
  "Food Court",
  "Bridges",
];

const NavScreen = ({ route }: { route: any }) => {
  const { selectedStation } = route.params || {}; // Get the selected station from route params
  const [fromAmenity, setFromAmenity] = useState<string | null>(null);
  const [toAmenity, setToAmenity] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Header />
      {selectedStation && (
        <View style={styles.stationContainer}>
          <Text style={styles.stationText}>Selected Station: {selectedStation}</Text>
        </View>
      )}

      {/* Map Window Section */}
      <View style={styles.mapContainer}>
        <Image
          source={require("../../assets/KalwaMapMobile.png")} // Add the map image
          style={styles.mapImage}
          resizeMode="contain" // Ensure the image fits within the container
        />
      </View>

      {/* From Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>From:</Text>
        <Picker
          selectedValue={fromAmenity}
          style={styles.picker}
          onValueChange={(itemValue: string) => setFromAmenity(itemValue)}
        >
          <Picker.Item label="Select an amenity" value={null} />
          {amenities.map((amenity) => (
            <Picker.Item key={amenity} label={amenity} value={amenity} />
          ))}
        </Picker>
      </View>

      {/* To Field */}
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldLabel}>To:</Text>
        <Picker
          selectedValue={toAmenity}
          style={styles.picker}
          onValueChange={(itemValue: string) => setToAmenity(itemValue)}
        >
          <Picker.Item label="Select an amenity" value={null} />
          {amenities.map((amenity) => (
            <Picker.Item key={amenity} label={amenity} value={amenity} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  stationContainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#FFF8E1",
    borderLeftWidth: 4,
    borderLeftColor: "#E56700",
    marginHorizontal: 20,
    borderRadius: 8,
  },
  stationText: {
    fontSize: 16,
    color: "#E56700",
    fontWeight: "bold",
  },  
  mapContainer: {
    marginTop: 20,
    height: 300, // Increased height to fit the image
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    marginHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  mapImage: {
    width: "100%", // Make the image fit the container width
    height: "100%", // Make the image fit the container height
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
    flex: 1, // Push the label to the left
  },
  picker: {
    flex: 2, // Make the picker take more space
    height: 50,
  },
});

export default NavScreen;