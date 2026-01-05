// src/models/SavingsGoal.ts
import { Timestamp } from 'firebase/firestore';

export type SavingsGoalType = 'individual' | 'shared';

export interface SavingsGoal {
  id?: string;

  userId: string;
  name: string;

  target_amount: number;
  current_amount: number;

  deadline?: string;
  icon: string;

  type: SavingsGoalType;
  contributors?: Record<string, number>;

  createdAt: Timestamp;
}
