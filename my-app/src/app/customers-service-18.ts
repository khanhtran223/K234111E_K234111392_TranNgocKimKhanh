import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CustomersService18 {
  constructor(private http: HttpClient) {}

  // Đọc từ file JSON
  getCustomerTypes(): Observable<any> {
    return this.http.get('assets/customers.json');
  }
}