import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { TriviaQuestion } from "src/app/models/triviaQuestion.model";
import { of } from "rxjs";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { TriviaEditComponent } from "./trivia-edit.component";

describe('TriviaComponent', () => {
    let httpSpy: jasmine.SpyObj<HttpClient>;
    let router: Router;

    const question: TriviaQuestion =
    {
        id: 1,
        category: "general",
        question: "When?",
        answer: "Now",
        isEnabled: true,
        createdDate: new Date(),
        updatedDate: new Date()
    };

    beforeEach(() => {
        httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'put']);

        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpClientTestingModule
            ],
            providers: [
                { provide: HttpClient, useValue: httpSpy }
            ],
            declarations: [TriviaEditComponent]
        })

        router = TestBed.inject(Router)
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(TriviaEditComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it(`should retrive questions OnInit`, () => {
        httpSpy.get.and.returnValue(of(question))

        const fixture = TestBed.createComponent(TriviaEditComponent);
        const triviaEditComponent = fixture.componentInstance;
        triviaEditComponent.ngOnInit();

        expect(triviaEditComponent.triviaQuestion).toEqual(question);
    });

    it(`should update question OnSubmit`, () => {
        const updatedQuestion: TriviaQuestion =
        {
            id: 1,
            category: "Entertainment",
            question: "When?",
            answer: "Now",
            isEnabled: true,
            createdDate: new Date(),
            updatedDate: new Date()
        };

        httpSpy.get.and.returnValue(of(question))
        httpSpy.put.and.returnValue(of(updatedQuestion))

        const fixture = TestBed.createComponent(TriviaEditComponent);
        const triviaEditComponent = fixture.componentInstance;
        triviaEditComponent.ngOnInit();
        triviaEditComponent.onSubmit();

        expect(triviaEditComponent.triviaQuestion.category).toEqual("Entertainment");
    });
});
