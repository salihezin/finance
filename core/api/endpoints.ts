export const API_ENDPOINTS = {
  HOME: '/',
  ECHO: '/echo',
} as const;

export type ApiResponse<T> = {
  received: T;
};

export type EchoRequest = {
  message?: string;
  test?: boolean;
  [key: string]: any;
};
