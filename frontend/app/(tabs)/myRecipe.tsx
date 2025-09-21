// app/(tabs)/myRecipe.tsx
import React, { useEffect, useState } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  Pressable, 
  ActivityIndicator 
} from "react-native";
import { router } from "expo-router";
import { API } from "@/axios";
import { useAuth } from "@/context/contextApi";

interface Recipe {
  _id: string;
  title: string;
  image?: string;
  ingredients: string[];
}

export default function MyRecipe() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
const {token}  = useAuth()
  // ✅ Fetch user recipes
 const fetchRecipes = async () => {
    try {
      const res = await API.get("/recipe/get-recipe-by-user", {
        headers: {
          Authorization: `Bearer ${token}`,  // 👈 token pass kar
        },
      });

      setRecipes(res.data.recipes || []); // 👈 yahan fix
    } catch (error: any) {
      console.log("Error fetching recipes:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchRecipes();
  }, [token]);

  // ✅ Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  // ✅ No recipes
  if (recipes.length === 0) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ fontSize: 16, color: "#666" }}>No recipes posted yet</Text>
      </SafeAreaView>
    );
  }

  // ✅ Render recipe card
  const renderRecipe = ({ item }: { item: Recipe }) => (
    <Pressable
      style={styles.card}
      onPress={() =>
        router.push({ pathname: "/recipeDetail", params: { id: item._id } })
      }
    >
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.image} />
      ) : (
        <View style={styles.noImage}>
          <Text>No Image</Text>
        </View>
      )}
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text numberOfLines={2} style={styles.subtitle}>
          {item.ingredients?.join(", ")}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item._id}
        renderItem={renderRecipe}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" ,marginTop:30},
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: { width: "100%", height: 150 },
  noImage: {
    width: "100%",
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  },
  cardContent: { padding: 12 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#666" },
});
