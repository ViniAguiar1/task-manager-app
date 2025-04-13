import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Grip, Settings2, Bell, Shield, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { Image } from 'react-native';
import { useRouter } from 'expo-router';
import StatusBar from '@/components/status-bar';
import InviteUser from '@/components/invite-user';

const { width } = Dimensions.get('window');

const menuItems = [
  {
    icon: Settings2,
    title: 'Configurações',
    subtitle: 'Preferências do app e configurações da conta',
    route: '/settings',
  },
  {
    icon: Bell,
    title: 'Notificações',
    subtitle: 'Gerencie suas preferências de notificação',
    route: '/settings/notifications',
  },
  {
    icon: Shield,
    title: 'Privacidade',
    subtitle: 'Controle suas configurações de privacidade',
    route: '/settings/privacy',
  },
  {
    icon: HelpCircle,
    title: 'Ajuda e Suporte',
    subtitle: 'Obtenha ajuda para usar o app',
    route: '/settings/help',
  },
];

const stats = [
  { label: 'Tarefas Criadas', value: '127' },
  { label: 'Concluídas', value: '89' },
  { label: 'Em Progresso', value: '38' },
];

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.profilePage}>Perfil</Text>
            <Grip size={32} color="#324646" />
          </View>

          <View style={styles.profileSection}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://github.com/ViniAguiar1.png' }}
                style={styles.image}
                resizeMode="cover"
              />
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => router.push('/edit-profile')}
              >
                <Text style={styles.editButtonText}>Editar Perfil</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.name}>Vinicius Aguiar📿</Text>
            <Text style={styles.email}>vinicius@example.com</Text>
          </View>

          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>

          <View style={styles.menuSection}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.menuItem}
                onPress={() => router.push(item.route as any)}
              >
                <View style={styles.menuIconContainer}>
                  <item.icon size={24} color="#324646" />
                </View>
                <View style={styles.menuTextContainer}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={{ gap: 20 }}>
            <InviteUser />
          </View>

          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={24} color="#FF4B4B" />
            <Text style={styles.logoutText}>Sair</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4'
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profilePage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#324646',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#324646',
    marginBottom: 16,
  },
  editButton: {
    backgroundColor: '#324646',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#324646',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#324646',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  menuSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 8,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#324646',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFE5E5',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF4B4B',
  },
});