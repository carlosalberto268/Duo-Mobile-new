// src/services/wishes.service.ts
import { apiFetch } from './api';

export type WishStatus = 'pending' | 'approved' | 'rejected';

export interface Wish {
  id?: string;

  createdBy: string;
  userId: string;

  name: string;
  target_amount: number;
  description?: string;
  icon: string;

  budgetCategory: string;
  status: WishStatus;

  actionBy?: string;

  createdAt: any; // Timestamp no backend
}

/**
 * Criar um novo desejo (sempre entra como 'pending')
 */
export const createWish = async (
  data: Omit<Wish, 'id' | 'status' | 'actionBy' | 'createdAt'>
) => {
  return apiFetch('/wishes/create', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * Aprovar um desejo (normalmente o parceiro)
 */
export const approveWish = async (wishId: string) => {
  return apiFetch(`/wishes/${wishId}/approve`, {
    method: 'POST',
  });
};

/**
 * Rejeitar um desejo
 */
export const rejectWish = async (wishId: string) => {
  return apiFetch(`/wishes/${wishId}/reject`, {
    method: 'POST',
  });
};
