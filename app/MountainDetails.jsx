import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function MountainsDetails() {
  const { place } = useLocalSearchParams();
  const router = useRouter();

  const data = {
    "Baguio City": [
      {
        name: "Burnham Park",
        description: "A relaxing park with a lagoon where visitors can go boating and biking.",
        image: require("../assets/images/burnham.jpg"),
      },
      {
        name: "Mines View Park",
        description: "Offers breathtaking views of the mountains and old mining sites.",
        image: require("../assets/images/mines.jpg"),
      },
      {
        name: "Camp John Hay",
        description: "A scenic mountain resort known for its pine trees and cool air.",
        image: require("../assets/images/camp.jpg"),
      },
    ],

    "Bohol Highlands": [
      {
        name: "Chocolate Hills",
        description: "Over 1,200 cone-shaped hills that turn brown in the dry season.",
        image: require("../assets/images/bohol.jpg"),
      },
      {
        name: "Sagbayan Peak",
        description: "A viewing deck that provides a panoramic view of the Chocolate Hills.",
        image: require("../assets/images/sagbayan.jpg"),
      },
      {
        name: "Loboc Highlands",
        description: "A scenic area known for river cruises and lush landscapes.",
        image: require("../assets/images/loboc.jpg"),
      },
    ],

    "Palawan Mountains": [
      {
        name: "Mount Mantalingajan",
        description: "The highest mountain in Palawan, known for its biodiversity and hiking trails.",
        image: require("../assets/images/mantalingajan.jpg"),
      },
      {
        name: "El Nido Cliffs",
        description: "Towering limestone formations that offer spectacular views and climbs.",
        image: require("../assets/images/cliff.jpg"),
      },
      {
        name: "Puerto Princesa Highlands",
        description: "A scenic mountain area offering views of the city and the sea.",
        image: require("../assets/images/palawan.jpg"),
      },
    ],

    "Siargao Hills": [
      {
        name: "Coconut Mountain View",
        description: "An iconic viewpoint overlooking Siargao’s lush coconut fields.",
        image: require("../assets/images/coconut.jpg"),
      },
      {
        name: "Sugba Lagoon Hills",
        description: "Green hills surrounding the crystal-clear waters of Sugba Lagoon.",
        image: require("../assets/images/sugba.jpg"),
      },
      {
        name: "TakTak Falls Hilltop",
        description: "A scenic spot that combines waterfalls and forested hills.",
        image: require("../assets/images/taktak.jpg"),
      },
    ],
  };

  const spots = data[place];

  if (!spots) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No details found for this destination.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{place} Famous Spots</Text>

      {spots.map((spot, index) => (
        <View key={index} style={styles.card}>
          <Image source={spot.image} style={styles.image} resizeMode="cover" />
          <Text style={styles.title}>{spot.name}</Text>
          <Text style={styles.description}>{spot.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#EAF6FF", alignItems: "center" },
  backButton: {
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  backButtonText: { color: "#023e8a", fontWeight: "bold" },
  header: { fontSize: 24, fontWeight: "bold", color: "#00509E", marginBottom: 20, textAlign: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: "95%",
    marginBottom: 20,
    alignItems: "center",
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: { width: 250, height: 180, borderRadius: 12, alignSelf: "center", marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold", color: "#023e8a", marginBottom: 6, textAlign: "center" },
  description: { fontSize: 14, color: "#555", textAlign: "center", lineHeight: 20, marginBottom: 10 },
  button: {
    backgroundColor: "#0077b6",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
//
