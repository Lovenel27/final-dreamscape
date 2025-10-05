// app/my-bookings.jsx
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const router = useRouter();

  // Load bookings when screen opens
  useEffect(() => {
    const fetchBookings = async () => {
      const storedBookings = await AsyncStorage.getItem("bookings");
      if (storedBookings) {
        setBookings(JSON.parse(storedBookings));
      }
    };
    fetchBookings();
  }, []);

  // Delete one trip
  const deleteBooking = async (index) => {
    const updated = bookings.filter((_, i) => i !== index);
    await AsyncStorage.setItem("bookings", JSON.stringify(updated));
    setBookings(updated);
    Alert.alert("✅ Deleted", "The trip has been removed.");
  };

  // Edit trip → redirect to edit screen
  const editBooking = (index) => {
    router.push({ pathname: "/edit-booking", params: { index } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📌 My Bookings</Text>

      <ScrollView style={styles.scroll}>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>✈️ {booking.destination}</Text>
              <Text>Date: {booking.date}</Text>
              <Text>Guests: {booking.guests}</Text>
              <Text>Budget: ₱{booking.budget}</Text>

              <View style={styles.cardButtons}>
                <TouchableOpacity
                  style={[styles.cardBtn, { backgroundColor: "#0077b6" }]}
                  onPress={() => editBooking(index)}
                >
                  <Text style={styles.btnText}>✏️ Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.cardBtn, { backgroundColor: "#e63946" }]}
                  onPress={() => deleteBooking(index)}
                >
                  <Text style={styles.btnText}>🗑️ Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.subtitle}>No trips booked yet.</Text>
        )}
      </ScrollView>

      {/* Only Back to Home button remains */}
      <View style={styles.buttonsRow}>
        <TouchableOpacity
  style={[styles.button, { backgroundColor: "#0077b6" }]}
  onPress={() => router.replace("/Home")} // ✅ directs to home.jsx
>
  <Text style={styles.buttonText}>🏠 Back to Home</Text>
</TouchableOpacity>

      </View>
    </View>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf9ff",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#023e8a",
    marginBottom: 20,
    textAlign: "center",
  },
  scroll: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
  cardButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  cardBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonsRow: {
    marginTop: 10,
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
