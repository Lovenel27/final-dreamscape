import React, { useCallback, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "Lovenel S. Canillo",
    email: "lovenel@example.com",
    location: "Philippines 🇵🇭",
    gender: "Male", // ✅ added default gender
    image: null,
  });

  // Load saved user data when profile opens
  useFocusEffect(
    useCallback(() => {
      const loadProfile = async () => {
        try {
          const storedProfile = await AsyncStorage.getItem("userProfile");
          if (storedProfile) {
            setUser(JSON.parse(storedProfile));
          }
        } catch (error) {
          console.error("Error loading profile:", error);
        }
      };
      loadProfile();
    }, [])
  );

  // ✅ Working Logout
  const handleLogout = async () => {
    Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            Alert.alert("Logged Out", "Redirecting to Sign Up...");
            router.replace("/Signup"); // ✅ must match your actual filename (lowercase)
          } catch (error) {
            console.error("Logout failed:", error);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#0077b6" />
      </TouchableOpacity>

      {/* Profile Info */}
      <Image
        source={
          user.image
            ? { uri: user.image }
            : require("../assets/images/siargao.png")
        }
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.subtitle}>Travel Enthusiast ✈️</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>

        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{user.location}</Text>

        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.value}>{user.gender}</Text> {/* ✅ fixed key name */}
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => router.push("/editProfile")}
      >
        <Ionicons name="create" size={22} color="white" />
        <Text style={styles.editText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out" size={22} color="white" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9fc", alignItems: "center", paddingTop: 60 },
  backBtn: { position: "absolute", top: 40, left: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: "bold", color: "#023e8a" },
  subtitle: { fontSize: 14, color: "#555", marginBottom: 20 },
  infoBox: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 14,
    padding: 20,
    elevation: 4,
    marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: "600", color: "#0077b6" },
  value: { fontSize: 15, color: "#333", marginBottom: 12 },
  editBtn: {
    flexDirection: "row",
    backgroundColor: "#0077b6",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 14,
  },
  editText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#ef233c",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  logoutText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
});
