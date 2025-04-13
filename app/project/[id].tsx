import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { MoveLeft, Brain, Calendar, Clock, CircleCheck as CheckCircle2 } from 'lucide-react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const projects = [
  {
    id: 1,
    title: 'Design System',
    type: 'Front-End',
    subtype: 'Development',
    date: 'October 20, 2024',
    color: ['#2C3E3E', '#1A2424'] as [string, string],
    tasksCount: 12,
    completedTasks: 5,
    description: 'A comprehensive design system for our web and mobile applications, ensuring consistency across all platforms.',
    status: 'In Progress',
    deadline: 'November 15, 2024',
  },
  {
    id: 2,
    title: 'API Integration',
    type: 'Back-End',
    subtype: 'Development',
    date: 'October 25, 2024',
    color: ['#3E3E4E', '#24243A'] as [string, string],
    tasksCount: 8,
    completedTasks: 3,
    description: 'Integration of third-party APIs and development of internal API endpoints for the platform.',
    status: 'In Progress',
    deadline: 'December 1, 2024',
  },
];

export default function ProjectDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const project = projects.find(p => p.id === Number(id));

  if (!project) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text>Project not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MoveLeft size={24} color="#324646" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Project Details</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.projectCard}>
          <LinearGradient colors={project.color} style={styles.gradient}>
            <View style={styles.cardContent}>
              <View style={styles.iconContainer}>
                <Brain size={32} color="#FFF" />
              </View>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <View style={styles.typeContainer}>
                <Text style={styles.typeText}>{project.type}</Text>
                <Text style={styles.typeText}>{project.subtype}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Calendar size={20} color="#666" />
            <Text style={styles.infoText}>Started {project.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Clock size={20} color="#666" />
            <Text style={styles.infoText}>Due {project.deadline}</Text>
          </View>
          <View style={styles.infoRow}>
            <CheckCircle2 size={20} color="#666" />
            <Text style={styles.infoText}>{project.status}</Text>
          </View>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{project.description}</Text>
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.sectionTitle}>Progress</Text>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill,
                { width: `${(project.completedTasks / project.tasksCount) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {project.completedTasks} of {project.tasksCount} tasks completed
          </Text>
        </View>
      </ScrollView>
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
  projectCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    height: 200,
  },
  gradient: {
    flex: 1,
    padding: 24,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  iconContainer: {
    width: 56,
    height: 56,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginVertical: 16,
  },
  typeContainer: {
    gap: 4,
  },
  typeText: {
    fontSize: 18,
    color: '#FFF',
    opacity: 0.8,
  },
  infoSection: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 20,
    borderRadius: 16,
    gap: 16,
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
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
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
  progressSection: {
    backgroundColor: '#FFF',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F4F4F4',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#324646',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
});