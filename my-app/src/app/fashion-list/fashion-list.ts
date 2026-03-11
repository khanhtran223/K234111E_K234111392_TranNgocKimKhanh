import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FashionAPIService58 } from '../fashion-apiservice58';

@Component({
  selector: 'app-fashion-list',
  standalone: false,
  templateUrl: './fashion-list.html',
  styleUrl: './fashion-list.css',
})
export class FashionList implements OnInit {
  fashions: any[] = [];
  errMessage: string = '';

  constructor(
  private _service: FashionAPIService58,
  public router: Router,      
  private cdr: ChangeDetectorRef
) { }

  ngOnInit(): void {
    this.loadFashions();
  }

  loadFashions() {
    this._service.getFashions().subscribe({
      next: (data) => {
        this.fashions = [...data]; // ← dùng spread để tạo array mới
        this.cdr.detectChanges();  // ← ép Angular re-render
      },
      error: (err) => { this.errMessage = err; }
    });
  }

  viewDetail(id: string) {
    this.router.navigate(['/ex-58-detail', id]);
  }

  editFashion(id: string) {
    this.router.navigate(['/ex-58-edit', id]);
  }

  deleteFashion(id: string) {
    if (confirm('Bạn có chắc muốn xóa Fashion này không?')) {
      this._service.deleteFashion(id).subscribe({
        next: () => { this.loadFashions(); },
        error: (err) => { this.errMessage = err; }
      });
    }
  }

  goClient() {
    this.router.navigate(['/ex-58']);
  }
}