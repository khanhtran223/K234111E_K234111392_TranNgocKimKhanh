import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-momo',
  standalone: false,
  templateUrl: './product-momo.html',
  styleUrl: './product-momo.css',
})

export class ProductMomo implements OnInit {
  product: any = null;
  selectedSize: string = '';
  selectedColor: string = '';
  quantity: number = 1;
  isLoading: boolean = false;

  sizes: string[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  colors: string[] = ['Trắng', 'Đen', 'Xanh navy', 'Be', 'Đỏ'];

  constructor(private router: Router) {
    // FIX 1: Đọc router state trong constructor, KHÔNG phải ngOnInit
    // vì getCurrentNavigation() chỉ hoạt động khi navigation đang diễn ra
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { product: any };

    if (state?.product) {
      this.product = state.product;
      // Lưu vào sessionStorage để fallback khi reload trang
      sessionStorage.setItem('viewProduct', JSON.stringify(state.product));
    }
  }

  ngOnInit() {
    // FIX 1 (tiếp): Nếu không có state từ constructor → đọc sessionStorage
    if (!this.product) {
      const saved = sessionStorage.getItem('viewProduct');
      if (saved) {
        this.product = JSON.parse(saved);
      } else {
        // FIX 2: Không redirect về '/product-momo' (chính nó) → vòng lặp vô hạn
        // Thay bằng redirect về trang danh sách hoặc trang chủ
        this.router.navigate(['/momo']);
      }
    }
  }

  formatCurrency(value: number): string {
    return value.toLocaleString('vi-VN') + 'đ';
  }

  increaseQty() { if (this.quantity < 10) this.quantity++; }
  decreaseQty() { if (this.quantity > 1) this.quantity--; }

  get totalPrice(): number {
    return this.product ? this.product.price * this.quantity : 0;
  }

  buyWithMomo() {
    if (!this.selectedSize) { alert('Vui lòng chọn size!'); return; }

    const orderProduct = {
      ...this.product,
      selectedSize: this.selectedSize,
      selectedColor: this.selectedColor,
      quantity: this.quantity,
      price: this.totalPrice,
      name: `${this.product.name} (${this.selectedSize}${this.selectedColor ? ' - ' + this.selectedColor : ''}) x${this.quantity}`,
    };

    sessionStorage.setItem('selectedProduct', JSON.stringify(orderProduct));
    this.router.navigate(['/momo'], { state: { product: orderProduct } });
  }

  calcDiscount(price: number, originalPrice: number): number {
    return Math.round((1 - price / originalPrice) * 100);
  }

  goBack() {
    this.router.navigate(['/momo']);
  }
}