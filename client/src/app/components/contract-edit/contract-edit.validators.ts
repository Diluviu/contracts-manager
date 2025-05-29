import { Validators, ValidatorFn, AbstractControl } from '@angular/forms';

export const MIN_TITLE_LENGTH = 3;
export const MAX_TITLE_LENGTH = 100;
export const MIN_PARTY_LENGTH = 2;
export const MAX_PARTY_LENGTH = 100;
export const MIN_AMOUNT = 0;
export const MAX_AMOUNT = 1_000_000;
export const MIN_YEAR = 1950;
export const MAX_YEAR = 2070;

export const TITLE_VALIDATORS = [
  Validators.required,
  Validators.minLength(MIN_TITLE_LENGTH),
  Validators.maxLength(MAX_TITLE_LENGTH),
];

export const PARTY_VALIDATORS = [
  Validators.required,
  Validators.minLength(MIN_PARTY_LENGTH),
  Validators.maxLength(MAX_PARTY_LENGTH),
  Validators.pattern(/^[a-zA-Z0-9\s\.\,\-\'&]+$/),
];

export const AMOUNT_VALIDATORS = [
  Validators.required,
  Validators.min(MIN_AMOUNT),
  Validators.max(MAX_AMOUNT),
];

export function yearRangeValidator(minYear: number, maxYear: number): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;
    if (!value) return null;
    const year = Number(value.split('-')[0]);
    return year >= minYear && year <= maxYear ? null : { yearOutOfRange: true };
  };
}

export const startBeforeEndValidator: ValidatorFn = (group: AbstractControl) => {
  const start = group.get('startDate')?.value;
  const end = group.get('endDate')?.value;
  if (!start || !end) return null;
  return new Date(start) <= new Date(end) ? null : { startAfterEnd: true };
};
