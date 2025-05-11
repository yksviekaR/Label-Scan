import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="newSnack" options={{
      title: "NEW SNACK"
    }} />
  </Stack>;
}
