import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, FlatList, Image, Alert } from "react-native";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Linking } from 'react-native';

const stations = [
  "CSMT",
  "Dadar",
  "Ulhasnagar",
  "Andheri",
  "Thane",
  "Kalyan",
  "Vashi",
  "Panvel",
  "Ghatkopar",
  "Mulund",
  "Vikhroli",
  "Mira Road",
  "",
];

const MarketScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  // Filter stations based on search input
  const filteredStations = stations.filter((station) =>
    station.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleStationSelect = async (station: string) => {
    await AsyncStorage.setItem("selectedStation", station);
    navigation.navigate("Navigation", { selectedStation: station });
  };   

  const openIRCTC = async () => {
    const packageName = "cris.org.in.prs.ima";
    const playStoreUrl = "https://play.google.com/store/apps/details?id=" + packageName;
  
    try {
      const supported = await Linking.canOpenURL(`intent://#Intent;package=${packageName};end`);
      if (supported) {
        await Linking.openURL(`intent://#Intent;package=${packageName};end`);
      } else {
        await Linking.openURL(playStoreUrl);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to open IRCTC app.");
    }
  };

  const openConfirmTKT = async () => {
    const packageName = "com.confirmtkt.lite";
    const playStoreUrl = "https://play.google.com/store/apps/details?id=" + packageName;
  
    try {
      const supported = await Linking.canOpenURL(`intent://#Intent;package=${packageName};end`);
      if (supported) {
        await Linking.openURL(`intent://#Intent;package=${packageName};end`);
      } else {
        await Linking.openURL(playStoreUrl);
      }
    } catch (error) {
      Alert.alert("Error", "Unable to open ConfirmTKT app.");
    }
  };
  

  return (
    <View style={styles.container}>
      <Header />

      {/* Top Buttons */}
      <View style={styles.buttonContainer}>
        {/* IRCTC */}
        <TouchableOpacity onPress={openIRCTC}>
          <View style={styles.iconBlock}>
            <View style={styles.iconSquare}>
              <Image
                source={require("../../assets/irctc.png")}
                style={styles.buttonImage}
              />
            </View>
            <Text style={styles.buttonLabel}>IRCTC{"\n"}App</Text>
          </View>
        </TouchableOpacity>


        {/* CONFIRMTKT */}
        <TouchableOpacity onPress={openConfirmTKT}>
          <View style={styles.iconBlock}>
            <View style={styles.iconSquare}>
              <Image
                source={require("../../assets/confirmtkt.png")}
                style={styles.buttonImage}
              />
            </View>
            <Text style={styles.buttonLabel}>CONFIRM{"\n"}TKT</Text>
          </View>
        </TouchableOpacity>


        {/* PravasiConnect */}
        <View style={styles.iconBlock}>
          <View style={styles.iconSquare}>
            <Image
              source={require("../../assets/pconnect.png")}
              style={styles.buttonImage}
            />
          </View>
          <Text style={styles.buttonLabel}>Pravasi{"\n"}Connect</Text>
        </View>
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
    marginBottom: 70,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  iconBlock: {
    alignItems: "center",
  },
  iconSquare: {
    width: 80,
    height: 80,
    backgroundColor: "#FFFFFF",
    borderColor: "#E56700",
    borderWidth: 2,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonImage: {
    width: 55,
    height: 55,
    resizeMode: "contain",
  },
  buttonLabel: {
    marginTop: 8,
    color: "#E56700",
    fontWeight: "bold",
    fontSize: 14,
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
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  
  cancelButton: {
    marginLeft: 10,
    fontSize: 20,
    color: "#E56700",
    fontWeight: "bold",
  },
  
});

export default MarketScreen;