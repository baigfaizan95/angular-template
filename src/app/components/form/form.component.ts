import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomerObj } from '../../objects/customer';
import { CommonService } from 'src/app/services/common.service';
import flatpickr from 'flatpickr';
import { AddInvoice, ResetInvoice } from '../../actions/invoice.actions';
import { Store } from '@ngxs/store';
import { ToastrService } from 'ngx-toastr';

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
    startDate: [this.startDateLocal],
    endDate: [this.endDateLocal]
  });

  customerList: Array<CustomerObj> = [];

  @ViewChild('startDate') startDate: ElementRef;
  @ViewChild('endDate') endDate: ElementRef;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private commonService: CommonService,
    private toastr: ToastrService,
    private renderer: Renderer2
  ) { }

  onSelectBlur(name) {
    const data = this.getData(name);
    if (data) {
      localStorage.setItem(name, this.getData(name).id);
    }
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
    flatpickr(this.startDate.nativeElement, {
      onChange: function(_, dateStr) {
        localStorage.setItem('startDate', dateStr);
    }
    });
    flatpickr(this.endDate.nativeElement, {
      onChange: function(_, dateStr) {
        localStorage.setItem('endDate', dateStr);
      }
    });
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
      if (details.startDate && details.endDate) {
        if (details.startDate > details.endDate) {
          this.showError('Start Date should be less than End Date');
        } else {
          this.callApi(details);
        }
      } else {
        this.callApi(details);
      }
    } else {
      this.showError('Please select Customer');
    }
  }

  callApi(details) {
    this.store.dispatch(new AddInvoice({...details}));
  }

  showError(message: string) {
    this.toastr.error(message, 'Form Error!');
  }

  reset() {
    localStorage.clear();
    this.searchForm.reset();
    const flatPickrMobile = this.renderer.selectRootElement('.flatpickr-mobile');
    this.renderer.setProperty(flatPickrMobile, 'value', '');
    this.store.dispatch(new ResetInvoice());
  }
}
