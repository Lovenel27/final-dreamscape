import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function BeachDetails() {
  const { place } = useLocalSearchParams();
  const router = useRouter();

  const data = {
    Boracay: [
      {
        name: "White Beach",
        description: "Known for its powdery white sand and clear turquoise waters — Boracay’s most popular beach.",
        image: require("../assets/images/white.jpg"),
      },
      {
        name: "Puka Beach",
        description: "A quiet beach covered with crushed puka shells — perfect for relaxation away from crowds.",
        image: require("../assets/images/puka.jpg"),
      },
      {
        name: "Diniwid Beach",
        description: "A small and peaceful cove near White Beach, great for sunset views.",
        image: require("../assets/images/diniwid.jpg"),
      },
      {
        name: "Bulabog Beach",
        description: "The best spot for kiteboarding and windsurfing on the island.",
        image: require("../assets/images/bulabog.jpg"),
      },
      {
        name: "Ilig-Iligan Beach",
        description: "A hidden gem with rock formations and crystal-clear water ideal for snorkeling.",
        image: require("../assets/images/iligan.jpg"),
      },
    ],

    Palawan: [
      {
        name: "El Nido Beach",
        description: "Famous for limestone cliffs, lagoons, and turquoise waters.",
        image: require("../assets/images/elnido.jpg"),
      },
      {
        name: "Nacpan Beach",
        description: "A long stretch of golden sand perfect for swimming and relaxation.",
        image: require("../assets/images/nacpan.jpg"),
      },
      {
        name: "Las Cabañas Beach",
        description: "A popular sunset spot with beach bars and zipline adventures.",
        image: require("../assets/images/cabanas.jpg"),
      },
    ],

    Siargao: [
      {
        name: "Cloud 9",
        description: "A world-famous surfing spot with perfect barrel waves.",
        image: require("../assets/images/cloud.jpg"),
      },
      {
        name: "Magpupungko Rock Pools",
        description: "Natural tidal pools that appear during low tide — perfect for swimming.",
        image: require("../assets/images/magpupungko.jpg"),
      },
      {
        name: "Daku Island Beach",
        description: "A calm, scenic island beach known for its white sand and local hospitality.",
        image: require("../assets/images/daku.jpg"),
      },
    ],

    Bohol: [
      {
        name: "Alona Beach",
        description: "A lively beach with restaurants, nightlife, and great diving spots.",
        image: require("../assets/images/alona.jpg"),
      },
      {
        name: "Dumaluan Beach",
        description: "Quieter than Alona, ideal for families and relaxation.",
        image: require("../assets/images/dumaluan.jpg"),
      },
      {
        name: "Anda Beach",
        description: "A hidden paradise known for its long stretch of white sand and clear waters.",
        image: require("../assets/images/anda.jpg"),
      },
    ],
  };

  const beaches = data[place];

  if (!beaches) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No beach details found for this destination.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>{place} Famous Beaches</Text>

      {beaches.map((beach, index) => (
        <View key={index} style={styles.card}>
          <Image source={beach.image} style={styles.image} resizeMode="cover" />
          <Text style={styles.title}>{beach.name}</Text>
          <Text style={styles.description}>{beach.description}</Text>
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
