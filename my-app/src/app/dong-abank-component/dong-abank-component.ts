import { Component } from '@angular/core';
import { DongABankService } from '../dong-abank-service';

@Component({
  selector: 'app-dong-abank-component',
  standalone: false,
  templateUrl: './dong-abank-component.html',
  styleUrl: './dong-abank-component.css',
})
export class DongABankComponent {
  data:any = {items: []}
  errMessage:string=''
  constructor(_service:DongABankService){
  _service.getDongABankData().subscribe({
  next:(data)=>{
  this.data=data
  },
  error:(err)=>{
  this.errMessage=err}
})
}
}
