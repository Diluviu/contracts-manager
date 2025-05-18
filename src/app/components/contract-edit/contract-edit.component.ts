import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, HostListener
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { type Contract } from '../../models/contract.interface';
import { 
  TITLE_VALIDATORS, PARTY_VALIDATORS, AMOUNT_VALIDATORS, yearRangeValidator, startBeforeEndValidator,
  MIN_YEAR, MAX_YEAR
} from './contract-edit.validators';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrls: ['./contract-edit.component.scss']
})
export class ContractEditComponent implements OnChanges {
  @Input() contract: Contract | null = null;
  @Output() save = new EventEmitter<Contract>();
  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;
  statuses: string[] = ['Active', 'Pending', 'Completed', 'Terminated'];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', TITLE_VALIDATORS],
      party: ['', PARTY_VALIDATORS],
      status: ['', Validators.required],
      startDate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
          yearRangeValidator(MIN_YEAR, MAX_YEAR)
        ]
      ],
      endDate: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
          yearRangeValidator(MIN_YEAR, MAX_YEAR)
        ]
      ],
      amount: [0, AMOUNT_VALIDATORS]
    }, { validators: startBeforeEndValidator });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['contract'] && this.contract) {
      this.form.patchValue({
        ...this.contract,
        startDate: ContractEditComponent.toDateInputValue(this.contract.startDate),
        endDate: ContractEditComponent.toDateInputValue(this.contract.endDate)
      });
    }
  }

  onSave() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const values = this.form.value;
    this.save.emit({
      ...this.contract,
      ...values,
      startDate: new Date(values.startDate),
      endDate: new Date(values.endDate)
    } as Contract);
  }

  onCancel() {
    this.cancel.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscKey(event: KeyboardEvent) {
    event.preventDefault();
    this.onCancel();
  }

  private static toDateInputValue(date: Date | string | undefined): string {
    if (!date) return '';
    if (typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  }
}
