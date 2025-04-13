import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Brain, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path } from 'react-native-svg';
import { useState } from 'react';
import { useRouter } from 'expo-router';

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
  },
];

export default function CardProjects() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setActiveIndex(roundIndex);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.carouselContainer}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContent}
        >
          {projects.map((project, idx) => (
            <TouchableOpacity 
              key={project.id} 
              style={styles.container}
              onPress={() => router.push(`/project/${project.id}`)}
            >
              <LinearGradient
                colors={project.color}
                style={styles.gradient}
              />
              
              <Svg style={styles.patternOverlay} width="240" height="180" viewBox="0 0 240 180">
                {[40, 60, 80].map((y, i) => (
                  <Path
                    key={i}
                    d={`M220 ${y}C180 ${y} 160 ${y + 100} 120 ${y + 100}S60 ${y} 20 ${y}`}
                    stroke={`rgba(255,255,255,${0.1 - i * 0.02})`}
                    strokeWidth="1"
                    fill="none"
                  />
                ))}
              </Svg>

              <View style={styles.content}>
                <View style={styles.header}>
                  <View style={styles.iconContainer}>
                    <Brain size={24} color="#FFF" />
                  </View>
                  <Text style={styles.title}>{project.title}</Text>
                </View>

                <View style={styles.onboarding}>
                  <Text style={styles.title2}>{project.type}</Text>
                  <Text style={styles.title2}>{project.subtype}</Text>
                </View>

                <View style={styles.footer}>
                  <Text style={styles.date}>{project.date}</Text>
                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill,
                          { width: `${(project.completedTasks / project.tasksCount) * 100}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {project.completedTasks}/{project.tasksCount} tasks
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}

          <TouchableOpacity 
            style={styles.newProjectCard}
            onPress={() => router.push('/new-project')}
          >
            <View style={styles.newProjectContent}>
              <View style={styles.plusIconContainer}>
                <Plus size={32} color="#324646" />
              </View>
              <Text style={styles.newProjectText}>Create New Project</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.pagination}>
          {[...projects, { id: 'new' }].map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.paginationDot,
                idx === activeIndex && styles.paginationDotActive,
              ]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F4F4F4',
  },
  carouselContainer: {
    position: 'relative',
  },
  scrollContent: {
    paddingRight: 20,
  },
  container: {
    width: 240,
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 20,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  patternOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    opacity: 0.5,
  },
  content: {
    padding: 20,
    height: '100%',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 8,
    borderRadius: 12,
  },
  onboarding: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    opacity: 0.9,
  },
  title2: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    lineHeight: 32,
  },
  footer: {
    gap: 8,
  },
  date: {
    fontSize: 14,
    color: '#FFF',
    opacity: 0.5,
  },
  progressContainer: {
    gap: 6,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFF',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#FFF',
    opacity: 0.7,
  },
  newProjectCard: {
    width: 240,
    height: 180,
    borderRadius: 16,
    backgroundColor: '#FFF',
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  newProjectContent: {
    alignItems: 'center',
    gap: 16,
  },
  plusIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F4F4F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newProjectText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#324646',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#D9D9D9',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#324646',
    width: 24,
  },
});