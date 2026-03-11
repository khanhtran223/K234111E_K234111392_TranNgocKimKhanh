import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { customValidator, passwordValidator } from './check.validator';

@Component({
  selector: 'app-reactive-form',
  standalone: false,
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.css',
})
export class ReactiveForm {
  public regForm!: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.regForm = this._formBuilder.group({
      name: ['', [
        Validators.required, 
        Validators.minLength(3),
        customValidator(/^[a-zA-ZÀ-ỹ\s]+$/)  
      ]],
      email: ['', [
        Validators.required, 
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],
      confirmPass: ['', Validators.required]
    }, {
      validators: passwordValidator  
    });
  }

  get name() {
    return this.regForm.get('name');
  }

  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('password');
  }

  get confirmPass() {
    return this.regForm.get('confirmPass');
  }

  setDefaultValues() {
    this.regForm.setValue({
      name: 'DANG MAI NHUNG',
      email: 'nhung234111411@gmail.com',
      password: '',
      confirmPass: ''
    });
  }

  loadData() {
    this.regForm.patchValue({
      name: 'Hai Yen',
      email: 'test@gmail.com'
    });
  }

  // Reset form
  resetForm() {
    this.regForm.reset();
  }

  // Submit form
  onSubmit() {
    if (this.regForm.valid) {
      console.log('Form Data:', this.regForm.value);
      alert('Đăng ký thành công!\n' + JSON.stringify(this.regForm.value, null, 2));
    } else {
      console.log('Form is invalid');
      Object.keys(this.regForm.controls).forEach(key => {
        this.regForm.get(key)?.markAsTouched();
      });
    }
  }
}
