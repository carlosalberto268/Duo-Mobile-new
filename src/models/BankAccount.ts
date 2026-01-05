// src/models/BankAccount.ts
import { Timestamp } from 'firebase/firestore';

export type BankAccountType = 'checking' | 'savings' | 'investment';

export interface BankAccount {
  id?: string;

  bank_name: string;
  account_nickname: string;
  account_type: BankAccountType;

  balance: number;
  shared: boolean;

  createdAt: Timestamp;
}
