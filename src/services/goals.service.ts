// src/services/goals.service.ts
import { apiFetch } from './api';
import { SavingsGoal } from '@/models/SavingsGoal';

export const createSavingsGoal = async (
  data: Omit<SavingsGoal, 'id' | 'createdAt'>
) => {
  return apiFetch('/goals/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
