import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function EditProfile() {
  const router = useRouter();
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
    image: null,
  });

  // Load existing data
  useEffect(() => {
    const loadProfile = async () => {
      const storedProfile = await AsyncStorage.getItem("userProfile");
      if (storedProfile) {
        setUser(JSON.parse(storedProfile));
      }
    };
    loadProfile();
  }, []);

  // 📸 Pick image from gallery (Android/iOS)
  const pickImage = async () => {
    try {
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        Alert.alert("Permission required", "Please allow photo access.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setUser({ ...user, image: result.assets[0].uri });
      }
    } catch (error) {
      console.error("Image picking failed:", error);
    }
  };

  // 💾 Save the edited profile
  const handleSave = async () => {
    if (!user.name || !user.email) {
      Alert.alert("Error", "Name and email are required.");
      return;
    }
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(user));
      Alert.alert("Success", "Profile updated successfully!");
      router.back(); // Go back to profile screen
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to save profile.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#0077b6" />
      </TouchableOpacity>

      <Text style={styles.title}>Edit Profile</Text>

      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={
            user.image
              ? { uri: user.image }
              : require("../assets/images/siargao.png")
          }
          style={styles.profileImage}
        />
        <Text style={styles.changePhotoText}>Change Photo</Text>
      </TouchableOpacity>

      {/* Form Inputs */}
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={user.name}
        onChangeText={(text) => setUser({ ...user, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={user.email}
        onChangeText={(text) => setUser({ ...user, email: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={user.location}
        onChangeText={(text) => setUser({ ...user, location: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={user.gender}
        onChangeText={(text) => setUser({ ...user, gender: text })}
      />


      {/* Save Button */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Ionicons name="save" size={22} color="white" />
        <Text style={styles.saveText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9fc", alignItems: "center", paddingTop: 60 },
  backBtn: { position: "absolute", top: 40, left: 20 },
  title: { fontSize: 26, fontWeight: "bold", color: "#023e8a", marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60, marginBottom: 10 },
  changePhotoText: { color: "#0077b6", fontWeight: "600", marginBottom: 20 },
  input: {
    width: "85%",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 16,
    elevation: 3,
  },
  saveBtn: {
    flexDirection: "row",
    backgroundColor: "#0077b6",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 10,
  },
  saveText: { color: "white", fontSize: 16, fontWeight: "bold", marginLeft: 8 },
});
