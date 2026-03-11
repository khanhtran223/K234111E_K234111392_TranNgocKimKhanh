import { Component } from '@angular/core';
import { Ex50Bookapi } from '../ex50-bookapi';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../my class/ex50_book';

@Component({
  selector: 'app-ex50-book-edit',
  standalone: false,
  templateUrl: './ex50-book-edit.html',
  styleUrl: './ex50-book-edit.css',
})
export class Ex50BookEdit {
  book = new Book();
  originalBook = new Book();
  errMessage: string = '';
  successMessage: string = '';
  
  constructor(
    private _service: Ex50Bookapi,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit() {
    // Lấy bookId từ route params
    this.route.paramMap.subscribe((param) => {
      let id = param.get("id");
      if (id != null) {
        this.loadBookData(id);
      }
    });
  }
  
  // Lấy thông tin chi tiết của sách
  loadBookData(bookId: string) {
    this._service.getBook(bookId).subscribe({
      next: (data) => {
        this.book = data;
        // Lưu bản sao gốc để có thể reset
        this.originalBook = JSON.parse(JSON.stringify(data));
        this.errMessage = '';
      },
      error: (err) => {
        this.errMessage = 'Không tìm thấy thông tin sách: ' + err.message;
      }
    });
  }
  
  // Cập nhật thông tin sách
  updateBook() {
    // Validate dữ liệu
    if (!this.book.BookName || !this.book.Price) {
      this.errMessage = 'Vui lòng điền đầy đủ thông tin bắt buộc (Tên sách và Giá)!';
      this.successMessage = '';
      return;
    }
    
    if (this.book.Price <= 0) {
      this.errMessage = 'Giá sách phải lớn hơn 0!';
      this.successMessage = '';
      return;
    }
    
    // Gọi API PUT để cập nhật sách
    this._service.putBook(this.book).subscribe({
      next: (data) => {
        this.successMessage = 'Đã cập nhật sách thành công!';
        this.errMessage = '';
        
        // Sau 2 giây tự động quay về danh sách
        setTimeout(() => {
          this.backToList();
        }, 2000);
      },
      error: (err) => {
        this.errMessage = 'Lỗi khi cập nhật sách: ' + err.message;
        this.successMessage = '';
      }
    });
  }
  
  // Quay lại danh sách
  backToList() {
    this.router.navigate(['/ex-50']);
  }
  
  // Reset form về giá trị ban đầu
  resetForm() {
    this.book = JSON.parse(JSON.stringify(this.originalBook));
    this.errMessage = '';
    this.successMessage = '';
  }
}