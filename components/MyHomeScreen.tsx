import { useTheme } from '@/core/theme/ThemeProvider';
import { useEcho } from '@/hooks';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function MyHomeScreen() {
  const { theme } = useTheme();
  const { postToEcho } = useEcho();
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState<any>(null);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Echo Uygulaması
      </Text>
      
      <TextInput
        style={[styles.input, { 
          borderColor: theme.primary,
          color: theme.text,
        }]}
        placeholder="Mesajınızı yazın..."
        placeholderTextColor={theme.text + '80'}
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={() => postToEcho(message, () => setMessage(''), setResponse)}
      >
        <Text style={styles.buttonText}>
          Gönder
        </Text>
      </TouchableOpacity>

      {response && (
        <View style={styles.responseContainer}>
          <Text style={[styles.responseLabel, { color: theme.primary }]}>
            Sunucu Cevabı:
          </Text>
          <Text style={[styles.responseText, { color: theme.text }]}>
            {JSON.stringify(response.received, null, 2)}
          </Text>
        </View>
      )}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    minHeight: 120,
    borderWidth: 2,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseContainer: {
    width: '100%',
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  responseLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  responseText: {
    fontSize: 14,
    fontFamily: 'monospace',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    borderRadius: 4,
  },
});