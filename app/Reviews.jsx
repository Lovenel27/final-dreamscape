import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { reviewsData } from "./RateThisApp";

const Reviews = () => {
  const router = useRouter();
  const [reviews, setReviews] = useState(
    reviewsData.map((r, i) => ({
      ...r,
      name: r.name || `User ${i + 1}`,
    }))
  );
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  const handleDelete = (index) => {
    const updated = reviews.filter((_, i) => i !== index);
    setReviews(updated);
    reviewsData.splice(index, 1);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedText(reviews[index].review);
    setEditedRating(reviews[index].rating);
  };

  const handleSaveEdit = (index) => {
    if (editedText.trim() === "" || editedRating === 0) {
      alert("Please enter a review and rating.");
      return;
    }
    const updated = [...reviews];
    updated[index] = { ...updated[index], review: editedText, rating: editedRating };
    setReviews(updated);
    reviewsData[index] = updated[index];
    setEditingIndex(null);
  };

  const renderStars = (rating, editable = false) => (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => editable && setEditedRating(star)}>
          <Text style={[styles.star, { color: star <= rating ? "#FFD700" : "#ccc" }]}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>User Reviews 💬</Text>

      {reviews.length === 0 ? (
        <Text style={styles.noReview}>No reviews yet. Be the first to rate!</Text>
      ) : (
        <ScrollView>
          {reviews.map((item, index) => (
            <View key={index} style={styles.reviewCard}>
              <View style={styles.headerRow}>
                <Text style={styles.userName}>{item.name}</Text>
                <View style={styles.actionRow}>
                  <TouchableOpacity onPress={() => handleEdit(index)}>
                    <Text style={[styles.actionText, { color: "#0077b6" }]}>✏️ Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(index)}>
                    <Text style={[styles.actionText, { color: "#d62828" }]}>🗑️ Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {editingIndex === index ? (
                <>
                  {renderStars(editedRating, true)}
                  <TextInput
                    style={styles.input}
                    value={editedText}
                    onChangeText={setEditedText}
                    multiline
                  />
                  <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={() => handleSaveEdit(index)}
                  >
                    <Text style={styles.saveText}>Save Changes</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.stars}>{"⭐".repeat(item.rating)}</Text>
                  <Text style={styles.reviewText}>{item.review}</Text>
                </>
              )}
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 20 },
  backButton: { position: "absolute", top: 50, left: 20 },
  backText: { fontSize: 18, color: "#0077b6", fontWeight: "bold" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#023e8a",
    marginBottom: 16,
    textAlign: "center",
  },
  noReview: { textAlign: "center", color: "#555", fontSize: 16 },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userName: { fontSize: 16, fontWeight: "bold", color: "#023e8a" },
  actionRow: { flexDirection: "row" },
  actionText: { marginLeft: 10, fontSize: 14, fontWeight: "600" },
  stars: { fontSize: 18, color: "#FFD700", marginTop: 4 },
  reviewText: { fontSize: 15, color: "#333", marginTop: 6 },
  starContainer: { flexDirection: "row", justifyContent: "center", marginVertical: 8 },
  star: { fontSize: 28, marginHorizontal: 3 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 15,
    height: 80,
    textAlignVertical: "top",
    marginTop: 10,
  },
  saveBtn: {
    backgroundColor: "#38b000",
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
