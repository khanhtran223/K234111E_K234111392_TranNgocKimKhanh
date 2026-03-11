import { Component } from '@angular/core';
import { BookAPIService } from '../book-api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
})
export class Books {
  books:any; 
  errMessage:string='' 
  constructor(private _service: BookAPIService, private router:Router, private activeRouter:ActivatedRoute){ 
    this._service.getBooks().subscribe({ 
      next:(data)=>{this.books=data}, 
      error:(err)=>{this.errMessage=err} 
    }) 
  } 
  view_detail(bookId:any)
  {
    this.router.navigate(['/ex-41', bookId]);
  }
  searchBook(bookId:string) 
  { 
    this._service.getBook(bookId).subscribe({ 
      next:(data)=>{this.books=[data]}, 
      error:(err)=>{this.errMessage=err} 
    }) 
  } 
    updateBook(bookId: string) {
    console.log('Update book:', bookId);
    // TODO: xử lý logic update
  }

  deleteBook(bookId: string) {
    console.log('Delete book:', bookId);
    // TODO: xử lý logic delete
  }
} 
