import { Component, OnInit } from "@angular/core";
import { TriviaQuestion } from "src/app/models/triviaQuestion.model";
import { TriviaService } from "src/app/services/trivia.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-trivia-edit',
    templateUrl: './trivia-edit.component.html',
    styleUrls: ['../../app.component.scss'],
    providers: [TriviaService]
  })

export class TriviaEditComponent implements OnInit {
  triviaQuestions: TriviaQuestion[] = [];

  constructor(private readonly router: Router, private readonly triviaService: TriviaService) {}

  ngOnInit() {
    console.log("ok");
  }
}