import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TriviaComponent } from './features/trivia/trivia.component';
import { TriviaEditComponent } from './features/trivia/trivia-edit.component';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '@auth0/auth0-angular';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    TriviaComponent,
    TriviaEditComponent
  ],
  imports: [
    BrowserModule,
    AuthModule.forRoot({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId,
      authorizationParams: {
        redirect_uri: window.location.origin
      },
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://{yourDomain}/api/v2/' (note the asterisk)
            uri: 'https://' + environment.auth0Domain + '/api/v2/*',
            tokenOptions: {
              authorizationParams: {
                // The attached token should target this audience
                audience: 'https://' + environment.auth0Domain + '/api/v2/',
    
                // The attached token should have these scopes
                scope: 'read:current_user'
              }
            }
          }
        ]
      }
    }),
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
