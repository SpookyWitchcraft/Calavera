import { Component, Inject, OnInit } from "@angular/core";
import { TriviaQuestion } from "src/app/models/triviaQuestion.model";
import { TriviaService } from "src/app/services/trivia.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-trivia',
    templateUrl: './trivia.component.html',
    styleUrls: ['../../app.component.scss'],
    providers: [TriviaService]
  })

export class TriviaComponent {
    triviaQuestionId: string = "";

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}

  edit() {
    this.router.navigate(['edit', this.triviaQuestionId], { relativeTo: this.route });
  }
}