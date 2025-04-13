import { Stack } from 'expo-router';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="project/[id]" options={{ presentation: 'card' }} />
      <Stack.Screen name="new-task" options={{ title: 'New Task' }} />
      <Stack.Screen name="privacy-policy" options={{ title: 'Política de Privacidade' }} />
      <Stack.Screen name="[id]" options={{ title: 'Detalhes da Tarefa' }} />
      <Stack.Screen name="edit-profile" options={{ presentation: 'modal' }} />
      <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
    </Stack>
  );
}