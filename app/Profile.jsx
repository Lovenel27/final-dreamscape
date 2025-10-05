import React from "react";
import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useRouter } from "expo-router";

export default function Profile() {
  const router = useRouter();
  const user = auth.currentUser;

  const logout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Logged out", "You have been signed out.");
      router.replace("/Login"); // redirect to login
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No user logged in</Text>
        <Button title="Go to Login" onPress={() => router.push("/Login")} />
        <Button title="Back to Home" onPress={() => router.push("/Home")} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>UID: {user.uid}</Text>

      <View style={{ height: 20 }} />
      <Button title="Logout" onPress={logout} />
      <View style={{ height: 10 }} />
      <Button title="Back to Home" onPress={() => router.push("/Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff", justifyContent: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  info: { fontSize: 16, marginBottom: 6 },
});
