import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product-service';

@Component({
  selector: 'app-service-product-image-details',
  standalone: false,
  templateUrl: './service-product-image-details.html',
  styleUrl: './service-product-image-details.css',
}) 
export class ServiceProductImageDetails {
  selectedProduct:any 
  constructor(private activateRoute:ActivatedRoute,private _fs:ProductService, private router:Router) 
  { 
    activateRoute.paramMap.subscribe( 
      (param)=>{ 
        let id=param.get('id') 
         
        if(id!=null) 
        { 
          this.selectedProduct=_fs.getProductDetail(id)           
        } 
      } 
    )  
  } 
  goBack(){ 
    this.router.navigate(['ex-13']) 
  }  
} 
