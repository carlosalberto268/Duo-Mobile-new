// src/models/CreditCard.ts
import { Timestamp } from 'firebase/firestore';

export interface CreditCard {
  id?: string;

  nickname: string;
  issuer: string;
  brand: string;
  last_4_digits: string;

  credit_limit: number;
  closing_day: number;
  due_day: number;

  active: boolean;
  shared: boolean;

  createdAt: Timestamp;
}
