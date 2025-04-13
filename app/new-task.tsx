import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { MoveLeft, Search } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

const categories = [
  'Design',
  'Meeting',
  'Coding',
  'BDE',
  'Testing',
  'Quick call'
];

const locations = [
  'Home',
  'Work',
  'Vacation'
];

const { width } = Dimensions.get('window');
const ITEM_WIDTH = 120;
const SPACING = 10;

export default function NewTaskScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Design');
  const [selectedLocation, setSelectedLocation] = useState('Home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" backgroundColor="#324646" />
      <View style={styles.container}>
        <View style={styles.header}>
          <MoveLeft size={24} color="#FFF" onPress={() => router.back()} />
          <Text style={styles.headerTitle}>Create a Task</Text>
          <Search size={24} color="#FFF" />
        </View>

        <View style={styles.content}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              defaultValue="Design Changes"
              placeholderTextColor="#AAA"
            />

            <Text style={styles.label}>Date</Text>
            <TextInput
              style={styles.input}
              defaultValue="Oct 24, 2020"
              placeholderTextColor="#AAA"
            />
          </ScrollView>
        </View>

        <View style={styles.bottomSheet}>
          <View style={styles.timeContainer}>
            <View style={styles.timeBlock}>
              <Text style={styles.bottomLabel}>Start Time</Text>
              <TextInput
                style={styles.bottomInput}
                defaultValue="01:22 pm"
                placeholderTextColor="#666"
              />
            </View>
            <View style={styles.timeBlock}>
              <Text style={styles.bottomLabel}>End Time</Text>
              <TextInput
                style={styles.bottomInput}
                defaultValue="03:20 pm"
                placeholderTextColor="#666"
              />
            </View>
          </View>

          <Text style={styles.bottomLabel}>Description</Text>
          <TextInput
            style={[styles.bottomInput, styles.textArea]}
            multiline
            numberOfLines={4}
            defaultValue="Lorem ipsum dolor sit amet, er adipiscing elit, sed dianummy nibh euismod dolor sit amet, er adipiscing elit, sed dianummy nibh euismod."
            placeholderTextColor="#666"
          />

          <Text style={styles.bottomLabel}>Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
            snapToInterval={ITEM_WIDTH + SPACING}
            decelerationRate="fast"
            style={{ paddingBottom: 34 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.categoryTextActive
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* <Text style={styles.bottomLabel}>Location</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryScroll}
            snapToInterval={ITEM_WIDTH + SPACING}
            decelerationRate="fast"
          >
            {locations.map((location) => (
              <TouchableOpacity
                key={location}
                style={[
                  styles.categoryButton,
                  selectedLocation === location && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedLocation(location)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedLocation === location && styles.categoryTextActive
                  ]}
                >
                  {location}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView> */}

          <TouchableOpacity style={styles.createButton}>
            <Text style={styles.createButtonText}>Create Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#324646'
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
    opacity: 0.7,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 8,
    marginBottom: 24,
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 24,
  },
  timeBlock: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingTop: 32,
    height: '70%',
    marginBottom: -32,
  },
  bottomLabel: {
    fontSize: 16,
    color: '#324646',
    marginBottom: 8,
    opacity: 0.7,
  },
  bottomInput: {
    borderBottomWidth: 1,
    borderColor: 'rgba(50, 70, 70, 0.2)',
    color: '#324646',
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 8,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    lineHeight: 24,
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 24,
  },
  categoryScroll: {
    paddingVertical: 8,
    gap: SPACING,
    paddingRight: width - ITEM_WIDTH - 24,
  },
  categoryButton: {
    width: ITEM_WIDTH,
    paddingVertical: 12,
    borderRadius: 100,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
    height: 45,
  },
  categoryButtonActive: {
    backgroundColor: '#324646',
  },
  categoryText: {
    color: '#324646',
    fontSize: 16,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  createButton: {
    backgroundColor: '#324646',
    paddingVertical: 16,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 32,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});