import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MoveLeft, Shield, Lock, Eye, UserCheck } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const sections = [
  {
    title: 'Informações que Coletamos',
    icon: Shield,
    content: `Coletamos informações que você fornece diretamente para nós, incluindo:
• Informações da conta (nome, email, senha)
• Dados de tarefas e projetos
• Informações de uso e preferências
• Informações e identificadores do dispositivo`,
  },
  {
    title: 'Como Usamos Suas Informações',
    icon: Lock,
    content: `Suas informações nos ajudam a:
• Fornecer e melhorar nossos serviços
• Personalizar sua experiência
• Enviar atualizações e notificações importantes
• Analisar o desempenho do aplicativo e padrões de uso
• Garantir a segurança da conta`,
  },
  {
    title: 'Proteção de Dados',
    icon: Eye,
    content: `Implementamos medidas de segurança rigorosas para proteger seus dados:
• Criptografia de ponta a ponta para dados sensíveis
• Auditorias e atualizações de segurança regulares
• Armazenamento e transmissão de dados seguros
• Controles de acesso e autenticação
• Procedimentos regulares de backup`,
  },
  {
    title: 'Seus Direitos',
    icon: UserCheck,
    content: `Você tem o direito de:
• Acessar seus dados pessoais
• Solicitar correção ou exclusão de dados
• Optar por não receber comunicações de marketing
• Exportar seus dados
• Encerrar sua conta a qualquer momento`,
  },
];

export default function PrivacyPolicyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MoveLeft size={24} color="#324646" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Política de Privacidade</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Text style={styles.lastUpdated}>Última atualização: 15 de março de 2024</Text>
          
          <Text style={styles.introduction}>
            Levamos sua privacidade a sério e estamos comprometidos em proteger suas informações pessoais. Esta política explica como coletamos, usamos e protegemos seus dados.
          </Text>

          {sections.map((section, index) => (
            <View key={index} style={styles.section}>
              <View style={styles.sectionHeader}>
                <View style={styles.iconContainer}>
                  <section.icon size={24} color="#324646" />
                </View>
                <Text style={styles.sectionTitle}>{section.title}</Text>
              </View>
              <Text style={styles.sectionContent}>{section.content}</Text>
            </View>
          ))}

          <View style={styles.contactSection}>
            <Text style={styles.contactTitle}>Fale Conosco</Text>
            <Text style={styles.contactText}>
              Se você tiver alguma dúvida sobre nossa Política de Privacidade, entre em contato conosco em:
            </Text>
            <Text style={styles.email}>privacidade@taskmanager.com</Text>
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
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
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
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  introduction: {
    fontSize: 16,
    color: '#324646',
    lineHeight: 24,
    marginBottom: 32,
  },
  section: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F4F4F4',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#324646',
  },
  sectionContent: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  contactSection: {
    backgroundColor: '#324646',
    borderRadius: 16,
    padding: 20,
    marginTop: 12,
    marginBottom: 32,
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFF',
    marginBottom: 12,
  },
  contactText: {
    fontSize: 15,
    color: '#FFF',
    opacity: 0.8,
    lineHeight: 24,
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '500',
  },
});