import { ContractsSummaryComponent } from './contracts-summary.component';

describe('ContractsSummaryComponent', () => {
  let component: ContractsSummaryComponent;

  beforeEach(() => {
    component = new ContractsSummaryComponent();
    component.contracts = [
      { id: 1, title: 'A', party: 'X', status: 'Active', startDate: new Date(), endDate: new Date(), amount: 100 },
      { id: 2, title: 'B', party: 'Y', status: 'Pending', startDate: new Date(), endDate: new Date(), amount: 200 }
    ] as any;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate totalContracts', () => {
    expect(component.totalContracts).toBe(2);
  });

  it('should calculate totalValue', () => {
    expect(component.totalValue).toBe(300);
  });
});
