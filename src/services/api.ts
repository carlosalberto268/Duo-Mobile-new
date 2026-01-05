// src/services/api.ts
import { getIdToken } from '@/firebase/auth';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {}
) => {
  const token = await getIdToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || 'Erro na API');
  }

  return response.json();
};
