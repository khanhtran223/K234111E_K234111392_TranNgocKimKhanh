import { Component } from '@angular/core';
import { FashionAPIService58 } from '../fashion-apiservice58';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ex58',
  standalone: false,
  templateUrl: './ex58.html',
  styleUrl: './ex58.css',
})
export class Ex58 {
  constructor(private router: Router) {}

  goAdmin()  { this.router.navigate(['/ex-58-admin']); }
  goClient() { this.router.navigate(['/ex-58-client']); }
}