// src/services/transactions.service.ts
import { apiFetch } from './api';
import { Transaction } from '@/models/Transaction';

export const createTransaction = async (
  data: Omit<Transaction, 'id' | 'createdAt'>
) => {
  return apiFetch('/transactions/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const updateTransaction = async (
  transactionId: string,
  data: Partial<Transaction>
) => {
  return apiFetch(`/transactions/${transactionId}/update`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

export const deleteTransaction = async (transactionId: string) => {
  return apiFetch(`/transactions/${transactionId}/delete`, {
    method: 'DELETE',
  });
};
