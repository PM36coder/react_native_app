import { Image, Pressable, Text, View, StyleSheet } from "react-native";

type RecipeCardProp = {
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
  onPress?: () => void;
};

const Recipe = ({ title, ingredients, instructions, image, onPress }: RecipeCardProp) => {
  return (
    <Pressable onPress={onPress} >
      <View style={styles.card}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>

          {ingredients.map((ing, index) => (
            <Text style={styles.ingredient} key={index}>
              • {ing}
            </Text>
          ))}

          <Text style={styles.instructionsLabel}>Instructions:</Text>
          <Text style={styles.instructions}>{instructions}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default Recipe;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    overflow:"scroll",
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    marginTop:40
  },
  image: {
    height: 180,
    width: "100%",
    borderRadius: 10,
  },
  content: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "blue",
    marginBottom: 5,
  },
  ingredient: {
    fontSize: 14,
    marginLeft: 5,
    color: "red",
  },
  instructionsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    color: "grey",
  },
  instructions: {
    fontSize: 13,
    color: "orange",
  },
});
