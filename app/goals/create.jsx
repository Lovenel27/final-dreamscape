import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { db } from "../../firebaseConfig"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const CreateGoal = () => {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddGoal = async () => {
    if (!destination.trim()) {
      Alert.alert("Error", "Destination name is required!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "goals"), {
        destination,
        description,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Goal destination added!");
      setDestination("");
      setDescription("");

      router.push("/goal-destination");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ Add Your Dream Goal ✨</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter Destination Name"
        value={destination}
        onChangeText={setDestination}
      />

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity 
        style={[styles.addBtn, loading && { backgroundColor: "#7fc8de" }]} 
        onPress={handleAddGoal} 
        disabled={loading}
      >
        <Text style={styles.addBtnText}>{loading ? "Saving..." : "Save Goal"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
        <Text style={styles.cancelBtnText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf9ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#023e8a",
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
    elevation: 3,
  },
  addBtn: {
    backgroundColor: "#0096c7",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
  },
  addBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelBtn: {
    backgroundColor: "#e63946",
    paddingVertical: 14,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  cancelBtnText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateGoal;
