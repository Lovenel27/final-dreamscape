import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Mountains() {
  const router = useRouter();

  const mountains = [
    {
      name: "Baguio City",
      description: "The 'Summer Capital of the Philippines', known for its cool climate and pine trees.",
      image: require("../assets/images/baguio.jpg"),
    },
    {
      name: "Bohol Highlands",
      description: "Home of the Chocolate Hills, a natural wonder of over 1,200 perfectly shaped hills.",
      image: require("../assets/images/bohol.jpg"),
    },
    {
      name: "Palawan Mountains",
      description: "Famous for limestone cliffs, rainforest trails, and breathtaking scenery.",
      image: require("../assets/images/palawan.jpg"),
    },
    {
      name: "Siargao Hills",
      description: "A paradise for nature lovers with rolling hills and panoramic ocean views.",
      image: require("../assets/images/siargao.png"),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>🏔️ Famous Mountain Escapes</Text>

      {mountains.map((mountain, index) => (
        <View key={index} style={styles.card}>
          <Image source={mountain.image} style={styles.image} resizeMode="cover" />
          <Text style={styles.title}>{mountain.name}</Text>
          <Text style={styles.description}>{mountain.description}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push({ pathname: "/MountainDetails", params: { place: mountain.name } })}
          >
            <Text style={styles.buttonText}>Explore More</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#EAF6FF", alignItems: "center" },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  backButtonText: { fontSize: 16, color: "#023e8a", fontWeight: "bold" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#00509E" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 24,
    width: "90%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    paddingVertical: 10,
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
