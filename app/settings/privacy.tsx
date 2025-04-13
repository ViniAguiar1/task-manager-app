import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { MoveLeft, Lock, Eye, Bell, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const privacySettings = [
  {
    title: 'Privacidade da Conta',
    items: [
      // { label: 'Conta Privada', key: 'privateAccount', icon: Lock },
      { label: 'Mostrar Detalhes das Tarefas', key: 'showTaskDetails', icon: Eye },
      { label: 'Status de Atividade', key: 'activityStatus', icon: Bell },
    ]
  }
];

export default function PrivacyScreen() {
  const router = useRouter();
  const [settings, setSettings] = useState({
    privateAccount: true,
    showTaskDetails: false,
    activityStatus: true,
  });

  const toggleSwitch = (key: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof settings]
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MoveLeft size={24} color="#324646" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacidade</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content}>
          {privacySettings.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.section}>
              <Text style={styles.sectionTitle}>{group.title}</Text>
              <View style={styles.sectionContent}>
                {group.items.map((item, itemIndex) => (
                  <View key={itemIndex} style={styles.settingItem}>
                    <View style={styles.settingLeft}>
                      <View style={styles.iconContainer}>
                        <item.icon size={20} color="#324646" />
                      </View>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                    </View>
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

          <View style={styles.dangerSection}>
            <Text style={styles.dangerTitle}>Zona de Perigo</Text>
            <View style={styles.dangerContent}>
              <TouchableOpacity style={styles.deleteButton}>
                <Trash2 size={20} color="#FF4B4B" />
                <Text style={styles.deleteButtonText}>Excluir Conta</Text>
              </TouchableOpacity>
              <Text style={styles.dangerText}>
                Uma vez que você excluir sua conta, não há como voltar atrás. Por favor, tenha certeza.
              </Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Política de Privacidade</Text>
            <Text style={styles.infoText}>
              Levamos sua privacidade a sério. Seus dados são criptografados e armazenados com segurança. Nunca compartilhamos suas informações pessoais com terceiros sem seu consentimento explícito.
            </Text>
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() => router.push('/privacy-policy')}
            >
              <Text style={styles.learnMoreText}>Saiba Mais</Text>
            </TouchableOpacity>
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
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 16,
    color: '#324646',
  },
  dangerSection: {
    marginBottom: 24,
  },
  dangerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4B4B',
    marginBottom: 12,
    marginLeft: 4,
  },
  dangerContent: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
  },
  deleteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#FF4B4B',
    fontWeight: '600',
  },
  dangerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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
    marginBottom: 16,
  },
  learnMoreButton: {
    alignSelf: 'flex-start',
  },
  learnMoreText: {
    fontSize: 14,
    color: '#324646',
    fontWeight: '600',
  },
});