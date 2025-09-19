import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/context/contextApi";

function ProtectedStack() {
  const { token } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Public routes */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />

      {/* Protected routes */}
      {token ? (
        <>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
        name="createRecipe" 
        options={{ 
          presentation: 'modal',        // Modal style
          headerShown: true,
          headerTitle: 'Create Recipe',
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          }
        }} 
      />
        </>
      ) : (
        <Stack.Screen name="index" />
      )}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ProtectedStack />
    </AuthProvider>
  );
}
