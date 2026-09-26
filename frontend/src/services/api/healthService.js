import { ApiClient } from './client';

export const checkBackendHealth = async () => {
  try {
    const data = await ApiClient.get('/health');
    return {
      isOnline: true,
      service: data.service || 'PW67 Backend',
      version: data.version || '1.0.0',
      status: data.status || 'ok'
    };
  } catch (error) {
    return {
      isOnline: false,
      error: error.message,
      service: 'Offline / Mock Layer Active',
      status: 'offline'
    };
  }
};
