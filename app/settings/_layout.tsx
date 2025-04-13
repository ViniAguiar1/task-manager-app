import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="notifications" 
        options={{ headerShown: false }}
      />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="help" />
    </Stack>
  );
}