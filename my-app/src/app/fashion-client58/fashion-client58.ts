import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FashionAPIService58 } from '../fashion-apiservice58';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fashion-client58',
  standalone: false,
  templateUrl: './fashion-client58.html',
  styleUrl: './fashion-client58.css',
})
export class FashionClient58 implements OnInit {
  fashions: any[] = [];
  groupedFashions: any[] = [];
  allStyles: string[] = [];
  searchStyle: string = '';
  errMessage: string = '';

  constructor(
    private _service: FashionAPIService58,
    private router: Router,
    private cdr: ChangeDetectorRef  // ← thêm
  ) { }

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this._service.getFashions().subscribe({
      next: (data) => {
        this.fashions = [...data];
        this.groupByStyle(data);
        this.allStyles = [...new Set(data.map((f: any) => f.style))] as string[];
        this.cdr.detectChanges(); // ← thêm
      },
      error: (err) => { this.errMessage = err; }
    });
  }

  groupByStyle(data: any[]) {
    const map: any = {};
    data.forEach(item => {
      if (!map[item.style]) map[item.style] = [];
      map[item.style].push(item);
    });
    this.groupedFashions = Object.keys(map).map(style => ({
      style: style,
      items: map[style]
    }));
  }

  search() {
    if (!this.searchStyle.trim()) {
      this.groupByStyle(this.fashions);
      return;
    }
    this._service.getFashionsByStyle(this.searchStyle.trim()).subscribe({
      next: (data) => {
        this.groupByStyle(data);
        this.cdr.detectChanges(); // ← thêm
      },
      error: (err) => { this.errMessage = err; }
    });
  }

  viewDetail(id: string) {
    this.router.navigate(['/ex-58-client-detail', id]);
  }

  goAdmin() {
    this.router.navigate(['/ex-58-admin']);
  }
}