import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerObj } from '../../objects/customer';
import { CommonService } from 'src/app/services/common.service';
import flatpickr from 'flatpickr';
import { AddInvoice, ResetInvoice } from '../../actions/invoice.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, AfterViewInit {

  customerIdLocal = localStorage.getItem('customerId');
  startDateLocal = localStorage.getItem('startDate');
  endDateLocal = localStorage.getItem('endDate');

  searchForm = this.fb.group({
    customerId: [this.customerIdLocal, [Validators.required]],
    startDate: [this.startDateLocal ? new Date(this.startDateLocal) : ''],
    endDate: [this.endDateLocal ? new Date(this.startDateLocal) : '']
  });

  customerList: Array<CustomerObj> = [];

  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private commonService: CommonService
  ) {}

  onBlurMethod(event) {
    const name = event.target.name;
    localStorage.setItem(name, this.getData(name));
  }

  onSelectBlur(name) {
    localStorage.setItem(name, this.getData(name).id);
  }

  ngOnInit() {
    this.commonService.getCustomers().subscribe(
      result => {
        this.customerList = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit() {
    flatpickr(this.startDate.nativeElement);
    flatpickr(this.endDate.nativeElement);
  }

  getData(value: string) {
    return this.searchForm.get(value).value;
  }

  search() {
    if (this.getData('customerId')) {
      const details = {
        customerId: this.getData('customerId').id,
        startDate: this.getData('startDate'),
        endDate: this.getData('endDate')
      };
      this.store.dispatch(new AddInvoice({...details}));
    } else {
      alert('Enter Customer');
    }
  }

  reset() {
    localStorage.clear();
    this.searchForm.reset();
    this.store.dispatch(new ResetInvoice());
  }
}
