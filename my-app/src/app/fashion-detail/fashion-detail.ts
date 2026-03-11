import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FashionAPIService } from '../fashion-apiservice';

@Component({
  selector: 'app-fashion-detail',
  standalone: false,
  templateUrl: './fashion-detail.html',
  styleUrl: './fashion-detail.css',
})
export class FashionDetail {
fashion: any;
    errMessage: string = '';

    constructor(
        private _service: FashionAPIService,
        private _route: ActivatedRoute  
    ) {}

    ngOnInit() {
        const id = this._route.snapshot.params['id'];
        this._service.getFashion(id).subscribe({
            next: (data) => { this.fashion = data; },
            error: (err) => { this.errMessage = err; }
        });
    }
}
