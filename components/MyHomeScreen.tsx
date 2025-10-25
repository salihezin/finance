import { useTheme } from '@/core/theme/ThemeProvider';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MyHomeScreen() {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        My Home Screen
      </Text>
      <Text style={[styles.subtitle, { color: theme.text }]}>
        Welcome to your finance app!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});