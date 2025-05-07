import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="camera" options={{
      headerShown: false
    }} />
  </Stack>;
}
