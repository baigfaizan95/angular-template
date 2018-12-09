import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SharedModule } from './shared/shared.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SingleOrderComponent } from './components/single-order/single-order.component';
import { NgxsModule } from '@ngxs/store';
import { InvoiceState } from './state/invoice';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    OrdersComponent,
    SidebarComponent,
    SingleOrderComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates	: true,
      positionClass: 'toast-bottom-center'
    }),
    NgxsModule.forRoot([InvoiceState]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
