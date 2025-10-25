import { ApiService, EchoService } from '@/core/api';
import { Alert } from 'react-native';

export const useEcho = () => {
  const postToEcho = async (
    message: string, 
    onSuccess?: () => void, 
    onResponse?: (response: any) => void
  ) => {
    if (!message.trim()) {
      Alert.alert('Uyarı', 'Lütfen bir mesaj yazın');
      return;
    }

    try {
      const response = await EchoService.sendMessage(message);
      Alert.alert('Başarılı!', `Mesajınız gönderildi: ${response.received.message}`);
      onSuccess?.(); // Input'u temizlemek için callback çağır
      onResponse?.(response); // Response'u UI'ya gönder
      return response;
    } catch (error) {
      Alert.alert('Hata', 'Mesaj gönderilemedi. Tekrar deneyin.');
      console.error('Echo hook error:', error);
    }
  };

  const getUsers = async <T>(): Promise<T | void> => {
    try {
      const users = await ApiService.getUsers<T>();
      return users;
    } catch (error) {
      Alert.alert('Hata', 'Kullanıcılar alınamadı.');
      console.error('Get users error:', error);
    }
  };

  return { postToEcho, getUsers };
};