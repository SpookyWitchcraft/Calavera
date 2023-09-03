import { Component, OnInit } from "@angular/core";
import { TriviaQuestion } from "src/app/models/triviaQuestion.model";
import { TriviaService } from "src/app/services/trivia.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-trivia',
    templateUrl: './trivia.component.html',
    styleUrls: ['../../app.component.scss'],
    providers: [TriviaService]
  })

export class TriviaComponent implements OnInit {
    triviaQuestions: TriviaQuestion[] = [];

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, private readonly triviaService: TriviaService) {}

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

  edit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }
}