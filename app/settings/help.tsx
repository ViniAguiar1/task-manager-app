import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { MoveLeft, MessageSquarePlus, ThumbsUp, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const recommendations = [
  {
    id: 1,
    user: 'Vinicius A.',
    avatar: 'https://github.com/ViniAguiar1.png',
    suggestion: 'Adicione uma visualização de calendário para melhor organização de tarefas',
    votes: 128,
    status: 'Em Progresso',
  },
  {
    id: 2,
    user: 'Maicon R.',
    avatar: 'https://github.com/maiconwte.png',
    suggestion: 'Implemente modelos de tarefas para atividades recorrentes',
    votes: 95,
    status: 'Em Análise',
  },
  {
    id: 3,
    user: 'Artur A.',
    avatar: 'https://github.com/karmake.png',
    suggestion: 'Adicione recursos de colaboração para tarefas em equipe',
    votes: 76,
    status: 'Planejado',
  },
];

export default function HelpScreen() {
  const router = useRouter();
  const [suggestion, setSuggestion] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MoveLeft size={24} color="#324646" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ajuda & Feedback</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.suggestionInput}>
            <Text style={styles.sectionTitle}>Compartilhe Suas Ideias</Text>
            <Text style={styles.subtitle}>Ajude-nos a melhorar sua experiência</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Digite sua sugestão aqui..."
                multiline
                numberOfLines={4}
                value={suggestion}
                onChangeText={setSuggestion}
              />
              <TouchableOpacity style={styles.submitButton}>
                <MessageSquarePlus size={20} color="#FFF" />
                <Text style={styles.submitButtonText}>Enviar Feedback</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.recommendationsSection}>
            <Text style={styles.sectionTitle}>Sugestões da Comunidade</Text>
            <Text style={styles.subtitle}>Ideias populares dos nossos usuários</Text>
            
            {recommendations.map((item) => (
              <View key={item.id} style={styles.recommendationCard}>
                <View style={styles.recommendationHeader}>
                  <View style={styles.userInfo}>
                    <Image
                      source={{ uri: item.avatar }}
                      style={styles.avatar}
                    />
                    <View style={styles.statusBadge}>
                      <Text style={styles.statusText}>{item.status}</Text>
                    </View>
                    <Text style={styles.userName}>{item.user}</Text>
                  </View>
                  <TouchableOpacity style={styles.voteButton}>
                    <ThumbsUp size={16} color="#324646" />
                    <Text style={styles.voteCount}>{item.votes}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.suggestionText}>{item.suggestion}</Text>
              </View>
            ))}
          </View>

          <View style={styles.rateSection}>
            <Star size={48} color="#324646" />
            <Text style={styles.rateTitle}>Avalie Nosso App</Text>
            <Text style={styles.rateSubtitle}>
              Está gostando de usar nosso app? Nos avalie na loja!
            </Text>
            <TouchableOpacity style={styles.rateButton}>
              <Text style={styles.rateButtonText}>Avaliar Agora</Text>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#324646',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  suggestionInput: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  inputContainer: {
    gap: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#324646',
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#324646',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  recommendationsSection: {
    marginBottom: 24,
  },
  recommendationCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusBadge: {
    backgroundColor: '#E8F1F9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: '#324646',
    fontSize: 12,
    fontWeight: '500',
  },
  userName: {
    fontSize: 14,
    color: '#666',
  },
  voteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  voteCount: {
    fontSize: 14,
    color: '#324646',
    fontWeight: '500',
  },
  suggestionText: {
    fontSize: 16,
    color: '#324646',
    lineHeight: 24,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  rateSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  rateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#324646',
    marginTop: 16,
    marginBottom: 8,
  },
  rateSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  rateButton: {
    backgroundColor: '#324646',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  rateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});