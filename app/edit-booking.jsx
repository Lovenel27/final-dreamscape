// app/edit-booking.js
import { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditBooking = () => {
  const router = useRouter();
  const { index } = useLocalSearchParams(); // get booking index
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    const loadBooking = async () => {
      const stored = await AsyncStorage.getItem("bookings");
      if (stored) {
        const bookings = JSON.parse(stored);
        const booking = bookings[index];
        if (booking) {
          setDestination(booking.destination);
          setDate(booking.date);
          setGuests(booking.guests);
          setBudget(booking.budget);
        }
      }
    };
    loadBooking();
  }, [index]);

  const handleSave = async () => {
    if (!destination || !date || !guests || !budget) {
      Alert.alert("⚠️ Missing Info", "Please fill all fields.");
      return;
    }

    const stored = await AsyncStorage.getItem("bookings");
    if (stored) {
      const bookings = JSON.parse(stored);
      bookings[index] = { destination, date, guests, budget }; // update selected trip
      await AsyncStorage.setItem("bookings", JSON.stringify(bookings));
    }

    Alert.alert("✅ Updated", "Your booking has been updated.");
    router.push("/my-bookings");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✏️ Edit Booking</Text>

      <TextInput
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
        placeholder="Destination"
      />
      <TextInput
        style={styles.input}
        value={date}
        onChangeText={setDate}
        placeholder="Date (YYYY-MM-DD)"
      />
      <TextInput
        style={styles.input}
        value={guests}
        onChangeText={setGuests}
        placeholder="Number of Guests"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={budget}
        onChangeText={setBudget}
        placeholder="Budget (PHP)"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>💾 Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditBooking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#023e8a",
  },
  input: {
    backgroundColor: "white",
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#0077b6",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
