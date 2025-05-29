import { Component, Input } from '@angular/core';
import { type Contract } from '../../models/contract.interface';

@Component({
  selector: 'app-contracts-summary',
  templateUrl: './contracts-summary.component.html',
  styleUrls: ['./contracts-summary.component.scss']
})
export class ContractsSummaryComponent {
  @Input() contracts: Contract[] = [];

  get totalContracts(): number {
    return this.contracts.length;
  }

  get totalValue(): number {
    return this.contracts.reduce((sum, c) => sum + c.amount, 0);
  }
}
