import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MoveLeft, Calendar, Clock, Palette, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const colorSchemes = [
  ['#324646', '#1A2424'],
  ['#3E3E4E', '#24243A'],
  ['#463246', '#241A24'],
  ['#464632', '#242415'],
  ['#324646', '#1A2424'],
  ['#463232', '#241A1A'],
];

export default function NewProjectScreen() {
  const router = useRouter();
  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    selectedColor: colorSchemes[0],
  });

  const handleCreateProject = () => {
    // Here you would typically save the project data
    console.log('Creating project:', projectData);
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MoveLeft size={24} color="#324646" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>New Project</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <X size={24} color="#324646" />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.label}>Project Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter project title"
              value={projectData.title}
              onChangeText={(text) => setProjectData(prev => ({ ...prev, title: text }))}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe your project"
              multiline
              numberOfLines={4}
              value={projectData.description}
              onChangeText={(text) => setProjectData(prev => ({ ...prev, description: text }))}
            />
          </View>

          <View style={styles.dateSection}>
            <View style={styles.dateField}>
              <Text style={styles.label}>Start Date</Text>
              <View style={styles.dateInput}>
                <Calendar size={20} color="#666" />
                <TextInput
                  style={styles.dateText}
                  placeholder="Select date"
                  value={projectData.startDate}
                  onChangeText={(text) => setProjectData(prev => ({ ...prev, startDate: text }))}
                />
              </View>
            </View>

            <View style={styles.dateField}>
              <Text style={styles.label}>End Date</Text>
              <View style={styles.dateInput}>
                <Clock size={20} color="#666" />
                <TextInput
                  style={styles.dateText}
                  placeholder="Select date"
                  value={projectData.endDate}
                  onChangeText={(text) => setProjectData(prev => ({ ...prev, endDate: text }))}
                />
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Color Scheme</Text>
            <View style={styles.colorGrid}>
              {colorSchemes.map((colors, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    projectData.selectedColor === colors && styles.colorOptionSelected
                  ]}
                  onPress={() => setProjectData(prev => ({ ...prev, selectedColor: colors }))}
                >
                  <View
                    style={[
                      styles.colorPreview,
                      {
                        backgroundColor: colors[0],
                      }
                    ]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.createButton,
              !projectData.title && styles.createButtonDisabled
            ]}
            onPress={handleCreateProject}
            disabled={!projectData.title}
          >
            <Text style={styles.createButtonText}>Create Project</Text>
          </TouchableOpacity>
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
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#324646',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#324646',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  dateSection: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  dateField: {
    flex: 1,
  },
  dateInput: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dateText: {
    flex: 1,
    fontSize: 16,
    color: '#324646',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingVertical: 8,
  },
  colorOption: {
    padding: 3,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: '#324646',
  },
  colorPreview: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  createButton: {
    backgroundColor: '#324646',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  createButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});