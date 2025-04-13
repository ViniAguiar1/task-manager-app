import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { MoveLeft, Search, Plus, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useMemo } from 'react';
import CardTask from '@/components/card-task';

export default function Tasks() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Generate calendar data
  const calendarData = useMemo(() => {
    const today = new Date();
    const days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const dates = [];
    
    // Get start of week for current date
    const start = new Date(selectedDate);
    start.setDate(start.getDate() - start.getDay());
    
    // Generate week of dates
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(date.getDate() + i);
      dates.push(date);
    }
    
    return { days, dates, today };
  }, [selectedDate]);

  const tasks = [
    {
      id: '1',
      title: 'Atualizações no Sistema de Design',
      deadline: '24 de outubro de 2024',
      priority: 'alta',
      status: 'em-progresso',
      description: 'Atualizar os componentes do sistema de design para corresponder às novas diretrizes da marca.',
    },
    {
      id: '2',
      title: 'Reunião com o Cliente',
      deadline: '24 de outubro de 2024',
      priority: 'média',
      status: 'pendente',
      description: 'Revisar o progresso do projeto e discutir os próximos passos com o cliente.',
    },
    {
      id: '3',
      title: 'Revisão de Código',
      deadline: '24 de outubro de 2024',
      priority: 'baixa',
      status: 'concluido',
      description: 'Revisar pull requests e fornecer feedback para os membros da equipe.',
    },
  ];

  const handlePrevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddTask = () => {
    router.push('/new-task');
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === selectedDate.toDateString();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <MoveLeft size={32} color="#324646" />
          </TouchableOpacity>
          <Search size={32} color="#324646" />
        </View>

        <View style={styles.titleContainer}>
          <View>
            <Text style={styles.title}>{formatMonth(currentMonth)}</Text>
            <Text style={styles.subtitle}>
              {tasks.length} tarefas para hoje
            </Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
            <Plus size={20} color="#FFF" />
            <Text style={styles.addButtonText}>Adicionar Tarefa</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calendar}>
          <View style={styles.monthSelector}>
            <TouchableOpacity onPress={handlePrevMonth}>
              <ChevronLeft size={24} color="#324646" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNextMonth}>
              <ChevronRight size={24} color="#324646" />
            </TouchableOpacity>
          </View>

          <View style={styles.daysRow}>
            {calendarData.days.map((day) => (
              <View key={day} style={styles.dayCell}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))}
          </View>

          <View style={styles.datesRow}>
            {calendarData.dates.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCell,
                  isToday(date) && styles.todayDate,
                  isSelected(date) && styles.selectedDate,
                ]}
                onPress={() => handleDateSelect(date)}>
                <Text
                  style={[
                    styles.dateText,
                    isToday(date) && styles.todayDateText,
                    isSelected(date) && styles.selectedDateText,
                  ]}>
                  {date.getDate()}
                </Text>
                {tasks.length > 0 && (
                  <View style={styles.taskIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.tasksSection}>
          <Text style={styles.sectionTitle}>Tarefas de Hoje</Text>
          <View style={styles.tasksList}>
            {tasks.map((task) => (
              <CardTask
                key={task.id}
                titulo={task.title}
                prazo={task.deadline}
                prioridade={
                  task.priority === 'baixa' ? 'baixa' :
                  task.priority === 'média' ? 'media' : 'alta'
                }
                status={
                  task.status === 'pendente' ? 'pendente' :
                  task.status === 'em-progresso' ? 'em-progresso' : 'concluido'
                }
                etiquetasPrioridade={
                  task.priority === 'baixa' ? 'baixa' :
                  task.priority === 'média' ? 'media' : 'alta'
                }
                etiquetasStatus={
                  task.status === 'pendente' ? 'pendente' :
                  task.status === 'em-progresso' ? 'em-progresso' : 'concluido'
                }
                aoPressionar={() => router.push(`/${task.id}`)} // Ajuste para redirecionar corretamente
              />
            ))}
          </View>
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
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#324646',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#324646',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 50,
    gap: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  calendar: {
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
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  datesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayCell: {
    flex: 1,
    alignItems: 'center',
  },
  dayText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  dateCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    position: 'relative',
  },
  dateText: {
    fontSize: 16,
    color: '#324646',
    fontWeight: '500',
  },
  todayDate: {
    backgroundColor: '#E8F1F9',
  },
  todayDateText: {
    color: '#324646',
    fontWeight: 'bold',
  },
  selectedDate: {
    backgroundColor: '#324646',
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  taskIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#324646',
    position: 'absolute',
    bottom: 4,
  },
  tasksSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#324646',
    marginBottom: 16,
  },
  tasksList: {
    gap: 16,
  },
});