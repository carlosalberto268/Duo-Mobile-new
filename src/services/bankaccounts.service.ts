// src/services/bankaccounts.service.ts
import { apiFetch } from './api';
import { BankAccount } from '@/models/BankAccount';

export const createBankAccount = async (
  data: Omit<BankAccount, 'id' | 'createdAt'>
) => {
  return apiFetch('/bankaccounts/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
