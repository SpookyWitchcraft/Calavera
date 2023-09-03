import { Component } from '@angular/core';
import { TriviaService } from './services/trivia.service';
import { TriviaQuestion } from './models/triviaQuestion.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TriviaService]
})
export class AppComponent {
  triviaQuestions: TriviaQuestion[] = [];

  constructor(private readonly triviaService: TriviaService) {}

  ngOnInit() {
    this.triviaService.getTrivia().subscribe({
      next: (data) => {
        this.triviaQuestions = data;
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log('complete')
      }
    })
  }
}
