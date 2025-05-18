import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, tap } from 'rxjs';

import { type Contract } from '../models/contract.interface';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private readonly STORAGE_KEY = 'contracts';

  constructor(private http: HttpClient) {}

  loadContracts(): Observable<Contract[]> {
    const cached = localStorage.getItem(this.STORAGE_KEY);

    if (cached) {
      console.log('[ContractService] Loaded contracts from localStorage');
      const parsed = JSON.parse(cached).map(this.normalizeContractDates);
      return of(parsed);
    }

    console.log('[ContractService] Loading contracts from JSON file...');
    return this.http.get<Contract[]>('assets/contracts.json').pipe(
      map((contracts) => contracts.map(this.normalizeContractDates)),
      tap((contracts) => {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contracts));
        console.log('[ContractService] Saved contracts to localStorage');
      })
    );
  }

  saveContracts(contracts: Contract[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(contracts));
    console.log('[ContractService] Manually saved contracts to localStorage');
  }

  private normalizeContractDates(c: any): Contract {
    return {
      ...c,
      startDate: new Date(c.startDate),
      endDate: new Date(c.endDate)
    };
  }
}
