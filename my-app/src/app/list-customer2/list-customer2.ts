import { Component } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { CustomerServices } from '../customer-services';

@Component({
  selector: 'app-list-customer2',
  standalone: false,
  templateUrl: './list-customer2.html',
  styleUrl: './list-customer2.css',
})
export class ListCustomer2 {
  customers: any;
  constructor(private cs: CustomerServices) {
    this.customers = cs.get_all_customers();
  }
}
