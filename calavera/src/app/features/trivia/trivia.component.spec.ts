import { TestBed } from "@angular/core/testing";
import { TriviaComponent } from "./trivia.component";
import { RouterTestingModule } from "@angular/router/testing";
import { TriviaQuestion } from "src/app/models/triviaQuestion.model";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

describe('TriviaComponent', () => {
    let httpSpy: jasmine.SpyObj<HttpClient>;
    let router: Router;

    const questions: TriviaQuestion[] = [
        {
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

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                { provide: HttpClient, useValue: httpSpy }
            ],
            declarations: [TriviaComponent]
        })

        router = TestBed.inject(Router)
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(TriviaComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it(`should retrive questions OnInit`, () => {
        httpSpy.get.and.returnValue(of(questions))

        const fixture = TestBed.createComponent(TriviaComponent);
        const triviaComponent = fixture.componentInstance;
        triviaComponent.ngOnInit();
        console.log(triviaComponent.triviaQuestions);
        expect(triviaComponent.triviaQuestions).toEqual(questions);
    });

    it('should navigate to edit', () => {
        const fixture = TestBed.createComponent(TriviaComponent);
        const triviaComponent = fixture.componentInstance;
        const navigateSpy = spyOn(router, 'navigate').and.stub();
        
        triviaComponent.edit(1);
        
        let routeInfo = navigateSpy.calls.first().args[0];
        console.log(routeInfo[0]);
        console.log(routeInfo[1]);

        expect(routeInfo[0]).toBe('edit');
        expect(routeInfo[1]).toBe(1);
    });
});
