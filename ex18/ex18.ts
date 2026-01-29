import { Component } from '@angular/core';
import { NgForOf } from '@angular/common';
import { CustomerType, Ex18Service } from './ex18service/ex18-service';

@Component({
  selector: 'app-ex18',
  imports: [NgForOf],
  templateUrl: './ex18.html',
  styleUrl: './ex18.css',
})
export class Ex18 {
  data: CustomerType[] = [];

  constructor(private ex18Service: Ex18Service) {
    this.ex18Service.getCustomerTypes().subscribe({
      next: (data: CustomerType[]) => {
        console.log('Data loaded:', data);
        this.data = data;
      },
      error: (err: unknown) => {
        console.error('Error loading data:', err);
      },
      complete: () => {
        console.log('Data loading complete');
      }
    });
  }
}
