// app/booking.js
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Booking = () => {
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [budget, setBudget] = useState("");
  const router = useRouter();

  const handleBooking = async () => {
    if (!destination || !date || !guests || !budget) {
      Alert.alert("⚠️ Missing Info", "Please fill in all fields before booking.");
      return;
    }

    const newBooking = {
      destination,
      date,
      guests,
      budget,
    };

    try {
      // Get existing bookings
      const storedBookings = await AsyncStorage.getItem("bookings");
      const bookings = storedBookings ? JSON.parse(storedBookings) : [];

      // Add new booking
      bookings.push(newBooking);

      // Save back to storage
      await AsyncStorage.setItem("bookings", JSON.stringify(bookings));

      Alert.alert("✅ Success", `Trip to ${destination} booked!`);
      router.push("/my-bookings");
    } catch (error) {
      Alert.alert("❌ Error", "Could not save booking.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✈️ Book Your Trip</Text>

      <TextInput
        style={styles.input}
        placeholder="Destination (e.g., Boracay)"
        value={destination}
        onChangeText={setDestination}
      />
      <TextInput
        style={styles.input}
        placeholder="Travel Date (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Guests"
        keyboardType="numeric"
        value={guests}
        onChangeText={setGuests}
      />
      <TextInput
        style={styles.input}
        placeholder="Budget (PHP)"
        keyboardType="numeric"
        value={budget}
        onChangeText={setBudget}
      />

      <TouchableOpacity style={styles.button} onPress={handleBooking}>
        <Text style={styles.buttonText}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Booking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
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
