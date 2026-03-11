import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-ex13',
  standalone: false,
  templateUrl: './ex13.html',
  styleUrl: './ex13.css',
})
export class Ex13 {
  public products:any 
  constructor(pservice: ProductService,private router:Router){ 
    this.products=pservice.getProductsWithImages() 
  } 
  viewDetail(p:any) 
  { 
    this.router.navigate(['service-product-image-event',p.ProductId]) 
  } 
} 