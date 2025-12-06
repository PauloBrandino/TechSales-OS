import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { PoC } from '../models/core.models';

@Injectable({
  providedIn: 'root'
})
export class PocService {
  pocs = signal<PoC[]>([]);

  constructor() {
    // Optionally load initial data or leave it to be called by component
    this.loadPocs().subscribe();
  }

  loadPocs(): Observable<PoC[]> {
    const mockPocs: PoC[] = [
      {
        id: 'poc-1',
        deal_id: 'deal-1',
        engineer_id: 'eng-1',
        status: 'in_progress',
        health: 'green'
      },
      {
        id: 'poc-2',
        deal_id: 'deal-2',
        engineer_id: 'eng-2',
        status: 'done',
        health: 'green'
      },
      {
        id: 'poc-3',
        deal_id: 'deal-3',
        engineer_id: 'eng-1',
        status: 'backlog',
        health: 'yellow'
      }
    ];

    return of(mockPocs).pipe(
      delay(500), // Simulate network latency
      tap(data => this.pocs.set(data))
    );
  }

  getPocByDealId(dealId: string): PoC | undefined {
    return this.pocs().find(p => p.deal_id === dealId);
  }
}
