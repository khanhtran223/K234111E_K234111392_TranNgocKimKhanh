import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FashionAPIService58 } from '../fashion-apiservice58';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fashion-edit58',
  standalone: false,
  templateUrl: './fashion-edit58.html',
  styleUrl: './fashion-edit58.css',
})
export class FashionEdit58 implements OnInit {
  fashion: any = {};
  errMessage: string = '';
  styles: string[] = ['STREET STYLE', 'TRENDS', 'FASHION WEEK'];

  editorConfig = {
    height: 400,
    plugins: 'link image code lists table',
    toolbar: 'undo redo | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image | code',
    base_url: '/tinymce',
    suffix: '.min'
  };

  constructor(
    private _service: FashionAPIService58,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef  // ← thêm
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this._service.getFashion(id).subscribe({
      next: (data) => {
        this.fashion = { ...data }; // ← spread để tạo object mới
        this.cdr.detectChanges();   // ← ép render, TinyMCE nhận được data
      },
      error: (err) => { this.errMessage = err; }
    });
  }

  onFileSelected(event: any) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => { this.fashion.thumbnail = reader.result!.toString(); };
  }

  putFashion() {
    this._service.putFashion(this.fashion).subscribe({
      next: () => {
        alert('✅ Cập nhật thành công!');
        this.router.navigate(['/ex-58-admin']);
      },
      error: (err) => { this.errMessage = err; }
    });
  }

  goBack() { this.router.navigate(['/ex-58-admin']); }
}