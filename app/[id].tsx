import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { MoveLeft, Clock, CircleAlert as AlertCircle, CircleCheck as CheckCircle2, MessageSquare, Users as Users2, X, Send } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';

const tasks: {
  id: string;
  title: string;
  deadline: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in-progress' | 'completed';
  description: string;
  assignees: string[];
  comments: {
    id: string;
    user: string;
    avatar: string;
    text: string;
    timestamp: string;
  }[];
}[] = [
  {
    id: '1',
    title: 'Atualizações do Sistema de Design',
    deadline: '24 de outubro de 2024',
    priority: 'high',
    status: 'in-progress',
    description: 'Atualize os componentes do sistema de design para corresponder às novas diretrizes da marca.',
    assignees: ['John Doe', 'Jane Smith'],
    comments: [
      {
        id: '1',
        user: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=120',
        text: 'Comecei a trabalhar nas atualizações do sistema de cores.',
        timestamp: '2 horas atrás'
      },
      {
        id: '2',
        user: 'Jane Smith',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
        text: 'As mudanças na tipografia estão ótimas! Vamos revisá-las na próxima reunião.',
        timestamp: '5 horas atrás'
      },
      {
        id: '3',
        user: 'Mike Johnson',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120',
        text: 'Não se esqueça de atualizar as variáveis de espaçamento também.',
        timestamp: '1 dia atrás'
      }
    ]
  },
  {
    id: '2',
    title: 'Reunião com o Cliente',
    deadline: '24 de outubro de 2024',
    priority: 'medium',
    status: 'pending',
    description: 'Revisar o progresso do projeto e discutir os próximos passos com o cliente.',
    assignees: ['Mike Johnson'],
    comments: []
  },
  {
    id: '3',
    title: 'Revisão de Código',
    deadline: '24 de outubro de 2024',
    priority: 'low',
    status: 'completed',
    description: 'Revisar pull requests e fornecer feedback aos membros da equipe.',
    assignees: ['Sarah Wilson', 'Tom Brown'],
    comments: []
  },
];

const priorityColors = {
  low: '#4CAF50',
  medium: '#FF9800',
  high: '#F44336',
};

const statusColors = {
  pending: '#FFC107',
  'in-progress': '#2196F3',
  completed: '#4CAF50',
};

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
];

export default function TaskDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Certifique-se de que o ID está sendo capturado corretamente
  const [task, setTask] = useState(tasks.find(t => t.id === id));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newComment, setNewComment] = useState('');

  if (!task) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Tarefa não encontrada</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleStatusUpdate = (newStatus: string) => {
    setTask(prevTask => ({
      ...prevTask!,
      status: newStatus as 'pending' | 'in-progress' | 'completed'
    }));
    setIsModalVisible(false);
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCommentObj = {
      id: Date.now().toString(),
      user: 'You',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=120',
      text: newComment.trim(),
      timestamp: 'Just now'
    };

    setTask(prevTask => ({
      ...prevTask!,
      comments: [newCommentObj, ...prevTask!.comments]
    }));
    setNewComment('');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MoveLeft size={24} color="#324646" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detalhes da Tarefa</Text>
          <View style={{ width: 24 }} />
        </View>
        
        <View style={styles.content}>
          <Text style={styles.title}>{task.title}</Text>
          
          <View style={styles.badges}>
            <View style={[styles.priorityBadge, { backgroundColor: priorityColors[task.priority] }]}>
              <AlertCircle size={12} color="#FFF" />
              <Text style={styles.priorityText}>{task.priority === 'low' ? 'Baixa' : task.priority === 'medium' ? 'Média' : 'Alta'}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: statusColors[task.status] }]}>
              <CheckCircle2 size={12} color="#FFF" />
              <Text style={styles.statusText}>{task.status === 'pending' ? 'Pendente' : task.status === 'in-progress' ? 'Em Progresso' : 'Concluído'}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={styles.infoRow}>
              <Clock size={20} color="#666" />
              <Text style={styles.infoText}>Vence em {task.deadline}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Users2 size={20} color="#666" />
              <Text style={styles.infoText}>{task.assignees.join(', ')}</Text>
            </View>

            <View style={styles.infoRow}>
              <MessageSquare size={20} color="#666" />
              <Text style={styles.infoText}>{task.comments.length} comentários</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>

          <View style={styles.commentsSection}>
            <Text style={styles.sectionTitle}>Comentários</Text>
            
            <View style={styles.commentInput}>
              <TextInput
                style={styles.input}
                placeholder="Adicione um comentário..."
                value={newComment}
                onChangeText={setNewComment}
                multiline
              />
              <TouchableOpacity 
                style={[
                  styles.sendButton,
                  !newComment.trim() && styles.sendButtonDisabled
                ]}
                onPress={handleAddComment}
                disabled={!newComment.trim()}
              >
                <Send size={20} color={newComment.trim() ? '#FFF' : '#999'} />
              </TouchableOpacity>
            </View>

            <View style={styles.commentsList}>
              {task.comments.map((comment) => (
                <View key={comment.id} style={styles.commentItem}>
                  <View style={styles.commentHeader}>
                    <View style={styles.userInfo}>
                      <View style={styles.avatar}>
                        <Text style={styles.avatarText}>
                          {comment.user.charAt(0)}
                        </Text>
                      </View>
                      <Text style={styles.username}>{comment.user}</Text>
                    </View>
                    <Text style={styles.timestamp}>{comment.timestamp}</Text>
                  </View>
                  <Text style={styles.commentText}>{comment.text}</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity 
            style={styles.updateButton}
            onPress={() => setIsModalVisible(true)}
          >
            <Text style={styles.updateButtonText}>Atualizar Status</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Atualizar Status</Text>
              <TouchableOpacity 
                onPress={() => setIsModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#324646" />
              </TouchableOpacity>
            </View>

            <View style={styles.statusOptions}>
              {statusOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.statusOption,
                    task.status === option.value && styles.statusOptionSelected
                  ]}
                  onPress={() => handleStatusUpdate(option.value)}
                >
                  <View style={[styles.statusDot, { backgroundColor: statusColors[option.value as 'pending' | 'in-progress' | 'completed'] }]} />
                  <Text style={[
                    styles.statusOptionText,
                    task.status === option.value && styles.statusOptionTextSelected
                  ]}>
                    {option.label === 'Pending' ? 'Pendente' : option.label === 'In Progress' ? 'Em Progresso' : 'Concluído'}
                  </Text>
                  {task.status === option.value && (
                    <CheckCircle2 size={20} color="#FFF" />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 18,
    fontWeight: '600',
    color: '#324646',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#324646',
    marginBottom: 16,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  priorityText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 4,
  },
  statusText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  infoSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    gap: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 16,
    color: '#324646',
  },
  descriptionSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#324646',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  updateButton: {
    backgroundColor: '#324646',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  updateButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    minHeight: 300,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#324646',
  },
  closeButton: {
    padding: 4,
  },
  statusOptions: {
    gap: 12,
  },
  statusOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#F4F4F4',
    gap: 12,
  },
  statusOptionSelected: {
    backgroundColor: '#324646',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  statusOptionText: {
    fontSize: 16,
    color: '#324646',
    flex: 1,
  },
  statusOptionTextSelected: {
    color: '#FFF',
  },
  commentsSection: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  commentInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    padding: 12,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#324646',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  commentsList: {
    gap: 16,
  },
  commentItem: {
    gap: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#324646',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#324646',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    fontSize: 16,
    color: '#324646',
    lineHeight: 24,
  },
});