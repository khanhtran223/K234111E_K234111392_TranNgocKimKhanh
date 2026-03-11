import { Component } from '@angular/core';
import { Ex50Bookapi } from '../ex50-bookapi';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ex50',
  standalone: false,
  templateUrl: './ex50.html',
  styleUrl: './ex50.css',
})
export class Ex50 {
 books: any[] = [];
  errMessage: string = '';
  
  constructor(
    private _service: Ex50Bookapi,
    private router: Router
  ) {}
  
  ngOnInit() {
    // Mặc định: Gọi GET all Books API để hiển thị
    this.getAllBooks();
  }
  
  // GET all books
  getAllBooks() {
    this._service.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.errMessage = '';
      },
      error: (err) => {
        this.errMessage = 'Lỗi khi tải danh sách sách: ' + err;
        this.books = [];
      }
    });
  }
  
  // Navigate to Create New screen
  createNew() {
    this.router.navigate(['/ex-50-new-book']);
  }
  
  // Navigate to Details screen
  viewDetails(bookId: string) {
    this.router.navigate(['/ex-50/book-details', bookId]);
  }
  
  // Navigate to Edit screen
  editBook(bookId: string) {
    this.router.navigate(['/ex-50-book-edit', bookId]);
  }
  
  // Delete book with confirmation
  deleteBook(bookId: string) {
    // Hiển thị xác nhận trước khi xóa
    const confirmDelete = confirm('Bạn có chắc chắn muốn xóa sách này không?');
    
    if (confirmDelete) {
      this._service.deleteBook(bookId).subscribe({
        next: (data) => {
          this.books = data;
          this.errMessage = 'Đã xóa sách thành công!';
          // Reload lại danh sách sau khi xóa
          this.getAllBooks();
        },
        error: (err) => {
          this.errMessage = 'Lỗi khi xóa sách: ' + err;
        }
      });
    }
  }
}

