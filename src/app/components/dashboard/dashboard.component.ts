import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DealService } from '../../services/deal.service';
import { PocService } from '../../services/poc.service';
import { Deal, PoC } from '../../models/core.models';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    TabViewModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
  private dealService = inject(DealService);
  private pocService = inject(PocService);

  // Expose signals for the template
  deals = this.dealService.deals;
  pocs = this.pocService.pocs;

  // View state: 'sales' | 'engineer'
  currentView = signal<'sales' | 'engineer'>('sales');

  // Computed signals for Kanban columns
  qualificationDeals = computed(() => this.deals().filter(d => d.stage === 'qualification'));
  pocDeals = computed(() => this.deals().filter(d => d.stage === 'poc'));
  negotiationDeals = computed(() => this.deals().filter(d => d.stage === 'negotiation'));

  setView(view: 'sales' | 'engineer') {
    this.currentView.set(view);
  }

  isDealBlocked(dealId: string): boolean {
    return this.dealService.checkPocBlocker(dealId);
  }

  approvePoc(pocId: string) {
    this.pocService.updatePocStatus(pocId, 'done');
  }

  // Helper to format currency
  formatCurrency(value: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  }
}
