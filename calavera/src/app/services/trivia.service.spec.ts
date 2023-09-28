
import { TestBed, inject, async } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TriviaService } from './trivia.service';
import { TriviaQuestion } from '../models/triviaQuestion.model';
import { environment } from 'src/environments/environment';
  
describe('TriviaService', () => {

  let httpMock: HttpTestingController;
  let triviaService: TriviaService;

  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        providers: [ TriviaService ]
    });

    triviaService = TestBed.inject(TriviaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('get should http GET questions', () => {

    const questions: TriviaQuestion[] = [{
        id: 1,
        category: "general",
        question: "When?",
        answer: "Now",
        isEnabled: true,
        createdDate: new Date(),
        updatedDate: new Date()
        },
        {
            id: 2,
            category: "general",
            question: "When?",
            answer: "Now",
            isEnabled: true,
            createdDate: new Date(),
            updatedDate: new Date()
        }
    ]

    triviaService.getTrivia().subscribe((res) => {
      expect(res).toEqual(questions);
    });

    const req = httpMock.expectOne(environment.slimerUrl + '/api/trivia/search');
    expect(req.request.method).toEqual("GET");
    req.flush(questions);

    httpMock.verify();
  });
});