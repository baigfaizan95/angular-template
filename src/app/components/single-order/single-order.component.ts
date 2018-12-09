import { Component } from '@angular/core';
import { InvoiceObj } from 'src/app/objects/invoice';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { InvoiceState } from 'src/app/state/invoice';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent {
  @Select(InvoiceState.getSelectedInvoice)selectedInvoice$: Observable<InvoiceObj>;
  invoice: InvoiceObj;
  constructor() {
    this.selectedInvoice$.subscribe(value => this.invoice = value);
  }

  getTotalPrice(items) {
    let total = 0;
    items.forEach(ele => {
      total += parseFloat(ele.total_price.amount);
    });
    return total;
  }
}
