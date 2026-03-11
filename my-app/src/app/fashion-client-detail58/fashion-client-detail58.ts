import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FashionAPIService58 } from '../fashion-apiservice58';

@Component({
  selector: 'app-fashion-client-detail58',
  standalone: false,
  templateUrl: './fashion-client-detail58.html',
  styleUrl: './fashion-client-detail58.css',
})
export class FashionClientDetail58 implements OnInit {
 fashion: any = null;
  safeDetails: SafeHtml = '';
  errMessage: string = '';

  constructor(
    private _service: FashionAPIService58,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this._service.getFashion(id).subscribe({
      next: (data) => {
        this.fashion = data;
        // Render HTML từ WYSIWYG an toàn
        this.safeDetails = this.sanitizer.bypassSecurityTrustHtml(data.details || '');
        this.cdr.detectChanges(); // ← ép render
      },
      error: (err) => { this.errMessage = err }
    })
  }

  goBack() { this.router.navigate(['/ex-58']); } 
}
