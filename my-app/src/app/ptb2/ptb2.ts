import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb2',
  standalone: false,
  templateUrl: './ptb2.html',
  styleUrl: './ptb2.css',
})
export class Ptb2 {
  hsa: string = '100';
  hsb: string = '200';
  hsc: string = '300';
  result: string = '............';
  get_solution() {
  let a = parseFloat(this.hsa);
  let b = parseFloat(this.hsb);
  let c = parseFloat(this.hsc);
  
  if (a == 0) {
    if (b == 0 && c == 0) {
      this.result = 'He phuong trinh co vo so nghiem';
      return;
    }
    else if (b != 0 && c != 0) {
      this.result = 'He phuong trinh vo nghiem';
      return;
    }
    else {
      let x = -c / b;
      this.result = 'He phuong trinh co nghiem x= ' + x;
      return;
    }
  }
  else {
    let delta = Math.pow(b, 2) - 4 * a * c;
    
    if (delta < 0) {
      this.result = 'Phuong trinh vo nghiem';
    }
    else if (delta == 0) {
      let x = -b / (2 * a);
      this.result = 'Phuong trinh co nghiem kep x1=x2= ' + x;
    } 
    else {
      let x1 = (-b + Math.sqrt(delta)) / (2 * a);
      let x2 = (-b - Math.sqrt(delta)) / (2 * a);
      this.result = 'Phuong trinh co 2 nghiem phan biet x1= ' + x1 + ', x2= ' + x2;
    }
  }
}
}

