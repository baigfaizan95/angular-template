import {InvoiceObj} from '../objects/invoice';

export class AddInvoice {
  static readonly type = '[INVOICE] Add';
  constructor(public payload: {customerId: string, startDate: Date, endDate: Date}) {}
}

export class SelectInvoice {
  static readonly type = '[INVOICE] Select';
  constructor(public payload: any) {}
}

export class ResetInvoice {
  static readonly type = '[INVOICE] Remove';
  constructor() {}
}
