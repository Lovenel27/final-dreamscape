import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function About() {
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#0077b6" />
      </TouchableOpacity>

      <Image
        source={require("../assets/images/logo.png")} 
        style={styles.image}
      />

      <Text style={styles.title}>About Dreamscape Travel</Text>
      <Text style={styles.description}>
        Dreamscape Travel is your ultimate companion for exploring the beauty of the Philippines. 🇵🇭
        From breathtaking beaches to majestic mountains, our goal is to inspire adventure and make
        your travel dreams come true.
      </Text>

      <Text style={styles.subtitle}>🌏 Our Mission</Text>
      <Text style={styles.description}>
        To promote local tourism and connect travelers with unforgettable destinations across the country,
        all in one easy-to-use app.
      </Text>

      <Text style={styles.subtitle}>💡 Our Vision</Text>
      <Text style={styles.description}>
        To become the #1 travel platform that showcases the heart and soul of the Philippines —
        empowering people to explore, experience, and enjoy every corner of our islands.
      </Text>

      <Text style={styles.credit}>Developed by: Lovenel S. Canillo 💻</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f8f9fa", alignItems: "center" },
  backBtn: { position: "absolute", top: 40, left: 20, zIndex: 10 },
  image: { width: 180, height: 180, borderRadius: 90, marginTop: 80, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#023e8a", textAlign: "center", marginBottom: 12 },
  subtitle: { fontSize: 20, fontWeight: "bold", color: "#0077b6", marginTop: 20, marginBottom: 8, textAlign: "center" },
  description: { fontSize: 16, color: "#333", lineHeight: 24, textAlign: "center", paddingHorizontal: 10 },
  credit: { marginTop: 30, fontSize: 14, color: "#555", fontStyle: "italic", textAlign: "center", marginBottom: 30 },
});
