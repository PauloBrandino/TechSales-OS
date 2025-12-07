export interface Deal {
  id: string;
  client: string;
  value: string;
  stage: 'negotiation' | 'poc' | 'closed';
  pocStatus: 'pending' | 'active' | 'success' | 'failed';
}
