import { Observable, throwError } from 'rxjs';
import { catchError, retry, timeout } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TriviaQuestion } from '../models/triviaQuestion.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class TriviaService {
  root = environment.slimerUrl;

  constructor(private http: HttpClient) { }

  getTrivia() {
    return this.http.get<TriviaQuestion[]>(this.root + "/api/trivia/search")
      .pipe(
        timeout(10000),
        catchError(this.handleError)
      )
  }

  searchTrivia(id: number) {
    return this.http.get<TriviaQuestion>(this.root + "/api/trivia/search/" + id)
      .pipe(
        timeout(10000),
        catchError(this.handleError)
      )
  }

  saveTrivia(triviaQuestion: TriviaQuestion) {
    return this.http.put<TriviaQuestion>(this.root + "/api/trivia", triviaQuestion)
      .pipe(
        timeout(10000),
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new HttpErrorResponse({ status: error.status, error: error.error }));
  }
}