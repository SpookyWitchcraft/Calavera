import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TriviaQuestion } from '../models/triviaQuestion.model';

@Injectable()
export class TriviaService {
  constructor(private http: HttpClient) { }

  getTrivia() {
    return this.http.get<TriviaQuestion[]>("https://localhost:7242/api/trivia/search")
  }
}