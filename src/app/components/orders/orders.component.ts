import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { InvoiceObj } from '../../objects/invoice';
import { Observable } from 'rxjs';
import { InvoiceState } from '../../state/invoice';
import { SelectInvoice } from 'src/app/actions/invoice.actions';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @Select(InvoiceState.getInvoice)invoiceData: Observable<InvoiceObj[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
  }

  getInvoice(order: InvoiceObj) {
    localStorage.setItem('invoiceId', order.id);
    this.store.dispatch(new SelectInvoice({id: order.id}));
  }

}
