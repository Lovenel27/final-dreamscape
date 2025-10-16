import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const AddGoal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadGoals = async () => {
    try {
      setLoading(true);
      const storedGoals = await AsyncStorage.getItem("goals");
      const parsed = storedGoals ? JSON.parse(storedGoals) : [];
      setGoals(parsed);
    } catch (error) {
      Alert.alert("Error", "Failed to load goals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGoals();
  }, []);

 
  const saveGoal = async () => {
    if (!name.trim() || !description.trim()) {
      Alert.alert("⚠️ Please fill in all fields!");
      return;
    }

    try {
      const newGoal = {
        id: Date.now().toString(),
        name,
        description,
      };
      const updatedGoals = [...goals, newGoal];
      await AsyncStorage.setItem("goals", JSON.stringify(updatedGoals));

      Alert.alert("✅ Goal saved successfully!");
      setName("");
      setDescription("");
      loadGoals();
    } catch (error) {
      Alert.alert("Error", "Could not save goal.");
    }
  };

  const removeGoal = async (id) => {
    try {
      const updated = goals.filter((g) => g.id !== id);
      await AsyncStorage.setItem("goals", JSON.stringify(updated));
      setGoals(updated);
      Alert.alert("Goal removed!");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };


  const quickEdit = async (id, currentDesc = "") => {
    try {
      const updated = goals.map((g) =>
        g.id === id ? { ...g, description: currentDesc + " ⭐" } : g
      );
      await AsyncStorage.setItem("goals", JSON.stringify(updated));
      setGoals(updated);
      Alert.alert("Goal updated!");
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌍 Add & View Your Travel Goals</Text>

      <TextInput
        style={styles.input}
        placeholder="Destination Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.input, { height: 70 }]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={saveGoal}>
        <Text style={styles.buttonText}>Save Goal</Text>
      </TouchableOpacity>

      <View style={{ height: 20 }} />

      <Text style={styles.subtitle}>Your Goals</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2e7d32" />
      ) : (
        <FlatList
          data={goals}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.label}>🏖️ {item.name}</Text>
              <Text style={styles.labelSmall}>{item.description}</Text>
              <Text style={styles.labelSmall}>ID: {item.id}</Text>

              <TouchableOpacity
                onPress={() => quickEdit(item.id, item.description)}
                style={styles.button}
              >
                <Text style={styles.buttonText}>+ Add ⭐</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => removeGoal(item.id)}
                style={[styles.button, { backgroundColor: "#f55" }]}
              >
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={<Text>No goals yet.</Text>}
        />
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#555", marginTop: 20 }]}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.buttonText}>⬅ Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f4fdfb" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15, textAlign: "center", color: "#2e7d32" },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginBottom: 15, backgroundColor: "#fff" },
  button: { marginTop: 8, padding: 12, borderRadius: 8, backgroundColor: "#2e7d32" },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "bold" },
  card: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 12, marginBottom: 12, backgroundColor: "#fff" },
  label: { fontSize: 16, marginBottom: 4 },
  labelSmall: { fontSize: 12, color: "#555", marginBottom: 8 },
});

export default AddGoal;
//