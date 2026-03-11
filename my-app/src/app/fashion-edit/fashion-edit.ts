import { Component } from '@angular/core';
import { FashionAPIService } from '../fashion-apiservice';
import { Fashion } from '../fashion';

@Component({
  selector: 'app-fashion-edit',
  standalone: false,
  templateUrl: './fashion-edit.html',
  styleUrls: ['./fashion-edit.css']
})
export class FashionEditComponent {
  fashion = new Fashion();
  errMessage: string = '';

  constructor(private _service: FashionAPIService) {}

  public setFashion(f: Fashion) {
    this.fashion = f;
  }

  onFileSelected(event: any, fashion: Fashion) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      fashion.fashion_image = reader.result!.toString();
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  putFashion() {
    this._service.putFashion(this.fashion).subscribe({
      next: (data) => { this.fashion = data; },
      error: (err) => { this.errMessage = err; }
    });
  }
}