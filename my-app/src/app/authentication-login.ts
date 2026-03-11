import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationLogin {
    constructor(private _http: HttpClient) {}

    register(username: string, password: string): Observable<any> {
        return this._http.post<any>("/register", { username, password })
            .pipe(catchError(err => throwError(() => new Error(err.error?.message || err.message))));
    }

    login(username: string, password: string): Observable<any> {
        return this._http.post<any>("/login", { username, password })
            .pipe(catchError(err => throwError(() => new Error(err.error?.message || err.message))));
    }

    saveToken(token: string, username: string) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", username);
    }

    getToken(): string | null {
        return sessionStorage.getItem("token");
    }

    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    logout() {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("username");
    }

    getUsername(): string {
        return sessionStorage.getItem("username") || "";
    }
}