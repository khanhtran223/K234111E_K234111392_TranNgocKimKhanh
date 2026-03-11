import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { IBook } from './my class/ex50_book';

@Injectable({
  providedIn: 'root',
})
export class Ex50Bookapi {
constructor(private _http: HttpClient) { } 
  
  // GET all books
  getBooks():Observable<any> 
  { 
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf8") 
    const requestOptions:Object={ 
      headers:headers, 
      responseType:"text" 
    } 
    return this._http.get<any>("http://localhost:3000/books",requestOptions).pipe( 
      map(res=>JSON.parse(res) as Array<IBook>), 
      retry(3), 
      catchError(this.handleError)) 
  } 
 
  handleError(error:HttpErrorResponse){ 
    return throwError(()=>new Error(error.message)) 
  } 
  
  // GET book by id
  getBook(bookId:string):Observable<any> 
  { 
    const headers=new HttpHeaders().set("Content-Type","text/plain;charset=utf-8") 
    const requestOptions:Object={ 
      headers:headers, 
      responseType:"text" 
    } 
    return this._http.get<any>("http://localhost:3000/books/"+bookId,requestOptions).pipe( 
      map(res=>JSON.parse(res) as IBook), 
      retry(3), 
      catchError(this.handleError)) 
  } 
  
  // POST - Create new book
  postBook(aBook:any):Observable<any>
  {
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8")
    const requestOptions:Object={
      headers:headers,
      responseType:"text"
    }
    return this._http.post<any>("http://localhost:3000/books/",JSON.stringify(aBook),requestOptions).pipe(
      map(res=>JSON.parse(res) as Array<IBook>),
      retry(3),
      catchError(this.handleError))
  }

  // PUT - Update book
  putBook(aBook:any):Observable<any> 
  { 
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8") 
    const requestOptions:Object={ 
      headers:headers, 
      responseType:"text" 
    } 
    return this._http.put<any>(
      "http://localhost:3000/books",
      JSON.stringify(aBook),
      requestOptions
    ).pipe(
      map(res => JSON.parse(res) as Array<IBook>),
      retry(3),
      catchError(this.handleError)
    )
  } 
  
  // DELETE book by id
  deleteBook(bookId:string):Observable<any> 
  { 
    const headers=new HttpHeaders().set("Content-Type","application/json;charset=utf-8") 
    const requestOptions:Object={ 
      headers:headers, 
      responseType:"text" 
    } 
    return this._http.delete<any>("http://localhost:3000/books/"+bookId,requestOptions).pipe( 
      map(res=>JSON.parse(res) as Array<IBook>), 
      retry(3), 
      catchError(this.handleError)) 
  } 
}