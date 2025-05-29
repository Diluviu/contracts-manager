import { Component, OnInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { type Contract } from '../../models/contract.interface';
import { ContractService } from '../../services/contract.service';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss']
})
export class ContractsListComponent implements OnInit {
  private static readonly EXPIRING_SOON_DAYS = 30;
  destroyRef = inject(DestroyRef);
  contracts: Contract[] = [];
  searchTerm = '';
  statusFilter = '';
  editingContract: Contract | null = null;
  selectedContract: Contract | null = null;

  constructor(private contractService: ContractService) { }

  ngOnInit(): void {
    this.contractService.loadContracts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        this.contracts = data;
      });
  }

  get filteredContracts(): Contract[] {
    const result = this.contracts.filter(contract => {
      const matchesSearch =
        this.searchTerm === '' ||
        contract.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        contract.party.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus =
        this.statusFilter === '' ||
        contract.status.toLowerCase() === this.statusFilter.toLowerCase();

      return matchesSearch && matchesStatus;
    });

    return result;
  }

  editContract(contract: Contract): void {
    this.editingContract = { ...contract };
  }

  saveContract(updatedContract: Contract): void {
    const index = this.contracts.findIndex(contractItem => contractItem.id === updatedContract.id);
    if (index !== -1) {
      this.contracts[index] = updatedContract;
      this.contractService.saveContracts(this.contracts);
    }
    this.editingContract = null;
  }

  cancelEdit(): void {
    this.editingContract = null;
  }

  deleteContract(contract: Contract): void {
    if (confirm('Are you sure you want to delete this contract?')) {
      this.contracts = this.contracts.filter(contractItem => contractItem.id !== contract.id);
      this.contractService.saveContracts(this.contracts);
    }
  }

  showContractDetails(contract: Contract): void {
    this.selectedContract = contract;
  }

  closeContractDetails(): void {
    this.selectedContract = null;
  }

  isExpiringSoon(contract: Contract): boolean {
    if (!contract.endDate) return false;
    const now = new Date();
    const end = new Date(contract.endDate);
    const diff = end.getTime() - now.getTime();
    return diff > 0 && diff <= ContractsListComponent.EXPIRING_SOON_DAYS * 24 * 60 * 60 * 1000;
  }

  get totalContracts(): number {
    return this.filteredContracts.length;
  }

  get totalValue(): number {
    return this.filteredContracts.reduce((sum, c) => sum + c.amount, 0);
  }

  get expiringSoonDays(): number {
    return ContractsListComponent.EXPIRING_SOON_DAYS;
  }

}
