import { Component } from '@angular/core';

@Component({
  selector: 'app-learnbinding',
  standalone: false,
  templateUrl: './learnbinding.html',
  styleUrl: './learnbinding.css',
})
export class Learnbinding {
  student_id: string = 'K234111411';
  student_name: string = 'Dang Mai Nhung';
  student_address: string= 'Ho Chi Minh City, Viet Nam';
  red_text_style = { color: 'red' };
}