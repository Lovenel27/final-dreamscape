import { Link, useRouter } from "expo-router"; 
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";

const Home = () => {
  const router = useRouter();
  const [bgIndex, setBgIndex] = useState(0);

  // Backgrounds for slideshow
  const backgrounds = [
    { name: "Boracay", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e" },
  ];

  // Featured destinations carousel
  const featured = [
    { id: 1, name: "Boracay", desc: "White Beach, nightlife & island hopping adventures.", rating: 4.9, image: require("../assets/images/boracay.jpg") },
    { id: 2, name: "Palawan", desc: "Explore El Nido & Coron’s crystal-clear lagoons.", rating: 4.8, image: require("../assets/images/palawan.jpg") },
    { id: 3, name: "Bohol", desc: "Famous Chocolate Hills & adorable tarsiers.", rating: 4.7, image: require("../assets/images/bohol.jpg") },
    { id: 4, name: "Baguio", desc: "Cool climate, pine trees, and strawberry farms.", rating: 4.6, image: require("../assets/images/baguio.jpg") },
    { id: 5, name: "Siargao", desc: "Surfing paradise & beautiful island hopping tours.", rating: 4.9, image: require("../assets/images/siargao.png") },
    { id: 6, name: "Cebu", desc: "Cebu City tourist spots as well as off-the-beaten-path experiences, this guide covers both.", rating: 4.8, image: require("../assets/images/CT.jpg") },
  ];

  // Auto background change
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Render dynamic stars
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <Text style={styles.featuredRating}>
        {"⭐".repeat(fullStars)}
        {halfStar ? "✰" : ""}
        {"☆".repeat(emptyStars)}
        {"  " + rating.toFixed(1) + "/5"}
      </Text>
    );
  };

  return (
    <ImageBackground source={{ uri: backgrounds[bgIndex].image }} style={styles.background} resizeMode="cover">
      <View style={styles.overlay} />

      {/* Navbar */}
      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Dreamscape Travel</Text>
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Discover the Philippines</Text>
        <Text style={styles.subtitle}>Beaches, mountains, culture — all in one paradise.</Text>

        {/* Featured Carousel */}
        <Text style={styles.sectionTitle}>🌴 Featured Destinations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ marginBottom: 20, paddingHorizontal: 10 }}>
          {featured.map((spot) => (
            <TouchableOpacity
              key={spot.id}
              style={styles.featuredCard}
              onPress={() => router.push(`/destination/${spot.id}`)}
            >
              <Image source={spot.image} style={styles.featuredImage} />
              <Text style={styles.featuredName}>{spot.name}</Text>
              <Text style={styles.featuredDesc}>{spot.desc}</Text>
              {renderStars(spot.rating)}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Categories */}
        <Text style={styles.sectionTitle}>🗺️ Explore By Category</Text>
        <Link href="/beaches" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="sunny" size={28} color="#ffb703" />
            <Text style={styles.cardText}>Top Beaches</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/mountains" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="leaf" size={28} color="#2a9d8f" />
            <Text style={styles.cardText}>Mountain Escapes</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/Heritage" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="business" size={28} color="#e76f51" />
            <Text style={styles.cardText}>Heritage Sites</Text>
          </TouchableOpacity>
        </Link>

         <Link href="/my-bookings" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="clipboard" size={28} color="#06d6a0" />
            <Text style={styles.cardText}>My Bookings</Text>
          </TouchableOpacity>
        </Link>

          <Link href="/goals/create" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="add-circle" size={28} color="#0096c7" />
            <Text style={styles.cardText}>Add Your Goal Destination</Text>
          </TouchableOpacity>
        </Link>


        {/* Book Now */}
        <TouchableOpacity style={styles.bookBtn} onPress={() => router.push("/booking")}>
          <Ionicons name="airplane" size={24} color="white" />
          <Text style={styles.bookText}>Book Your Trip</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)" },
  navbar: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 16 },
  navTitle: { fontSize: 24, fontWeight: "bold", color: "white" },
  content: { alignItems: "center", padding: 20 },
  title: { fontSize: 30, fontWeight: "bold", color: "white", marginBottom: 8, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#f1f1f1", marginBottom: 20, textAlign: "center", paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "bold", color: "white", alignSelf: "flex-start", marginBottom: 12 },
  featuredCard: { backgroundColor: "white", borderRadius: 14, marginRight: 16, width: 220, padding: 12, elevation: 4 },
  featuredImage: { width: "100%", height: 120, borderRadius: 12, marginBottom: 8 },
  featuredName: { fontSize: 18, fontWeight: "bold", color: "#023e8a" },
  featuredDesc: { fontSize: 13, color: "#444", marginTop: 4 },
  featuredRating: { fontSize: 14, fontWeight: "bold", color: "#FFD700", marginTop: 4 },
  card: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.85)", borderRadius: 14, paddingVertical: 16, paddingHorizontal: 18, marginVertical: 8, width: "90%" },
  cardText: { fontSize: 18, fontWeight: "600", color: "#023e8a", marginLeft: 12 },
  bookBtn: { marginTop: 20, flexDirection: "row", alignItems: "center", backgroundColor: "#ff595e", paddingVertical: 16, borderRadius: 14, width: "90%", justifyContent: "center" },
  bookText: { color: "white", fontSize: 18, fontWeight: "bold", marginLeft: 10 },
});

export default Home;
