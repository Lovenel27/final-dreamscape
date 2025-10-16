import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter, useFocusEffect } from "expo-router";
import { auth } from "../firebaseConfig"; 

export default function Profile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(null);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const loadProfile = async () => {
    try {
      const user = auth.currentUser;

      if (user) {
        setName(user.displayName || (await AsyncStorage.getItem("name")) || "");
        setEmail(user.email || (await AsyncStorage.getItem("email")) || "");
        setPhoto(user.photoURL || (await AsyncStorage.getItem("photo")) || null);
      } else {
        const savedName = await AsyncStorage.getItem("name");
        const savedBio = await AsyncStorage.getItem("bio");
        const savedEmail = await AsyncStorage.getItem("email");
        const savedPhoto = await AsyncStorage.getItem("photo");

        if (savedName) setName(savedName);
        if (savedBio) setBio(savedBio);
        if (savedEmail) setEmail(savedEmail);
        if (savedPhoto) setPhoto(savedPhoto);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, [])
  );

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Please allow access to your photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setPhoto(uri);
      await AsyncStorage.setItem("photo", uri);
    }
  };

  const saveProfile = async () => {
    await AsyncStorage.setItem("name", name);
    await AsyncStorage.setItem("bio", bio);
    await AsyncStorage.setItem("email", email);
    Alert.alert("🌴 Profile Updated!", "Your changes have been saved.");
    setEditing(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      await auth.signOut();
      Alert.alert("👋 Logged Out", "You have been logged out successfully!");
      router.replace("/Signup");
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/white.jpg")}
      style={styles.background}
      imageStyle={{ resizeMode: "cover" }}
    >
   
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={26} color="#007AFF" />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>

          <TouchableOpacity onPress={pickImage}>
            <View style={styles.photoWrapper}>
              <Image
                source={
                  photo
                    ? { uri: photo }
                    : require("../assets/images/white.jpg")
                }
                style={styles.profilePic}
              />
              <View style={styles.cameraIcon}>
                <Ionicons name="camera" size={20} color="white" />
              </View>
            </View>
          </TouchableOpacity>

          {editing ? (
            <>
              <TextInput
                style={styles.input}
                value={name}
                placeholder="Your Name"
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                value={email}
                placeholder="Email Address"
                onChangeText={setEmail}
              />
              <TextInput
                style={[styles.input, { height: 100 }]}
                value={bio}
                placeholder="Write something about yourself..."
                onChangeText={setBio}
                multiline
              />
              <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
                <Ionicons name="save" size={20} color="white" />
                <Text style={styles.saveText}>Save Profile</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.name}>{name || "Your Name"}</Text>
              <Text style={styles.email}>{email || "example@email.com"}</Text>
              <Text style={styles.bio}>
                {bio ||
                  "Dreaming of your next destination? Tap edit to personalize your profile 🌍"}
              </Text>

              <TouchableOpacity
                style={styles.editBtn}
                onPress={() => setEditing(true)}
              >
                <Ionicons name="pencil" size={20} color="white" />
                <Text style={styles.editText}>Edit Profile</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Ionicons name="log-out" size={20} color="white" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 8,
    borderRadius: 10,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  profileCard: {
    backgroundColor: "hsla(183, 97%, 66%, 0.90)",
    width: "90%",
    borderRadius: 25,
    alignItems: "center",
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },
  photoWrapper: {
    position: "relative",
    alignItems: "center",
  },
  profilePic: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#00BFFF",
    marginBottom: 15,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#007AFF",
    borderRadius: 20,
    padding: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  bio: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 15,
  },
  editText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
  saveBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginBottom: 10,
  },
  saveText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ff3b30",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "600",
  },
});
