/**
 * NETRA Learning Event Telemetry Service
 * Sends structured events to backend for student state updates and adaptive decisions.
 */

import { ApiClient } from '../api/client';

export const trackLearningEvent = async (event) => {
  const payload = {
    ...event,
    timestamp: new Date().toISOString(),
    clientTime: Date.now(),
  };

  try {
    // Attempt dispatch to backend telemetry endpoint
    await ApiClient.post('/events/learning', payload);
  } catch {
    // Silent development log when backend is offline
    console.debug('[NETRA Telemetry Event]:', payload.type, payload);
  }
};
