
import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TriviaService } from './trivia.service';
import { TriviaQuestion } from '../models/triviaQuestion.model';
import { environment } from 'src/environments/environment';

describe('TriviaService', () => {

  let httpMock: HttpTestingController;
  let triviaService: TriviaService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TriviaService
      ]
    });

    triviaService = TestBed.inject(TriviaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('get should get questions', () => {

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
    ];

    triviaService.getTrivia().subscribe((res) => {
      expect(res).toEqual(questions);
    });

    const req = httpMock.expectOne(environment.slimerUrl + '/api/trivia/search');
    expect(req.request.method).toEqual("GET");
    req.flush(questions);

    httpMock.verify();
  });

  it('search should get question', () => {

    const question: TriviaQuestion = {
      id: 1,
      category: "general",
      question: "When?",
      answer: "Now",
      isEnabled: true,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    triviaService.searchTrivia(1).subscribe((res) => {
      expect(res).toEqual(question);
    });

    const req = httpMock.expectOne(environment.slimerUrl + '/api/trivia/search/' + 1);
    expect(req.request.method).toEqual("GET");
    req.flush(question);

    httpMock.verify();
  });

  it('save should post question', () => {

    const question: TriviaQuestion = {
      id: 1,
      category: "general",
      question: "When?",
      answer: "Now",
      isEnabled: true,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    triviaService.saveTrivia(question).subscribe((res) => {
      expect(res).toEqual(question);
    });

    const req = httpMock.expectOne(environment.slimerUrl + '/api/trivia');
    expect(req.request.method).toEqual("POST");
    req.flush(question);

    httpMock.verify();
  });
});