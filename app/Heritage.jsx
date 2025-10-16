import React from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Heritage() {
  const router = useRouter();

  const heritageSites = [
    {
      name: "Vigan City",
      description:
        "A UNESCO World Heritage Site known for its preserved Spanish colonial and Asian architecture along Calle Crisologo.",
      image: require("../assets/images/vigan.jpg"),
    },
    {
      name: "Intramuros, Manila",
      description:
        "The historic walled city of Manila, featuring Fort Santiago and San Agustin Church — reminders of Spanish influence.",
      image: require("../assets/images/intramuros.jpg"),
    },
    {
      name: "Banaue Rice Terraces",
      description:
        "An ancient engineering wonder carved into the mountains by the Ifugao people over 2,000 years ago.",
      image: require("../assets/images/banaue.jpg"),
    },
    {
      name: "Miagao Church, Iloilo",
      description:
        "A baroque-style church built in 1786, known for its detailed relief of St. Christopher carrying the Child Jesus.",
      image: require("../assets/images/miagao.jpg"),
    },
    {
      name: "Taal Heritage Town, Batangas",
      description:
        "A town filled with ancestral houses, the grand Taal Basilica, and centuries-old cultural heritage.",
      image: require("../assets/images/taal.jpg"),
    },
    {
      name: "Barasoain Church, Bulacan",
      description:
        "Known as the Cradle of Democracy in the East, where the First Philippine Republic was established in 1899.",
      image: require("../assets/images/barasoain.jpg"),
    },
    {
      name: "Corregidor Island, Cavite",
      description:
        "A historic island fortress that played a key role in World War II, symbolizing Filipino courage and resistance.",
      image: require("../assets/images/corregidor.jpg"),
    },
    {
      name: "San Agustin Church, Manila",
      description:
        "The oldest stone church in the Philippines and a UNESCO World Heritage Site, renowned for its intricate carvings.",
      image: require("../assets/images/agustin.jpg"),
    },
    {
      name: "Fort Santiago, Manila",
      description:
        "A major defense fortress of Intramuros where national hero José Rizal was imprisoned before his execution.",
      image: require("../assets/images/fort.jpg"),
    },
    {
      name: "Puerto Princesa Subterranean River, Palawan",
      description:
        "A UNESCO World Heritage Site and one of the New 7 Wonders of Nature, showcasing an underground river and stunning limestone formations.",
      image: require("../assets/images/puerto.jpg"),
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
  
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.header}>🏛️ Philippine Heritage Sites</Text>

      {heritageSites.map((site, index) => (
        <View key={index} style={styles.card}>
          <Image source={site.image} style={styles.image} resizeMode="cover" />
          <Text style={styles.title}>{site.name}</Text>
          <Text style={styles.description}>{site.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: "#EAF6FF", alignItems: "center" },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#00509E",
  },
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
   backButtonText: { 
    fontSize: 16, 
    color: "#023e8a", 
    fontWeight: "bold" 
  },
  header: { 
    fontSize: 22, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#00509E" 
  },
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
  image: {
    width: 250,
    height: 180,
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#023e8a",
    marginBottom: 6,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 10,
  },
});
//