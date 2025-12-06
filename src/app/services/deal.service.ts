import { Injectable, signal, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Deal } from '../models/core.models';
import { PocService } from './poc.service';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  deals = signal<Deal[]>([]);
  private pocService = inject(PocService);

  constructor() {
    this.loadDeals().subscribe();
  }

  loadDeals(): Observable<Deal[]> {
    const mockDeals: Deal[] = [
      {
        id: 'deal-1',
        client_id: 'client-1',
        sales_rep_id: 'sales-1',
        stage: 'poc',
        value: 50000,
        poc_status_ref: 'in_progress'
      },
      {
        id: 'deal-2',
        client_id: 'client-2',
        sales_rep_id: 'sales-1',
        stage: 'negotiation',
        value: 120000,
        poc_status_ref: 'done'
      },
      {
        id: 'deal-3',
        client_id: 'client-3',
        sales_rep_id: 'sales-2',
        stage: 'qualification',
        value: 30000
      }
    ];

    return of(mockDeals).pipe(
      delay(500),
      tap(data => this.deals.set(data))
    );
  }

  /**
   * Checks if the deal is blocked by an incomplete PoC.
   * Returns true if the associated PoC is NOT 'done'.
   * If there is no PoC associated, it is assumed not to be blocked (returns false).
   */
  checkPocBlocker(dealId: string): boolean {
    const poc = this.pocService.getPocByDealId(dealId);

    // If there is no PoC, it's not blocked by PoC status.
    if (!poc) {
      return false;
    }

    // Block if status is not 'done'
    return poc.status !== 'done';
  }
}
