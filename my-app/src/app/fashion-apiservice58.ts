import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Fashion58 } from './fashion58';

@Injectable({
  providedIn: 'root',
})
export class FashionAPIService58 {

  constructor(private _http: HttpClient) { }

  // ===== GET TẤT CẢ FASHION =====
  getFashions(): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8")
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.get<any>("/fashions", requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Fashion58>),
      retry(3),
      catchError(this.handleError))
  }

  // ===== GET 1 FASHION THEO ID =====
  getFashion(id: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>(`/fashions/${id}`, requestOptions).pipe(
      map(res => JSON.parse(res) as Fashion58),
      retry(3),
      catchError(this.handleError)
    );
  }

  // ===== GET LỌC THEO STYLE (bài 58 yêu cầu) =====
  getFashionsByStyle(style: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "text/plain;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.get<any>("/fashions/style/" + encodeURIComponent(style), requestOptions).pipe(
      map(res => JSON.parse(res) as Array<Fashion58>),
      retry(3),
      catchError(this.handleError)
    );
  }

  // ===== POST THÊM MỚI FASHION =====
  postFashion(aFashion: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8") // ✅ Sửa: "ContentType" → "Content-Type"
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    }
    return this._http.post<any>("/fashions", JSON.stringify(aFashion), requestOptions).pipe(
      map(res => JSON.parse(res) as Fashion58),  // ✅ Sửa: Fashion → Fashion58
      retry(3),
      catchError(this.handleError))
  }

  // ===== PUT CẬP NHẬT FASHION =====
  putFashion(aFashion: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.put<any>("/fashions", JSON.stringify(aFashion), requestOptions).pipe(
      map(res => JSON.parse(res) as Fashion58),  // ✅ Sửa: Fashion → Fashion58
      retry(3),
      catchError(this.handleError)
    );
  }

  // ===== DELETE XÓA FASHION =====
  deleteFashion(id: string): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type", "application/json;charset=utf-8");
    const requestOptions: Object = {
      headers: headers,
      responseType: "text"
    };
    return this._http.delete<any>("/fashions/" + id, requestOptions).pipe(
      map(res => JSON.parse(res) as Fashion58),  // ✅ Sửa: Fashion → Fashion58
      retry(3),
      catchError(this.handleError)
    );
  }

  // ===== XỬ LÝ LỖI =====
  handleError(error: HttpErrorResponse) {
    return throwError(() => new Error(error.message))
  }
}