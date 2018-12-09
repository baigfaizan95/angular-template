import { Component } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddInvoice, SelectInvoice } from './actions/invoice.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private store: Store) {
    const invoiceId = localStorage.getItem('invoiceId');
    const customerId = localStorage.getItem('customerId');
    const startDate = new Date(localStorage.getItem('startDate'));
    const endDate = new Date(localStorage.getItem('endDate'));
    if (customerId) {
      const details = {
        customerId,
        startDate,
        endDate
      };
      this.store.dispatch(new AddInvoice({...details})).subscribe(() => {
        if (invoiceId) {
          this.store.dispatch(new SelectInvoice({id: invoiceId}));
        }
      });
    }
  }
}
