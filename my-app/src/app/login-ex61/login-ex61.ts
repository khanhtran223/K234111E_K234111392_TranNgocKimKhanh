import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-ex61',
  standalone: false,
  templateUrl: './login-ex61.html',
  styleUrl: './login-ex61.css',
})
export class LoginEx61 {
// Biến binding với 2 ô input
  username: string = '';
  password: string = '';
  message:  string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Khi mở trang → đọc Cookie, tự điền vào ô input nếu có
    this.readCookieAndFill();
  }

  // Hàm đọc cookie từ trình duyệt
  readCookieAndFill() {
    // document.cookie trả về chuỗi dạng: "saved_username=abc; saved_password=123"
    const cookies = document.cookie;

    if (cookies) {
      const parts = cookies.split(';');  // Tách từng cookie

      parts.forEach(part => {
        const pair = part.trim().split('=');  // Tách key=value
        const key   = pair[0];
        const value = pair[1];

        if (key === 'saved_username') this.username = value;
        if (key === 'saved_password') this.password = value;
      });
    }
  }

  // Hàm gọi API đăng nhập
  login() {
    const body = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>('http://localhost:3002/login', body)
      .subscribe(result => {
        if (result.success) {
          this.message = '✅ Đăng nhập thành công! Cookie đã được lưu.';
        } else {
          this.message = '❌ Sai tài khoản hoặc mật khẩu!';
        }
      });
  }
}
