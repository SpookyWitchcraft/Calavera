import { TestBed } from "@angular/core/testing";
import { TriviaComponent } from "./trivia.component";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

describe('TriviaComponent', () => {
    let httpSpy: jasmine.SpyObj<HttpClient>;
    let router: Router;

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
            declarations: [TriviaComponent]
        })

        router = TestBed.inject(Router)
    });

    it('should create the component', () => {
        const fixture = TestBed.createComponent(TriviaComponent);
        const component = fixture.componentInstance;
        expect(component).toBeTruthy();
    });

    it('should navigate to edit', () => {
        const fixture = TestBed.createComponent(TriviaComponent);
        const triviaComponent = fixture.componentInstance;
        const navigateSpy = spyOn(router, 'navigate').and.stub();

        triviaComponent.triviaQuestionId = "1";
        triviaComponent.edit();

        let routeInfo = navigateSpy.calls.first().args[0];

        expect(routeInfo[0]).toBe('edit');
        expect(routeInfo[1]).toBe("1");
    });
});
