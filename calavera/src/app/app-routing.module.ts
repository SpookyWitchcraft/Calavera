import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { TriviaComponent } from './features/trivia/trivia.component';
import { AppComponent } from './app.component';
import { TriviaEditComponent } from './features/trivia/trivia-edit.component';

const routes: Routes = [
  { 
    path: 'trivia', 
    canActivate: [AuthGuard],
    children: [
      {
        path: 'edit/:id',
        component: TriviaEditComponent
      },
      {
        path: '',
        component: TriviaComponent
      }
    ]
  },
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
