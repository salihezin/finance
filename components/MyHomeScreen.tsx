import { apiClient } from '@/core/api';
import { useTheme } from '@/core/theme/ThemeProvider';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MyHomeScreen() {
  const { theme } = useTheme();
  const [apiResponse, setApiResponse] = useState<string>('');
  const [echoResponse, setEchoResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    testGetEndpoint();
  }, []);

  const testGetEndpoint = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getHome();
      setApiResponse(response);
    } catch (error) {
      Alert.alert('Hata', 'GET endpoint testi başarısız oldu');
      console.error('GET test failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const testPostEndpoint = async () => {
    try {
      setLoading(true);
      const testData = {
        message: 'Ece merhaba!',
        timestamp: new Date().toISOString(),
        test: true,
        deviceInfo: 'Mobile App'
      };
      
      const response = await apiClient.postEcho(testData);
      setEchoResponse(response);
      Alert.alert('Başarılı', 'POST endpoint testi başarılı!');
    } catch (error) {
      Alert.alert('Hata', 'POST endpoint testi başarısız oldu');
      console.error('POST test failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        API Test Ekranı
      </Text>
      
      <Text style={[styles.subtitle, { color: theme.text }]}>
        API&apos;nizi test ediyoruz! 🚀
      </Text>

      {/* GET Response */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.primary }]}>
          GET / Response:
        </Text>
        <Text style={[styles.response, { color: theme.text }]}>
          {apiResponse || 'Yükleniyor...'}
        </Text>
      </View>

      {/* POST Test Button */}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary }]}
        onPress={testPostEndpoint}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Test Ediliyor...' : 'POST /echo Testi Yap'}
        </Text>
      </TouchableOpacity>

      {/* POST Response */}
      {echoResponse && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.primary }]}>
            POST /echo Response:
          </Text>
          <Text style={[styles.response, { color: theme.text }]}>
            {JSON.stringify(echoResponse, null, 2)}
          </Text>
        </View>
      )}

      {/* Refresh Button */}
      <TouchableOpacity
        style={[styles.refreshButton, { borderColor: theme.primary }]}
        onPress={testGetEndpoint}
        disabled={loading}
      >
        <Text style={[styles.refreshButtonText, { color: theme.primary }]}>
          GET Testi Tekrarla
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    width: '100%',
    marginVertical: 15,
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  response: {
    fontSize: 14,
    fontFamily: 'monospace',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    borderRadius: 4,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  refreshButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    borderWidth: 2,
    marginVertical: 10,
  },
  refreshButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});