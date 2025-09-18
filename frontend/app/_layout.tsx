import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/context/contextApi";

function ProtectedStack() {
  const { token } = useAuth();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)/login/login" />
      <Stack.Screen name="(auth)/signup/signup" />

      {/* Protected Routes */}
      {token && (
        <>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="createRecipe" options={{presentation:'modal'}}/>
        </>
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
