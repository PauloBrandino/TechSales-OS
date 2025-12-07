import { Injectable, signal, computed } from '@angular/core';
import { Deal } from '../models/deal.model';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  // Inicializando com dados mockados reais
  deals = signal<Deal[]>([
    {
      id: '1',
      client: 'Embraer',
      value: 'R$ 15.000.000',
      stage: 'negotiation',
      pocStatus: 'success'
    },
    {
      id: '2',
      client: 'WEG',
      value: 'R$ 8.500.000',
      stage: 'poc',
      pocStatus: 'active'
    },
    {
      id: '3',
      client: 'Petrobras',
      value: 'R$ 22.000.000',
      stage: 'poc',
      pocStatus: 'failed'
    }
  ]);

  // Computed signal para filtrar deals bloqueados (active ou failed)
  lockedDeals = computed(() =>
    this.deals().filter(deal =>
      deal.pocStatus === 'failed' || deal.pocStatus === 'active'
    )
  );

  constructor() {}

  updatePocStatus(id: string, status: 'pending' | 'active' | 'success' | 'failed') {
    this.deals.update(currentDeals =>
      currentDeals.map(deal =>
        deal.id === id ? { ...deal, pocStatus: status } : deal
      )
    );
  }
}
