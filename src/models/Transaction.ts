// src/models/Transaction.ts
import { Timestamp } from 'firebase/firestore';

export type TransactionType = 'income' | 'expense';
export type TransactionStatus = 'paid' | 'unpaid' | 'paid_late';

export interface Transaction {
  id?: string;

  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  category: string;

  purchase_date: Timestamp;
  due_date?: Timestamp;
  payment_date?: Timestamp;

  status: TransactionStatus;
  payment_method: string;

  credit_card_id?: string;
  bank_account_id?: string;

  installments?: number;
  installment_number?: number;
  parent_transaction_id?: string;
  recurring_expense_id?: string;
  goal_id?: string;

  createdAt: Timestamp;
}
