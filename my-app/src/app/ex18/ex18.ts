import { Component } from '@angular/core';
import { CustomersService18 } from '../customers-service-18';

@Component({
  selector: 'app-ex18',
  standalone: false,
  templateUrl: './ex18.html',
  styleUrl: './ex18.css',
})
export class Ex18 {
  customerTypes: any[] = [];

  constructor(private customerService: CustomersService18) {}

  ngOnInit(): void {
    // Đọc dữ liệu từ file JSON qua service
    this.customerService.getCustomerTypes().subscribe({
      next: (data) => {
        this.customerTypes = data;
        console.log('Dữ liệu đã load:', this.customerTypes);
      },
      error: (error) => {
        console.error('Lỗi khi đọc file:', error);
      }
    });
  }
}

