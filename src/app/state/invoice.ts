import { State, Action, StateContext, Selector } from '@ngxs/store';
import { InvoiceObj } from '../objects/invoice';
import { AddInvoice, SelectInvoice, ResetInvoice } from '../actions/invoice.actions';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';
export interface InvoiceStateObj {
  invoice: InvoiceObj[];
  selectedInvoice: InvoiceObj;
}

@State<InvoiceStateObj>({
  name: 'invoice',
  defaults: {
    invoice: null,
    selectedInvoice: null
  }
})

export class InvoiceState {

  constructor(private http: HttpClient) {}

  @Selector()
  static getInvoice(state: InvoiceStateObj) {
    return state.invoice;
  }

  @Selector()
  static getSelectedInvoice(state: InvoiceStateObj) {
    return state.selectedInvoice;
  }

  @Action(SelectInvoice)
  selectInvoice(ctx: StateContext<InvoiceStateObj>, action: SelectInvoice) {
    const state = ctx.getState();
    const selectedInvoice = state.invoice && state.invoice.filter((value) => value.id === action.payload.id)[0];
    ctx.setState({
      ...state,
      selectedInvoice
    });
  }

  @Action(ResetInvoice)
  ResetInvoice(ctx: StateContext<InvoiceStateObj>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      selectedInvoice: null,
      invoice: null
    });
  }

  @Action(AddInvoice)
  addInvoice(ctx: StateContext<InvoiceStateObj>, action: AddInvoice) {
    return this.http.get<InvoiceObj[]>
    (`${environment.API_URL}/orders/${action.payload.customerId}?start_date=${action.payload.startDate}&end_date=${action.payload.endDate}`)
    .pipe(
      tap(invoice => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          selectedInvoice: null,
          invoice
        });
      }),
      catchError(error => of(alert('Network Error')))
    );
  }
}
