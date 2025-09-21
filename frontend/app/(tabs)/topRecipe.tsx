import Recipe from '@/components/RecipeCard';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '@/context/contextApi';
import { Ionicons } from '@expo/vector-icons';

type RecipeCardProp = {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
};

const TopRecipe = () => {
  const [recipe, setRecipe] = useState<RecipeCardProp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { user, token } = useAuth();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    getAllRecipes();
  }, []);

  const getAllRecipes = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://192.168.31.193:3000/api/recipe");

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setRecipe(data.recipe);
    } catch (error) {
      console.log("Error fetching recipes:", error);
      Alert.alert("Error", "Failed to fetch recipes");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getAllRecipes();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 ,marginTop:20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "grey" }}>
            Top Recipes
          </Text>

          {/* ✅ Button toggle based on token */}
          {token ? (
            user ? (
              <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                <Text>{user?.email || "User"}</Text>
                <Ionicons
                  name='add-circle'
                  color={"#afafa"}
                  size={30}
                  onPress={() => router.push('/createRecipe')}
                />
              </View>
            ) : null
          ) : (
            <Pressable onPress={() => router.push("/login/login")}>
              <Text style={styles.btnText}>Login</Text>
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#0000ff"]}
            tintColor="#0000ff"
          />
        }
      >
        {recipe.map((r) => (
          <View key={r._id}>
            <Recipe
              title={r.title}
              ingredients={r.ingredients}
              instructions={r.instructions}
              image={r.image}
              onPress={() => router.push(`/recipeDetail?id=${r._id}`)} // ✅ navigation added
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TopRecipe;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "blue",
  },
});
