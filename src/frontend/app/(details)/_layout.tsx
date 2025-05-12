import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="snackDetails" options={{
      title: "SNACK DETAILS"
    }} />
  </Stack>;
}
