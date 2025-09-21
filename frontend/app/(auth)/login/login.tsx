import { useRouter } from "expo-router";
import React, { useState } from "react";
import { useAuth } from "@/context/contextApi";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [login, setLogin] = useState<LoginData>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const {Login} = useAuth()
  const handleSubmit = async () => {
    if (!login.email || !login.password) {
      Alert.alert("Validation Error", "Email and Password are required!");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://192.168.31.193:3000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
        return;
      }
      await Login(data.user, data.token);

      Alert.alert("Success", "Login Successful ✅");

      // TODO: Save token in AsyncStorage
      // await AsyncStorage.setItem("token", data.token);

      // Navigate to home page (index)
      setLogin({ email: "", password: "" });
      router.push("/(tabs)/topRecipe");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={{ flex: 1, justifyContent: "center", paddingHorizontal: 15 }}
      >
        <View style={{ backgroundColor: "#F7F7F7" }}>
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              fontWeight: "bold",
              fontFamily: "cursive",
            }}
          >
            Login
          </Text>

          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Enter Your Email"
            placeholderTextColor={"gray"}
            autoCapitalize="none"
            value={login.email}
            onChangeText={(e) => setLogin({ ...login, email: e })}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Your Password"
            secureTextEntry
            placeholderTextColor={"gray"}
            autoCapitalize="none"
            value={login.password}
            onChangeText={(e) => setLogin({ ...login, password: e })}
          />

          <Pressable
            style={({ pressed }) => [
              { opacity: pressed ? 0.6 : 1 },
              styles.loginBtn,
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text
              style={{
                color: "white",
                fontSize: 25,
                textAlign: "center",
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Text>
          </Pressable>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 20 }}>Don&apos;t have an Account?</Text>
            <Pressable onPress={() => router.push("/signup/signup")}>
              <Text style={{ color: "#F7128F", fontSize: 20 }}> SignUp</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  loginBtn: {
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: "#F7128F",
  },
});
