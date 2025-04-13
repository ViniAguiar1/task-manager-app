import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { MoveLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as Notifications from 'expo-notifications';

const notificationSettings = [
  {
    title: 'Lembretes de Tarefas',
    items: [
      // { label: 'Alertas de Data de Vencimento', key: 'dueDate' },
      { label: 'Lembretes de Hora de Início', key: 'startTime' },
      // { label: 'Resumo Diário', key: 'dailySummary' },
    ]
  },
  {
    title: 'Atualizações',
    items: [
      // { label: 'Comentários em Tarefas', key: 'comments' },
      { label: 'Mudanças no Status da Tarefa', key: 'status' },
      { label: 'Novos Recursos', key: 'features' },
    ]
  }
];

export default function NotificationsScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    dueDate: true,
    startTime: true,
    dailySummary: false,
    comments: true,
    status: true,
    features: true,
  });

  const toggleSwitch = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof settings]
    }));
  };

  const checkNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      if (newStatus !== 'granted') {
        Alert.alert(
          'Permissão Necessária',
          'As notificações estão desativadas. Por favor, habilite-as nas configurações do dispositivo.'
        );
      }
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MoveLeft size={24} color="#324646" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notificações</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* <TouchableOpacity style={styles.permissionButton} onPress={checkNotificationPermissions}>
          <Text style={styles.permissionButtonText}>Verificar Permissões</Text>
        </TouchableOpacity> */}

        <ScrollView style={styles.content}>
          {notificationSettings.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{group.title}</Text>
              <View style={styles.sectionContent}>
                {group.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.settingItem}>
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Switch
                      value={settings[item.key as keyof typeof settings]}
                      onValueChange={() => toggleSwitch(item.key)}
                      trackColor={{ false: '#E0E0E0', true: '#324646' }}
                      thumbColor="#FFF"
                    />
                  </View>
                ))}
              </View>
            </View>
          ))}

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Sobre Notificações</Text>
            <Text style={styles.infoText}>
              Enviaremos notificações para ajudá-lo a se manter em dia com suas tarefas e nunca perder atualizações importantes. 
              Você pode personalizar suas preferências de notificação a qualquer momento.
            </Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#324646',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
  },
  settingLabel: {
    fontSize: 16,
    color: '#324646',
  },
  infoSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#324646',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  permissionButton: {
    backgroundColor: '#324646',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  permissionButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});