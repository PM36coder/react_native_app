import { Tabs,Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/contextApi";


export default function TabLayout() {
  const { user } = useAuth();

  if (!user) return <Redirect href="/(auth)/login/login" />;

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="topRecipe"
        options={{
          title: "Top Recipes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="star" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="myRecipe"
        options={{
          title: "My Recipes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="userSetting"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
