import { Component } from '@angular/core';
import { Ex50Bookapi } from '../ex50-bookapi';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ex50-book-details',
  standalone: false,
  templateUrl: './ex50-book-details.html',
  styleUrl: './ex50-book-details.css',
})
export class Ex50BookDetails {
  book: any = {};
  errMessage: string = '';
  
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
        this.getBookDetail(id);
      }
    });
  }
  
  // Lấy thông tin chi tiết của sách
  getBookDetail(bookId: string) {
    this._service.getBook(bookId).subscribe({
      next: (data) => {
        this.book = data;
        this.errMessage = '';
      },
      error: (err) => {
        this.errMessage = 'Không tìm thấy thông tin sách: ' + err;
      }
    });
  }
  
  // Quay lại danh sách
  backToList() {
    this.router.navigate(['/ex-50']);
  }
}

