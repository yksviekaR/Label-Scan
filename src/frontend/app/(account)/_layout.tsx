import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="account" options={{
      headerTitle: "Account Details"
    }} />
  </Stack>;
}
