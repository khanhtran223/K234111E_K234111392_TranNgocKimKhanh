import { Component, OnInit } from '@angular/core';
import { Cart63 } from '../cart-63';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart-63',
  standalone: false,
  templateUrl: './cart-63.html',
  styleUrl: './cart-63.css',
})
export class Cart63Component implements OnInit {
  cartItems: any[] = [];
  message: string = '';

  constructor(private service: Cart63, private router: Router) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.service.getCart().subscribe({
      next: (data) => { this.cartItems = data; },
      error: (err) => { console.log(err); }
    });
  }

  // Xóa 1 sản phẩm
  removeItem(productId: string) {
    this.service.removeFromCart(productId).subscribe({
      next: () => { this.loadCart(); } // Tải lại giỏ sau khi xóa
    });
  }

  // Cập nhật số lượng
  updateQuantity(productId: string, quantity: number) {
    if (quantity < 1) quantity = 1; // Không cho nhỏ hơn 1
    this.service.updateCart(productId, quantity).subscribe({
      next: () => {
        this.message = '✅ Đã cập nhật giỏ hàng!';
        setTimeout(() => this.message = '', 2000);
        this.loadCart();
      }
    });
  }

  // Tính tổng tiền
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + (item.Price * item.quantity), 0
    );
  }

  // Quay lại trang sản phẩm
  continueShopping() {
    this.router.navigate(['/product-list-63']);
  }
}