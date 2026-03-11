import { Component } from '@angular/core';
import { FashionAPIService } from '../fashion-apiservice';
import { Fashion } from '../fashion';

@Component({
  selector: 'app-fashion-delete',
  standalone: false,
  templateUrl: './fashion-delete.html',
  styleUrls: ['./fashion-delete.css']
})
export class FashionDeleteComponent {
  fashion = new Fashion();
  errMessage: string = '';

  constructor(private _service: FashionAPIService) {}

  public setFashion(f: Fashion) {
    this.fashion = f;
  }

  deleteFashion() {
    this._service.deleteFashion(this.fashion._id).subscribe({
      next: (data: Fashion) => { this.fashion = data; },
      error: (err: any) => { this.errMessage = err; }
    });
  }
}