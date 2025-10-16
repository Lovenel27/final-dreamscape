import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Animated,
  Easing,
} from "react-native";
import { useState, useRef } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      alert("⚠️ Please enter both email and password");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("✅ Welcome back to Dreamscape!");
      router.replace("/Home");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        alert("❌ No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        alert("❌ Incorrect password. Try again.");
      } else if (error.code === "auth/invalid-credential") {
        alert("❌ Invalid email or password. Please try again.");
      } else {
        alert(`Firebase Error: ${error.message}`);
      }
    }
  };

  return (
    <View style={styles.container}>

      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        }}
        style={styles.imageBackground}
        blurRadius={4}
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.card}>
            <Text style={styles.logo}>
              <MaterialCommunityIcons name="earth" size={32} color="#0077B6" />{" "}
              Dreamscape
            </Text>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Log in to explore your dream destinations{" "}
              <Text style={{ fontSize: 18 }}>✈️</Text>
            </Text>

            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="#0077B6" />
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                textContentType="emailAddress"
              />
            </View>

            <View style={styles.inputWrapper}>
              <Ionicons name="lock-closed-outline" size={20} color="#0077B6" />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
                textContentType="password"
              />
            </View>

            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={handleLogin}
                activeOpacity={0.8}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
              >
                <Text style={styles.loginText}>Log In</Text>
              </TouchableOpacity>
            </Animated.View>

            <Text style={styles.orText}>
              Don’t have an account?{" "}
              <Link href="/Signup" style={styles.signupLink}>
                Sign Up
              </Link>
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  imageBackground: { flex: 1, resizeMode: "cover" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 25,
  },
  card: {
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 25,
    padding: 30,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  logo: {
    fontSize: 30,
    fontWeight: "900",
    color: "#0077B6",
    textAlign: "center",
    marginBottom: 20,
    letterSpacing: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    color: "#023E8A",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#555",
    marginBottom: 25,
    fontSize: 16,
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F7FA",
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#90CAF9",
  },
  input: {
    flex: 1,
    height: 48,
    marginLeft: 10,
    color: "#000",
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: "#0077B6",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#0077B6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  orText: {
    color: "#333",
    textAlign: "center",
    marginTop: 22,
    fontSize: 15,
  },
  signupLink: {
    color: "#0077B6",
    fontWeight: "700",
    textDecorationLine: "underline",
  },
});

export default Login;