import { Component } from '@angular/core';
import { BookAPIService } from '../book-api';
import { Book } from '../my class/book';

@Component({
  selector: 'app-book-update',
  standalone: false,
  templateUrl: './book-update.html',
  styleUrl: './book-update.css',
})
export class BookUpdate {
  book=new Book(); 
  books:any 
  errMessage:string='' 
  constructor(private _service: BookAPIService){ 
  this._service.getBooks().subscribe({ 
  next:(data)=>{this.books=data}, 
  error:(err)=>{this.errMessage=err} 
  }) 
  } 
  putBook() 
  { 
    this._service.putBook(this.book).subscribe({ 
    next:(data)=>{this.books=data}, 
    error:(err)=>{this.errMessage=err} 
    }) 
  } 
} 
