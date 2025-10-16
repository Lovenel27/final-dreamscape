import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

let reviewsData = [];

const RateThisApp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [scaleAnim] = useState(new Animated.Value(1));

  const handleStarPress = (star) => {
    setRating(star);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.3,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 150,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleSubmit = () => {
    if (name.trim() === "" || rating === 0 || review.trim() === "") {
      alert("Please complete all fields before submitting 💬");
      return;
    }
    reviewsData.push({ name, rating, review });
    setName("");
    setRating(0);
    setReview("");
    router.push("/Reviews");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.title}>🌟 Ratings🌟</Text>
          <Text style={styles.subtitle}>We’d love to hear your feedback!</Text>

          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleStarPress(star)}>
                <Animated.Text
                  style={[
                    styles.star,
                    {
                      color: star <= rating ? "#FFD700" : "#ccc",
                      transform: [{ scale: star === rating ? scaleAnim : 1 }],
                    },
                  ]}
                >
                  ★
                </Animated.Text>
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#777"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your review..."
            placeholderTextColor="#777"
            value={review}
            onChangeText={setReview}
            multiline
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Review 💖</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export { reviewsData };
export default RateThisApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#caf0f8", // soft blue background 🌊
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  backText: {
    fontSize: 18,
    color: "#03045e",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#023e8a",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  star: {
    fontSize: 42,
    marginHorizontal: 6,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitBtn: {
    marginTop: 10,
    borderRadius: 12,
    backgroundColor: "#0077b6",
    alignItems: "center",
    paddingVertical: 15,
  },
  submitText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
