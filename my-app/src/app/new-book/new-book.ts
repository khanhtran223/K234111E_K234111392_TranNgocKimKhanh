import { Component } from '@angular/core';
import { BookAPIService } from '../book-api';
import { Book } from '../my class/book';

@Component({
  selector: 'app-new-book',
  standalone: false,
  templateUrl: './new-book.html',
  styleUrl: './new-book.css',
})
export class NewBook {
  book=new Book();
  books:any
  errMessage:string=''
  constructor(private _service: BookAPIService){
    this._service.getBooks().subscribe({
    next:(data)=>{this.books=data},
    error:(err)=>{this.errMessage=err}
    })
  }
  postBook()
  {
    this._service.postBook(this.book).subscribe({next:(data)=>{this.books=data},
    error:(err)=>{this.errMessage=err}
    })
  }

}
