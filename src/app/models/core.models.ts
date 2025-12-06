export type UserRole = 'sales' | 'engineer';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
}

export interface Client {
  id: string;
  name: string;
  segment: string;
  technical_fit_score: number;
}

export type DealStage = 'prospecting' | 'qualification' | 'poc' | 'negotiation' | 'closed';

export interface Deal {
  id: string;
  client_id: string;
  sales_rep_id: string;
  stage: DealStage;
  value: number;
  poc_status_ref?: string;
}

export type PoCStatus = 'backlog' | 'in_progress' | 'validation' | 'done';
export type PoCHealth = 'green' | 'yellow' | 'red';

export interface PoC {
  id: string;
  deal_id: string;
  engineer_id: string;
  status: PoCStatus;
  health: PoCHealth;
}
