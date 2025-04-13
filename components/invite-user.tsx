import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { UserRoundPlus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path } from 'react-native-svg';

export default function InviteUser() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#2C3E3E', '#1A2424']}
        style={styles.gradient}
      />
      
      <Svg style={styles.patternOverlay} width="100%" height="100%" viewBox="0 0 400 200">
        {[40, 60, 80].map((y, i) => (
          <Path
            key={i}
            d={`M380 ${y}C300 ${y} 260 ${y + 120} 200 ${y + 120}S100 ${y} 20 ${y}`}
            stroke={`rgba(255,255,255,${0.1 - i * 0.02})`}
            strokeWidth="1"
            fill="none"
          />
        ))}
      </Svg>

      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.textContainer}>
            <Text style={styles.inviteUser}>Convide Amigos</Text>
            <Text style={styles.description}>
              Convide seus amigos para usar o aplicativo e ganhem recompensas juntos!
            </Text>
          </View>
          <View style={styles.iconContainer}>
            <UserRoundPlus size={32} color="#FFF" style={styles.icon} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
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
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    paddingRight: 16,
  },
  inviteUser: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 8,
    opacity: 0.9,
  },
  description: {
    fontSize: 16,
    color: '#FFF',
    lineHeight: 24,
    opacity: 0.7,
  },
  iconContainer: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    padding: 12,
    borderRadius: 12,
  },
  icon: {
    opacity: 0.9,
  },
});