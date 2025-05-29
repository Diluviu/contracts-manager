export interface Contract {
  id: number;
  title: string;
  party: string;
  status: 'Active' | 'Pending' | 'Expired' | 'Terminated';
  startDate: Date;
  endDate: Date;
  amount: number;
}