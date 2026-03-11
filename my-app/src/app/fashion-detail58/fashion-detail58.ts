import { ChangeDetectorRef, Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FashionAPIService58 } from '../fashion-apiservice58';
@Component({
  selector: 'app-fashion-detail58',
  standalone: false,
  templateUrl: './fashion-detail58.html',
  styleUrl: './fashion-detail58.css',
})
export class FashionDetail58 implements OnInit {
 fashion: any = null;
  errMessage: string = '';

  constructor(
    private _service: FashionAPIService58,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) { }

ngOnInit(): void {
  const id = this.route.snapshot.params['id'];
  this._service.getFashion(id).subscribe({
    next: (data) => { 
      this.fashion = data;
      this.cdr.detectChanges(); 
    },
    error: (err) => { this.errMessage = err }
  });
}

  goBack() { this.router.navigate(['/ex-58-admin']); }  
  goEdit() { this.router.navigate(['/ex-58-edit', this.fashion._id]); } 
}
