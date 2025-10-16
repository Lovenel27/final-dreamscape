import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  ActivityIndicator,
  Platform,
  ToastAndroid,
  BackHandler, 
} from "react-native";
import { db } from "../firebaseConfig";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native"; 

export default function GoalDestination() {
  const navigation = useNavigation();
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [newDestination, setNewDestination] = useState("");
  const [newDescription, setNewDescription] = useState("");


  useEffect(() => {
    const backAction = () => {
      if (modalVisible) {

        setModalVisible(false);
        return true;
      } else {
        navigation.goBack(); 
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [modalVisible, navigation]);

  useEffect(() => {
    const q = query(collection(db, "goals"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setGoals(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

 
  const handleEdit = (goal) => {
    setSelectedGoal(goal);
    setNewDestination(goal.destination);
    setNewDescription(goal.description);
    setModalVisible(true);
  };


  const saveEdit = async () => {
    if (!newDestination.trim()) {
      Alert.alert("Error", "Destination name cannot be empty!");
      return;
    }
    try {
      await updateDoc(doc(db, "goals", selectedGoal.id), {
        destination: newDestination,
        description: newDescription,
      });

      setModalVisible(false);

      if (Platform.OS === "android") {
        ToastAndroid.show("Goal updated successfully!", ToastAndroid.SHORT);
      } else {
        Alert.alert("Success", "Goal updated successfully!");
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };


  const handleDelete = (goalId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this goal?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "goals", goalId));
              if (Platform.OS === "android") {
                ToastAndroid.show("Goal deleted successfully!", ToastAndroid.SHORT);
              } else {
                Alert.alert("Deleted", "Goal deleted successfully!");
              }
            } catch (error) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0096c7" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
 
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>✨ Your Goal Destinations ✨</Text>

      {goals.length === 0 && <Text style={styles.noGoals}>No goals yet. Add one!</Text>}

      {goals.map((goal) => (
        <View key={goal.id} style={styles.card}>
          <View style={styles.textContainer}>
            <Text style={styles.goalName}>{goal.destination}</Text>
            <Text style={styles.goalDesc}>{goal.description}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: "#12bcffff" }]}
              onPress={() => handleEdit(goal)}
            >
              <Text style={styles.btnTextSmall}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconBtn, { backgroundColor: "#e63946" }]}
              onPress={() => handleDelete(goal.id)}
            >
              <Text style={styles.btnTextSmall}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Edit Goal</Text>

            <TextInput
              style={styles.input}
              placeholder="Destination Name"
              value={newDestination}
              onChangeText={setNewDestination}
            />
            <TextInput
              style={[styles.input, { height: 100 }]}
              placeholder="Description"
              value={newDescription}
              onChangeText={setNewDescription}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.iconBtn, { backgroundColor: "#0096c7" }]}
                onPress={saveEdit}
              >
                <Text style={styles.btnTextSmall}>Save</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.iconBtn, { backgroundColor: "#555" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnTextSmall}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#eaf9ff",
    alignItems: "center",
    minHeight: "100%",
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
    padding: 8,
  },
  backText: {
    fontSize: 16,
    color: "#0096c7",
    fontWeight: "600",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#023e8a",
    textAlign: "center",
  },
  noGoals: {
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 14,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textContainer: {
    marginBottom: 10,
  },
  goalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#023e8a",
    marginBottom: 4,
  },
  goalDesc: {
    fontSize: 14,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    marginTop: 8,
  },
  iconBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  btnTextSmall: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#023e8a",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
