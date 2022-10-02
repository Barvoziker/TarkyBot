import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(private http: HttpClient) {}

  private URLAPI = 'https://api.tarkov.dev/graphql';


   public doPost(body: any, options?: any) {
    return this.http
      .post(this.URLAPI, body, options)
      .pipe(retry(1), catchError(this.errorHandler));
  }


  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }


}