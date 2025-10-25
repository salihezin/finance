class ApiClient {
  private baseURL = 'https://api-for-render.onrender.com';

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      // GET endpoint'i için text response döndürüyor
      if (endpoint === '/') {
        return (await response.text()) as T;
      }
      
      // Diğer endpoint'ler için JSON response
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  async getHome(): Promise<string> {
    return this.request<string>('/');
  }

  async postEcho<T>(data: T): Promise<{ received: T }> {
    return this.request<{ received: T }>('/echo', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

export const apiClient = new ApiClient();
