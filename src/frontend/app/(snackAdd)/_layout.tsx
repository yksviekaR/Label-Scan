import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="snackAdd" options={{
      title: "SNACK ADD"
    }} />
  </Stack>;
}
