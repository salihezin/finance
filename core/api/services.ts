import { apiClient } from '../api/client';

export class ApiService {
  static async getHomeMessage(): Promise<string> {
    try {
      return await apiClient.getHome();
    } catch (error) {
      console.error('ApiService: getHomeMessage failed', error);
      throw new Error('Ana sayfa mesajı alınamadı');
    }
  }

  static async postEcho<T>(data: T): Promise<{ received: T }> {
    try {
      return await apiClient.postEcho(data);
    } catch (error) {
      console.error('ApiService: postEcho failed', error);
      throw new Error('Echo servisi ile iletişim kurulamadı');
    }
  }

  static async getUsers<T>(): Promise<T> {
    try {
      return await apiClient.getUsers<T>();
    } catch (error) {
      console.error('ApiService: getUsers failed', error);
      throw new Error('Kullanıcılar alınamadı');
    }
  }
}

// Specific use cases
export class EchoService {
  static async sendMessage(message: string): Promise<{ received: any }> {
    const payload = {
      message,
      timestamp: new Date().toISOString(),
      source: 'mobile-app',
    };

    return ApiService.postEcho(payload);
  }
}