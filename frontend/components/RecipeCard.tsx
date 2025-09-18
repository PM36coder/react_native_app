import { Image, Text, View } from "react-native";

type RecipeCardProp = {
  title: string;
  ingredients: string[];
  instructions: string;
  image: string;
};

const Recipe = ({ title, ingredients, instructions, image }: RecipeCardProp) => {
  return (
    <View style={{
      backgroundColor: "white",
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 20,
      elevation: 3, // Android shadow
      shadowColor: "#000", // iOS shadow
      shadowOpacity: 0.2,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 }
    }}>
      <Image
        source={{ uri: image }}
        style={{ height: 180, width: "100%", borderRadius:10 }}
        resizeMode="cover"
      />
      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "blue"  ,marginBottom:5}}>
          {title}
        </Text>

        {ingredients.map((ing, index) => (
          <Text style={{ fontSize: 14, marginLeft: 5, color: "red" }} key={index}>
            • {ing}
          </Text>
        ))}

        <Text style={{ fontSize: 16, fontWeight: "bold", marginTop: 8, color: "grey" }}>
          Instructions:
        </Text>
        <Text style={{ fontSize: 13, color: "orange" }}>{instructions}</Text>
      </View>
    </View>
  );
};

export default Recipe;
