import CardProjects from '@/components/card-projects';
import CardTask from '@/components/card-task';
import { useRouter } from 'expo-router';
import { AlignLeft, CircleUserRound, Plus } from 'lucide-react-native';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const tasks = [
  {
    id: '1',
    title: 'Design System Updates',
    deadline: 'October 24, 2024',
    priority: 'high',
    status: 'in-progress',
    description: 'Update the design system components to match the new brand guidelines.',
  },
  {
    id: '2',
    title: 'Client Meeting',
    deadline: 'October 24, 2024',
    priority: 'medium',
    status: 'pending',
    description: 'Review project progress and discuss next steps with the client.',
  },
  {
    id: '3',
    title: 'Code Review',
    deadline: 'October 24, 2024',
    priority: 'low',
    status: 'completed',
    description: 'Review pull requests and provide feedback to team members.',
  },
];

type TaskCategory = 'all' | 'in-progress' | 'completed';

export default function HomeScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<TaskCategory>('all');

  const filteredTasks = tasks.filter(task => {
    if (activeCategory === 'all') return true;
    return task.status === activeCategory;
  });

  const taskStats = {
    all: tasks.length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          {/* <AlignLeft size={32} color="#324646" /> */}
          <TouchableOpacity>
            <TouchableOpacity 
              style={{
              backgroundColor: '#324646',
              borderRadius: 50,
              paddingVertical: 10,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              }}
              onPress={() => router.push('/new-project')}
            >
                <Plus size={16} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={{ fontSize: 16, color: '#FFF' }}> New Project</Text>
            </TouchableOpacity>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/profile')}>
            <CircleUserRound size={32} color="#324646" />
          </TouchableOpacity>
        </View>

        <View style={styles.onboarding}>
          <Text style={styles.title}>Hello, Vinicius!</Text>
          <Text style={styles.subtitle}>Let's be productive today.</Text>
        </View>

        <View style={styles.listBadges}>
          <TouchableOpacity 
            style={[styles.badge, activeCategory === 'all' && styles.badgeActive]}
            onPress={() => setActiveCategory('all')}
          >
            <Text style={[styles.textBadge, activeCategory === 'all' && styles.textBadgeActive]}>
              My Tasks
            </Text>
            <View style={[styles.countBadge, activeCategory === 'all' && styles.countBadgeActive]}>
              <Text style={[styles.countText, activeCategory === 'all' && styles.countTextActive]}>
                {taskStats.all}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.badge, activeCategory === 'in-progress' && styles.badgeActive]}
            onPress={() => setActiveCategory('in-progress')}
          >
            <Text style={[styles.textBadge, activeCategory === 'in-progress' && styles.textBadgeActive]}>
              In Progress
            </Text>
            <View style={[styles.countBadge, activeCategory === 'in-progress' && styles.countBadgeActive]}>
              <Text style={[styles.countText, activeCategory === 'in-progress' && styles.countTextActive]}>
                {taskStats['in-progress']}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.badge, activeCategory === 'completed' && styles.badgeActive]}
            onPress={() => setActiveCategory('completed')}
          >
            <Text style={[styles.textBadge, activeCategory === 'completed' && styles.textBadgeActive]}>
              Completed
            </Text>
            <View style={[styles.countBadge, activeCategory === 'completed' && styles.countBadgeActive]}>
              <Text style={[styles.countText, activeCategory === 'completed' && styles.countTextActive]}>
                {taskStats.completed}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.projectsSection}>
          <Text style={styles.sectionTitle}>Active Projects</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.projectsScroll}
          >
            <CardProjects />
            <CardProjects />
          </ScrollView>
        </View>

        <View style={styles.tasksSection}>
          <Text style={styles.sectionTitle}>
            {activeCategory === 'all' ? 'All Tasks' : 
             activeCategory === 'in-progress' ? 'In Progress' : 'Completed Tasks'}
          </Text>
          <View style={styles.tasksList}>
            {filteredTasks.map((task) => (
              <CardTask
                key={task.id}
                titulo={task.title}
                prazo={task.deadline}
                prioridade={
                  task.priority === 'low' ? 'baixa' :
                  task.priority === 'medium' ? 'media' : 'alta'
                }
                status={
                  task.status === 'pending' ? 'pendente' :
                  task.status === 'in-progress' ? 'em-progresso' : 'concluido'
                }
                etiquetasPrioridade={
                  task.priority === 'low' ? 'baixa' :
                  task.priority === 'medium' ? 'media' : 'alta'
                }
                etiquetasStatus={
                  task.status === 'pending' ? 'pendente' :
                  task.status === 'in-progress' ? 'em-progresso' : 'concluido'
                }
                aoPressionar={() => router.push(`/${task.id}`)} // Certifique-se de que o ID está correto
              />
            ))}
            {filteredTasks.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyStateText}>No tasks found</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    // marginBottom: 22,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#324646'
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  onboarding: {
    marginTop: 30,
    marginBottom: 32,
  },
  listBadges: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  badge: {
    backgroundColor: '#E8E8E8',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '80%',
  },
  badgeActive: {
    backgroundColor: '#324646',
    // width: '100%',
  },
  textBadge: {
    color: '#324646',
    fontWeight: '600',
    fontSize: 12,
  },
  textBadgeActive: {
    color: '#FFF',
  },
  countBadge: {
    backgroundColor: '#FFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  countBadgeActive: {
    backgroundColor: '#E8F1F9',
  },
  countText: {
    color: '#324646',
    fontWeight: '600',
    fontSize: 12,
  },
  countTextActive: {
    color: '#324646',
  },
  projectsSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#324646',
    marginBottom: 16,
  },
  projectsScroll: {
    paddingRight: 20,
  },
  tasksSection: {
    flex: 1,
  },
  tasksList: {
    gap: 16,
  },
  emptyState: {
    padding: 32,
    backgroundColor: '#FFF',
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#666',
    fontSize: 16,
  },
});