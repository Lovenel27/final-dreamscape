import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const dreamDestinations = [
  { 
    id: "1", 
    name: "Boracay", 
    description: "✨ Boracay is world-famous for its powdery white sand beaches and turquoise waters. It’s the ultimate tropical paradise with both adventure and relaxation.", 
    spots: [
      "White Beach – iconic stretch of soft white sand, perfect for sunsets.",
      "Puka Shell Beach – quieter side of Boracay with natural beauty.",
      "Ariel’s Point – popular for cliff diving and water activities.",
      "Bulabog Beach – a haven for kite surfers and windsurfers."
    ]
  },
  { 
    id: "2", 
    name: "Palawan", 
    description: "🏝️ Palawan is the 'Last Frontier of the Philippines,' known for breathtaking seascapes, hidden lagoons, and limestone cliffs.", 
    spots: [
      "Puerto Princesa Underground River – a UNESCO World Heritage Site.",
      "El Nido – lagoons, hidden beaches, and dramatic karst cliffs.",
      "Coron – famous for diving spots and WWII shipwrecks.",
      "Tubbataha Reefs – a diver’s paradise with rich marine biodiversity."
    ]
  },
  { 
    id: "3", 
    name: "Bohol", 
    description: "⛰️ Bohol is known for its natural wonders, rich history, and cultural heritage. From Chocolate Hills to tarsiers, it offers diverse attractions for every traveler.", 
    spots: [
      "Chocolate Hills – unique limestone hills forming a scenic landscape.",
      "Tarsier Sanctuary – see the world’s smallest primates up close.",
      "Loboc River Cruise – enjoy scenic river views with cultural performances.",
      "Panglao Island – white sand beaches perfect for relaxation and snorkeling.",
      "Hinagdanan Cave – stunning underground cave with clear lagoon.",
      "Baclayon Church – historic Spanish-era church and museum.",
      "Danao Adventure Park – ziplining, rappelling, and extreme sports."
    ]
  },
  { 
    id: "4", 
    name: "Baguio", 
    description: "🌲 Baguio, the 'Summer Capital of the Philippines,' offers cool mountain weather and vibrant culture. A perfect escape from the heat.", 
    spots: [
      "Burnham Park – central park for boating, biking, and leisure.",
      "Mines View Park – panoramic views of Benguet’s mining towns.",
      "Strawberry Farm – pick fresh strawberries in La Trinidad.",
      "Session Road – the heart of Baguio with cafes, shops, and art.",
      "Camp John Hay – a historic landmark with pine trees and trails."
    ]
  },
  { 
    id: "5", 
    name: "Siargao", 
    description: "🌊 Siargao is the surfing capital of the Philippines, but it’s also home to natural wonders that go far beyond the waves.", 
    spots: [
      "Cloud 9 – world-famous surf spot with wooden boardwalk.",
      "Sugba Lagoon – crystal-clear waters surrounded by limestone hills.",
      "Magpupungko Rock Pools – tidal pools perfect for swimming.",
      "Naked Island, Daku Island & Guyam Island – iconic island-hopping trio.",
      "Sohoton Cove – enchanting caves, lagoons, and stingless jellyfish."
    ]
  },
   { 
    id: "6", 
    name: "Cebu", 
    description: "🌊 Cebu is the Queen City of the South in the Philippines, a bustling commercial and tourism ", 
    spots: [
      "Tops  –  It's a great spot for both daytime picnics and romantic evening dates, with a cool mountain breeze and a relaxed vibe. ",
      "Oslob – Offers opportunities for swimming with whale sharks. ",
      "Kawasan Falls – A breathtaking waterfall ideal for canyoneering and swimming. ",
      "Moalboal – famous for its large sardine run and sea turtle encounters. ",
      "Bantayan Island – A tranquil beach destination. "
    ]
  },
];

export default function DestinationDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const destination = dreamDestinations.find((d) => d.id === id);

  if (!destination) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>❌ Destination not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>⬅ Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>⬅ Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{destination.name}</Text>
      <Text style={styles.description}>{destination.description}</Text>

      <Text style={styles.subTitle}>🌴 Must-Visit Spots</Text>
      {destination.spots.map((spot, index) => (
        <View key={index} style={styles.spotCard}>
          <Text style={styles.spotText}>• {spot}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 15,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#16a34a",
    borderRadius: 10,
  },
  backText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#334155",
    textAlign: "justify",
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 10,
  },
  spotCard: {
    backgroundColor: "#e2e8f0",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  spotText: {
    fontSize: 16,
    color: "#1e293b",
  },
  error: {
    fontSize: 18,
    color: "red",
    marginBottom: 15,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
