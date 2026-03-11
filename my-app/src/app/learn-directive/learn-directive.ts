import { Component } from '@angular/core';

@Component({
  selector: 'app-learn-directive',
  standalone: false,
  templateUrl: './learn-directive.html',
  styleUrl: './learn-directive.css',
})
export class LearnDirective {
  flag_value: number = 0;
  changeView()
  {
    if (this.flag_value==1)
      this.flag_value=2;
    else
      this.flag_value=1;
  }
  products = ["Apple", "Banana", "Mango", "Orange"];
  customers = [
    {id:'c1', name:"John", phone:"123-456-7890", image:"assets/customer1.png"},
    {id:'c2', name:"Alice", phone:"987-654-3210", image:"assets/customer2.png"},
    {id:'c3', name:"Bob", phone:"555-555-5555", image:"assets/customer3.png"},
  ];
}
