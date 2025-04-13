import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MoveLeft, Bell, Shield, CircleHelp, ChevronRight, Moon, Globe, Smartphone, Volume2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const settingsGroups = [
  {
    title: 'Preferências',
    items: [
      // { icon: Moon, label: 'Modo Escuro', value: 'Desligado' },
      { icon: Globe, label: 'Idioma', value: 'Português' },
      { icon: Smartphone, label: 'Versão do App', value: '1.0.0' },
      { icon: Volume2, label: 'Efeitos Sonoros', value: 'Ligado' },
    ]
  },
  {
    title: 'Conta',
    items: [
      { icon: Bell, label: 'Notificações', route: '/settings/notifications' },
      { icon: Shield, label: 'Privacidade', route: '/settings/privacy' },
      { icon: CircleHelp, label: 'Ajuda e Suporte', route: '/settings/help' },
    ]
  }
];

export default function SettingsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MoveLeft size={24} color="#324646" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configurações</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {settingsGroups.map((group, groupIndex) => (
            <View key={groupIndex} style={styles.group}>
              <Text style={styles.groupTitle}>{group.title}</Text>
              <View style={styles.groupContent}>
                {group.items.map((item, itemIndex) => (
                  <TouchableOpacity
                    key={itemIndex}
                    style={styles.settingItem}
                    onPress={() => item.route && router.push(item.route)}>
                    <View style={styles.settingLeft}>
                      <View style={styles.iconContainer}>
                        <item.icon size={20} color="#324646" />
                      </View>
                      <Text style={styles.settingLabel}>{item.label}</Text>
                    </View>
                    <View style={styles.settingRight}>
                      {item.value ? (
                        <Text style={styles.settingValue}>{item.value}</Text>
                      ) : (
                        <ChevronRight size={20} color="#666" />
                      )}
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ))}
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
  group: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    marginLeft: 4,
  },
  groupContent: {
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
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
});