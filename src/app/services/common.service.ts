import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomerObj } from '../objects/customer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  getCustomers() {
    return this.http.get<CustomerObj[]>(`${environment.API_URL}/customers`);
  }
}
