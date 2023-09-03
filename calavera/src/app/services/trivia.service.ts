import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TriviaQuestion } from '../models/triviaQuestion.model';

@Injectable()
export class TriviaService {
  root = ""

  constructor(private http: HttpClient) { }

  getTrivia() {
    return this.http.get<TriviaQuestion[]>(this.root + "/api/trivia/search")
  }

  searchTrivia(id: number) {
    return this.http.get<TriviaQuestion>(this.root + "/api/trivia/search/" + id)
  }

  saveTrivia(triviaQuestion: TriviaQuestion) {
    return this.http.post<TriviaQuestion>(this.root + "/api/trivia", triviaQuestion)
      .pipe(
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
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}