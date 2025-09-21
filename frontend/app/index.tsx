import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  View,
  ScrollView,
  RefreshControl,
  StyleSheet,
  SafeAreaView,
  Text,
  Pressable,
} from "react-native";
import Recipe from "@/components/RecipeCard";
import { useAuth } from "@/context/contextApi";
import { Redirect, useRouter } from "expo-router";

type RecipeCardProp = {
  _id: string;
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
};

export default function App() {
  const [recipe, setRecipe] = useState<RecipeCardProp[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const router = useRouter();
  const {  user } = useAuth();




  // ✅ Fetch recipes only when token exists
  useEffect(() => {
    
      getAllRecipes();
    
  }, []);

  const getAllRecipes = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://192.168.31.193:3000/api/recipe")

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

  if(user){
  return <Redirect href={'/(tabs)/topRecipe'}/>
}
  const onRefresh = () => {
    
      setRefreshing(true);
      getAllRecipes();
   
  };

  // ✅ Loading spinner while fetching data
  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 25, fontWeight: "bold", color: "grey" }}>
            Recipessssss
          </Text>

          {/* ✅ Button toggle based on token */}
         
           
            <Pressable onPress={() => router.push("/login/login")}>
              <Text style={styles.btnText}>Login</Text>
            </Pressable>
          
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
              />
            </View>
          ))}
        </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop:20,
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
