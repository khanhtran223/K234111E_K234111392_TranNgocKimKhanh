import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Cart63 {
 private url = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  // Lấy danh sách sản phẩm
  getProducts() {
    return this.http.get<any[]>(`${this.url}/products`);
  }

  // Thêm vào giỏ
  addToCart(product: any) {
    return this.http.post<any>(`${this.url}/cart/add`, product);
  }

  // Xem giỏ hàng
  getCart() {
    return this.http.get<any[]>(`${this.url}/cart`);
  }

  // Xóa khỏi giỏ
  removeFromCart(productId: string) {
    return this.http.post<any>(`${this.url}/cart/remove`, { ProductId: productId });
  }

  // Cập nhật số lượng
  updateCart(productId: string, quantity: number) {
    return this.http.post<any>(`${this.url}/cart/update`, { ProductId: productId, quantity: quantity });
  }
}
