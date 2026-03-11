import { Component } from '@angular/core';
import { Cart63 } from '../cart-63';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-63',
  standalone: false,
  templateUrl: './product-list-63.html',
  styleUrl: './product-list-63.css',
})
export class ProductList63 {
products: any[] = [];
  message: string = '';

  constructor(private service: Cart63, private router: Router) {}

  ngOnInit(): void {
    // Tải danh sách sản phẩm khi mở trang
    this.service.getProducts().subscribe({
      next: (data) => { this.products = data; },
      error: (err) => { console.log(err); }
    });
  }

  addToCart(product: any) {
    this.service.addToCart(product).subscribe({
      next: (result) => {
        this.message = `Đã thêm "${product.ProductName}" vào giỏ!`;
        // Xóa thông báo sau 2 giây
        setTimeout(() => this.message = '', 2000);
      },
      error: (err) => { console.log(err); }
    });
  }

  goToCart() {
    this.router.navigate(['/cart-63']);
  }
}
