import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { Student } from '../myclasses/student';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule, UpperCasePipe],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form {
  studentModel = new Student('Nam Anh', 'anh@gmail.com', '0909090909', 'python', 'toi');
  courses = ['python', 'Angular', 'React', 'Vue', 'NodeJS'];
  errFlag = false;

  validateCourse(value: any): void {
    if (value === 'none') this.errFlag = true;
    else this.errFlag = false;
  }
}
