import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { TriviaService } from './trivia.service';
import { TriviaQuestion } from '../models/triviaQuestion.model';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

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

  //////////////////////////

  // it('search should return error', (done) => {
  //   const mockErrorResponse = { status: 400, statusText: 'Bad request' };
  //   const data = 'Invalid request';

  //   triviaService.searchTrivia(1).subscribe(x => {

  //   }, err => {
  //     expect(err).toBeTruthy();
  //     console.log(err.error);
  //     done();
  //   });
  //   const req = httpMock.expectOne(`${environment.slimerUrl}/api/trivia/search/${1}`);
  //   expect(req.request.method).toEqual('GET');
  //   req.flush(data, mockErrorResponse);
  // });

  it('get throws error', () => {
    triviaService.getTrivia().subscribe(
      data => fail('Should have failed with error'),
      (error: HttpErrorResponse) => {
        console.log(error.error);
        expect(error.status).toEqual(0);
        expect(error.error).toContain('0');
      }
    );

    const req = httpMock.expectOne(`${environment.slimerUrl}/api/trivia/search`);

    // Respond with mock error
    req.flush('0', { status: 0, statusText: 'An error occurred:' });
  });

  it('search throws 404 error', () => {
    triviaService.searchTrivia(1).subscribe(
      data => fail('Should have failed with 404 error'),
      (error: HttpErrorResponse) => {
        console.log(error.error);
        expect(error.status).toEqual(404);
        expect(error.error).toContain('404');
      }
    );

    const req = httpMock.expectOne(`${environment.slimerUrl}/api/trivia/search/${1}`);

    // Respond with mock error
    req.flush('404', { status: 404, statusText: 'Not Found' });
  });

  it('save throws 500 error', () => {
    const question: TriviaQuestion = {
      id: 1,
      category: "general",
      question: "When?",
      answer: "Now",
      isEnabled: true,
      createdDate: new Date(),
      updatedDate: new Date()
    };

    triviaService.saveTrivia(question).subscribe(
      data => fail('Should have failed with 500 error'),
      (error: HttpErrorResponse) => {
        console.log(error.error);
        expect(error.status).toEqual(500);
        expect(error.error).toContain('500');
      }
    );

    const req = httpMock.expectOne(`${environment.slimerUrl}/api/trivia`);

    // Respond with mock error
    req.flush('500', { status: 500, statusText: 'Internal Server Error' });
  });
});