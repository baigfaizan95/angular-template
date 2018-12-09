import { Component, OnInit } from '@angular/core';
import { InvoiceObj } from 'src/app/objects/invoice';
import { Select } from '@ngxs/store';
import { InvoiceState } from 'src/app/state/invoice';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  total: number;
  orders: number;
  currency: string;
  @Select(InvoiceState.getInvoice)invoiceData$: Observable<InvoiceObj[]>;

  constructor() {}

  ngOnInit() {
    this.invoiceData$.subscribe((value) => {
      this.startDate = localStorage.getItem('startDate') ? new Date(localStorage.getItem('startDate')) : null;
      this.endDate = localStorage.getItem('endDate') ? new Date(localStorage.getItem('endDate')) : null;
      if (value) {
        let total = 0;
        let orders = 0;
        value.forEach(data => {
          total += parseFloat(data.charge_customer.total_price);
          orders += 1;
          this.currency = data.charge_customer.currency;
        });
        this.total = total;
        this.orders = orders;
      } else {
        this.total = 0;
        this.orders = 0;
      }
    });
  }

}
