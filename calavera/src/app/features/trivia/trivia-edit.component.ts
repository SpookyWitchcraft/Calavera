import { Component, Inject, OnInit } from "@angular/core";
import { TriviaQuestion } from "src/app/models/triviaQuestion.model";
import { TriviaService } from "src/app/services/trivia.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-trivia-edit',
  templateUrl: './trivia-edit.component.html',
  styleUrls: ['../../app.component.scss'],
  providers: [TriviaService]
})

export class TriviaEditComponent implements OnInit {
  triviaQuestion!: TriviaQuestion;

  constructor(private readonly router: Router, private readonly route: ActivatedRoute, @Inject(TriviaService) private readonly triviaService: TriviaService) { }

  ngOnInit() {
    this.triviaQuestion = {} as TriviaQuestion
    this.triviaService.searchTrivia(this.route.snapshot.params["id"]).subscribe({
      next: (data) => {
        this.triviaQuestion = data;
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log('complete')
      }
    })
  }

  onSubmit() {
    this.triviaService.saveTrivia(this.triviaQuestion).subscribe({
      next: (data) => {
        this.triviaQuestion = data;
      },
      error: (error) => {
        console.log(error)
      },
      complete: () => {
        console.log('saved')
      }
    })
  }
}