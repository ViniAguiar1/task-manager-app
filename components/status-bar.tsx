import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

interface SpendingCategory {
  name: string;
  amount: number;
  color: string;
}

export default function StatusBar() {
  const totalBudget = 20000.00;
  const categories: SpendingCategory[] = [
    { name: 'Subscription', amount: 8221.00, color: '#000000' },
    { name: 'Friend & Family', amount: 4300.10, color: '#2C3E3E' },
  ];

  const totalSpent = categories.reduce((sum, cat) => sum + cat.amount, 0);
  const remainingAmount = totalBudget - totalSpent;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Spending Overview</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>{formatCurrency(totalSpent)}</Text>
            <Text style={styles.totalBudget}>From {formatCurrency(totalBudget)}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            {categories.map((category, index) => (
              <View
                key={index}
                style={[
                  styles.progressSegment,
                  {
                    backgroundColor: category.color,
                    width: `${(category.amount / totalBudget) * 100}%`,
                  },
                ]}
              />
            ))}
            <View
              style={[
                styles.progressSegment,
                {
                  backgroundColor: '#E8F1F9',
                  width: `${(remainingAmount / totalBudget) * 100}%`,
                },
              ]}
            />
          </View>

          <View style={styles.legendContainer}>
            {categories.map((category, index) => (
              <View key={index} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: category.color }]} />
                <View style={styles.legendText}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryAmount}>
                    {formatCurrency(category.amount)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
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
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  amount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#324646',
  },
  totalBudget: {
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    gap: 24,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#E8F1F9',
    borderRadius: 6,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressSegment: {
    height: '100%',
  },
  legendContainer: {
    gap: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    color: '#324646',
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#324646',
  },
});