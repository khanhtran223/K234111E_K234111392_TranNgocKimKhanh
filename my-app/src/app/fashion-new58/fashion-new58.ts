import { Component } from '@angular/core';
import { FashionAPIService58 } from '../fashion-apiservice58';
import { Router } from '@angular/router';
import { Fashion58 } from '../fashion58';

@Component({
  selector: 'app-fashion-new58',
  standalone: false,
  templateUrl: './fashion-new58.html',
  styleUrl: './fashion-new58.css',
})
export class FashionNew58 {
 fashion = new Fashion58();
  errMessage: string = '';
  styles: string[] = ['STREET STYLE', 'TRENDS', 'FASHION WEEK'];

  editorConfig = {
    height: 400,
    plugins: 'link image code lists table',
    toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code',
    base_url: '/tinymce',
    suffix: '.min'
  };

  constructor(private _service: FashionAPIService58, private router: Router) { }

  onFileSelected(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fashion.thumbnail = reader.result!.toString();
    };
    reader.onerror = (error) => { console.log('Error:', error); };
  }

  postFashion() {
    this._service.postFashion(this.fashion).subscribe({
      next: (data) => {
        alert('Thêm mới thành công!');
        this.router.navigate(['/list']);
      },
      error: (err) => { this.errMessage = err }
    })
  }

  goBack() { this.router.navigate(['/list']); }
}
