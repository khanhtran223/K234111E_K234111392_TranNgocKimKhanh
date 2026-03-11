import { Component } from '@angular/core';
import { Book } from '../my class/ex50_book';
import { Router } from '@angular/router';
import { Ex50Bookapi } from '../ex50-bookapi';

@Component({
  selector: 'app-ex50-new-book',
  standalone: false,
  templateUrl: './ex50-new-book.html',
  styleUrl: './ex50-new-book.css',
})
export class Ex50NewBook {
book = new Book();
  errMessage: string = '';
  successMessage: string = '';
  
  constructor(
    private _service: Ex50Bookapi,
    private router: Router
  ) {}
  
  // Thêm sách mới
  createBook() {
    // Validate dữ liệu
    if (!this.book.BookId || !this.book.BookName || !this.book.Price) {
      this.errMessage = 'Vui lòng điền đầy đủ thông tin!';
      this.successMessage = '';
      return;
    }
    
    // Gọi API POST để thêm sách
    this._service.postBook(this.book).subscribe({
      next: (data) => {
        this.successMessage = 'Đã thêm sách thành công!';
        this.errMessage = '';
        
        // Reset form
        this.book = new Book();
        
        // Sau 2 giây tự động quay về danh sách
        setTimeout(() => {
          this.backToList();
        }, 2000);
      },
      error: (err) => {
        this.errMessage = 'Lỗi khi thêm sách: ' + err;
        this.successMessage = '';
      }
    });
  }
  
  // Quay lại danh sách
  backToList() {
    this.router.navigate(['/ex-50']);
  }
  
  // Reset form
  resetForm() {
    this.book = new Book();
    this.errMessage = '';
    this.successMessage = '';
  }
}
