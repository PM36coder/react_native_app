// app/(app)/recipeDetail.tsx
import React, { useEffect, useState } from "react";
import { 
  SafeAreaView, 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  ActivityIndicator 
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { API } from "@/axios";

interface Recipe {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image?: string;
  createdAt: string;
}

export default function RecipeDetail() {
  const { id } = useLocalSearchParams<{ id: string }>(); // ✅ id le aayenge
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch single recipe
  const fetchRecipe = async () => {
    try {
      const res = await API.get(`/recipe/${id}`);
      setRecipe(res.data);
    } catch (error: any) {
      console.log("Error fetching recipe:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  if (!recipe) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ fontSize: 16, color: "#666" }}>Recipe not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {recipe.image ? (
          <Image source={{ uri: recipe.image }} style={styles.image} />
        ) : (
          <View style={styles.noImage}>
            <Text>No Image</Text>
          </View>
        )}

        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.date}>
          Posted on {new Date(recipe.createdAt).toDateString()}
        </Text>

        <Text style={styles.heading}>Ingredients:</Text>
        {recipe.ingredients.length > 0 ? (
          recipe.ingredients.map((ing, index) => (
            <Text key={index} style={styles.listItem}>• {ing}</Text>
          ))
        ) : (
          <Text style={styles.emptyText}>No ingredients listed</Text>
        )}

        <Text style={styles.heading}>Instructions:</Text>
        <Text style={styles.instructions}>
          {recipe.instructions || "No instructions provided"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
  },
  noImage: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 6 },
  date: { fontSize: 14, color: "#666", marginBottom: 16 },
  heading: { fontSize: 18, fontWeight: "600", marginTop: 12, marginBottom: 6 },
  listItem: { fontSize: 16, marginBottom: 4 },
  emptyText: { fontSize: 14, color: "#999" },
  instructions: { fontSize: 16, lineHeight: 22, color: "#444" },
});
