// src/services/creditcards.service.ts
import { apiFetch } from './api';
import { CreditCard } from '@/models/CreditCard';

export const createCreditCard = async (
  data: Omit<CreditCard, 'id' | 'createdAt'>
) => {
  return apiFetch('/creditcards/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
