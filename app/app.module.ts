//Librerias
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule, JsonpModule, Http } from '@angular/http';
import { Ng2PaginationModule } from 'ng2-pagination';

import { AppComponent } from './app.component';


import { PollsComponent } from './pollslist/pollslist.component'
import { Login } from './login/login'
import { SpinnerComponent } from './common-services/spinner/spinner';
import { TitleHeader } from './common-services/titleheader/titleHeader.component';
import { Profile } from './common-services/profile/profile'
import { LoggedInGuard } from './loggedInGuard';
import { AuthenticationService } from './common-services/authentication/authentication.service';
import { ResultsComponent } from './results/results.component'
import { PollsApi } from './common-services/polls-api/polls-api.service';

//Admin
import { AddEditPollComponent } from './pollsadmin/addeditpoll.component';

//external components
import { DatepickerModule, TimepickerModule, Ng2BootstrapModule }   from 'ng2-bootstrap/ng2-bootstrap';

const routes: Routes = [

];


@NgModule({
  declarations: [
    AppComponent,
    PollsComponent,
    Login,
    SpinnerComponent,
    TitleHeader,
    Profile,
    ResultsComponent,
    AddEditPollComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing,
    RouterModule.forRoot(routes, { useHash: true }),  // .../#/crisis-center/
    BrowserModule,
    Ng2BootstrapModule,
    Ng2PaginationModule,
    DatepickerModule,
    TimepickerModule
  ],
  providers: [LoggedInGuard, AuthenticationService, PollsApi],
  bootstrap: [AppComponent]
})

export class AppModule {
}

