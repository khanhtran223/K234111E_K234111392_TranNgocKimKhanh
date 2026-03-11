import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationLogin } from '../authentication-login';

@Component({
  selector: 'app-login-fashion',
  standalone: false,
  templateUrl: './login-fashion.html',
  styleUrl: './login-fashion.css',
})
export class LoginFashion {
username: string = '';
    password: string = '';
    message: string = '';
    isRegisterMode: boolean = false; // false = Login, true = Register

    constructor(private authService: AuthenticationLogin, private router: Router) {}

    toggleMode() {
        this.isRegisterMode = !this.isRegisterMode;
        this.message = '';
    }

    onSubmit() {
        if (!this.username || !this.password) {
            this.message = 'Vui lòng nhập đầy đủ!';
            return;
        }

        if (this.isRegisterMode) {
            // Đăng ký
            this.authService.register(this.username, this.password).subscribe({
                next: (res) => {
                    this.message = '✅ ' + res.message + ' Hãy đăng nhập!';
                    this.isRegisterMode = false;
                },
                error: (err) => { this.message = '❌ ' + err.message; }
            });
        } else {
            // Đăng nhập
            this.authService.login(this.username, this.password).subscribe({
                next: (res) => {
                    this.authService.saveToken(res.token, res.username);
                    this.message = '✅ ' + res.message;
                    // Chuyển sang trang danh sách Fashion
                    setTimeout(() => this.router.navigate(['/ex-53']), 1000);
                },
                error: (err) => { this.message = '❌ Sai tài khoản hoặc mật khẩu!'; }
            });
        }
    }
}