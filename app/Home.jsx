if (typeof setImmediate === "undefined") {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}

import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect } from "react";
import { db, auth } from "../firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Swiper from "react-native-swiper";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const Home = () => {
  const router = useRouter();
  const [bgIndex, setBgIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [userReview, setUserReview] = useState("");
  const [loading, setLoading] = useState(false);

  const backgrounds = [
    {
      name: "Boracay",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
  ];

  const featured = [
    {
      id: 1,
      name: "Boracay",
      desc: "White Beach, nightlife & island hopping adventures.",
      rating: 4.9,
      image: require("../assets/images/boracay.jpg"),
    },
    {
      id: 2,
      name: "Palawan",
      desc: "Explore El Nido & Coron’s crystal-clear lagoons.",
      rating: 4.8,
      image: require("../assets/images/palawan.jpg"),
    },
    {
      id: 3,
      name: "Bohol",
      desc: "Famous Chocolate Hills & adorable tarsiers.",
      rating: 4.7,
      image: require("../assets/images/bohol.jpg"),
    },
    {
      id: 4,
      name: "Baguio",
      desc: "Cool climate, pine trees, and strawberry farms.",
      rating: 4.6,
      image: require("../assets/images/baguio.jpg"),
    },
    {
      id: 5,
      name: "Siargao",
      desc: "Surfing paradise & beautiful island hopping tours.",
      rating: 4.9,
      image: require("../assets/images/siargao.png"),
    },
    {
      id: 6,
      name: "Cebu",
      desc: "Cebu City tourist spots as well as off-the-beaten-path experiences, this guide covers both.",
      rating: 4.8,
      image: require("../assets/images/CT.jpg"),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const handleSubmitReview = async () => {
    if (userRating === 0) {
      Alert.alert("Oops!", "Please select a star rating first.");
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      const reviewsRef = collection(db, "appReviews");

      await addDoc(reviewsRef, {
        rating: userRating,
        review: userReview || "",
        userId: user ? user.uid : "guest",
        userEmail: user ? user.email : "anonymous",
        createdAt: serverTimestamp(),
      });

      Alert.alert("Thank you 💕", `You rated us ${userRating} stars!\n"${userReview}"`);
      setModalVisible(false);
      setUserRating(0);
      setUserReview("");
    } catch (error) {
      console.error("Error saving review:", error);
      Alert.alert("Error", "Something went wrong while submitting your review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={{ uri: backgrounds[bgIndex].image }}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.navbar}>
        <Text style={styles.navTitle}>Dreamscape Travel</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Discover the Philippines</Text>
        <Text style={styles.subtitle}>
          Beaches, mountains, culture — all in one paradise.
        </Text>

        <Text style={styles.sectionTitle}>🌴 Featured Destinations</Text>

        <View style={{ height: 260, width: "100%", marginBottom: 25 }}>
          {typeof window !== "undefined" && (
            <Swiper
              autoplay
              autoplayTimeout={4}
              showsPagination
              dotColor="#ccc"
              activeDotColor="#fff"
              loop
            >
              {featured.map((spot) => (
                <TouchableOpacity
                  key={spot.id}
                  style={{
                    flex: 1,
                    marginHorizontal: 15,
                    borderRadius: 14,
                    overflow: "hidden",
                  }}
                  onPress={() => router.push(`/destination/${spot.id}`)}
                >
                  <Image
                    source={spot.image}
                    style={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 14,
                    }}
                    resizeMode="cover"
                  />
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      width: "100%",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      padding: 10,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      {spot.name}
                    </Text>
                    <Text style={{ color: "#eee", fontSize: 13 }}>{spot.desc}</Text>
                    <Text
                      style={{
                        color: "#FFD700",
                        fontWeight: "bold",
                        marginTop: 4,
                      }}
                    >
                      ⭐ {spot.rating.toFixed(1)} / 5
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </Swiper>
          )}
        </View>

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

        <Link href="/goals/create" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="add-circle" size={28} color="#0096c7" />
            <Text style={styles.cardText}>Add Your Goal Destination</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity style={styles.card} onPress={() => router.push("/Profile")}>
          <Ionicons name="person-circle" size={28} color="#8338ec" />
          <Text style={styles.cardText}>My Profile</Text>
        </TouchableOpacity>

        <Link href="/about" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="information-circle" size={28} color="#fb8500" />
            <Text style={styles.cardText}>About Us</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/RateThisApp" asChild>
          <TouchableOpacity style={styles.card}>
            <Ionicons name="star" size={28} color="#FFD700" />
            <Text style={styles.cardText}>Rate This App</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(0,0,0,0.45)" },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  navTitle: { fontSize: 24, fontWeight: "bold", color: "white" },
  content: { alignItems: "center", padding: 20 },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#f1f1f1",
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  featuredRating: { fontSize: 14, fontWeight: "bold", color: "#FFD700", marginTop: 4 },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginVertical: 8,
    width: "90%",
  },
  cardText: { fontSize: 18, fontWeight: "600", color: "#023e8a", marginLeft: 12 },
});

export default Home;
//