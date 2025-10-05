import { useState } from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";

const dreamDestinations = [
  { 
    id: "1", 
    name: "Boracay", 
    image: "https://upload.wikimedia.org/wikipedia/commons/2/28/Boracay_White_Beach.png", 
    info: "Boracay is famous for its stunning white-sand beaches and lively nightlife." 
  },
  { 
    id: "2", 
    name: "Palawan", 
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9b/El_Nido%2C_Palawan.jpg", 
    info: "Palawan is home to crystal-clear lagoons, limestone cliffs, and the Underground River." 
  },
  { 
    id: "3", 
    name: "Baguio", 
    image: "https://upload.wikimedia.org/wikipedia/commons/7/71/Baguio_City_Skyline.jpg", 
    info: "Baguio is the summer capital of the Philippines, known for its cool climate and pine trees." 
  },
  { 
    id: "4", 
    name: "Siargao", 
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6d/Siargao_Cloud_9.jpg", 
    info: "Siargao is the surfing capital of the Philippines, loved for Cloud 9 waves." 
  },
  { 
    id: "5", 
    name: "Cebu", 
    image: "https://upload.wikimedia.org/wikipedia/commons/1/12/Magellan_Cross_Cebu.jpg", 
    info: "Cebu is known for historical landmarks, Sinulog Festival, and whale shark watching." 
  },
];

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(dreamDestinations);
  const router = useRouter();

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === "") {
      setResults(dreamDestinations);
    } else {
      const filtered = dreamDestinations.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setResults(filtered);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🔍 Search Dream Destination</Text>

      <TextInput
        style={styles.input}
        placeholder="Type a destination..."
        value={query}
        onChangeText={handleSearch}
      />

      <FlatList
        data={query.trim() === "" ? [] : results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => router.push({ pathname: "/destination/[id]", params: { id: item.id, name: item.name, image: item.image, info: item.info } })}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          query.trim() !== "" && results.length === 0 ? (
            <Text style={styles.noResult}>No destination found 🚫</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f8f5",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#1a3c40",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  item: {
    padding: 12,
    backgroundColor: "#21cc8d",
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  itemText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  noResult: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
    fontSize: 16,
  },
});
//