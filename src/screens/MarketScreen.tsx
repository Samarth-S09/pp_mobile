import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList, Image, Alert } from "react-native";
import Header from "../components/Header";

const stations = [
  "Chhatrapati Shivaji Maharaj Terminus",
  "Dadar",
  "Bandra",
  "Andheri",
  "Borivali",
  "Thane",
  "Kalyan",
  "Vashi",
  "Panvel",
  "Kurla",
  "Ghatkopar",
  "Mulund",
  "Vikhroli",
  "Chembur",
  "Mira Road",
];

const MarketScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  // Filter stations based on search input
  const filteredStations = stations.filter((station) =>
    station.toLowerCase().includes(searchText.toLowerCase())
  );

  // Handle station selection
  const handleStationSelect = (station: string) => {
    setSearchText(station); // Set the selected station in the search bar
    navigation.navigate("Home", { selectedStation: station }); // Navigate to HomeScreen with the selected station
  };

  return (
    <View style={styles.container}>
      <Header />

      {/* Top Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../../assets/confirmtkt.png")} // Replace with your IRCTC image path
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>IRCTC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../../assets/confirmtkt.png")} // Replace with your CONFIRMTKT image path
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>CONFIRMTKT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image
            source={require("../../assets/pconnect.png")} // Replace with your PRAVASICONNECT image path
            style={styles.buttonImage}
          />
          <Text style={styles.buttonText}>PRAVASICONNECT</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Select your station"
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Scrollable List of Stations */}
      <FlatList
        data={filteredStations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleStationSelect(item)}>
            <View style={styles.stationItem}>
              <Text style={styles.stationText}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#A3CB38",
    width: 100, // Square button
    height: 100, // Square button
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10, // Slightly rounded corners
    elevation: 2,
  },
  buttonImage: {
    width: 50, // Adjust image size
    height: 50, // Adjust image size
    marginBottom: 5, // Space between image and text
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: "#333",
    elevation: 2,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  stationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  stationText: {
    fontSize: 16,
    color: "#333",
  },
});

export default MarketScreen;