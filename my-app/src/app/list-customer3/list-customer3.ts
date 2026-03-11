import { Component } from '@angular/core';
import { CustomerServices } from '../customer-services';

@Component({
  selector: 'app-list-customer3',
  standalone: false,
  templateUrl: './list-customer3.html',
  styleUrl: './list-customer3.css',
})
export class ListCustomer3 {
  customers: any;
  arr_ages: number[] = [];
  
  constructor(private cs: CustomerServices) {
    // Tạo mảng tuổi từ 20 đến 100
    for (let i = 20; i <= 100; i++) {
      this.arr_ages.push(i);
    }
    this.do_filter(20, 100);
  }

  do_filter(fromAge: any, toAge: any) {
    this.customers = this.cs.filter_customers_by_age(Number(fromAge), Number(toAge));
  }
}