import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { PollsComponent } from './pollslist/pollslist.component';
import { Login } from './login/login';
import { LoggedInGuard } from './loggedInGuard';
import { ResultsComponent } from './results/results.component'
import { VotingCardsComponent } from './votingcards/votingcards.component'

//Admin
import { AddEditPollComponent } from './pollsadmin/addeditpoll.component';

const appRoutes: Routes = [
    { path: '', component: Login },
    { path: 'login', component: Login },
    { path: 'polls', component: PollsComponent, canActivate: [LoggedInGuard] },
    { path: 'results/:id', component: ResultsComponent },
    { path: 'pollsadmin', component: AddEditPollComponent },
    { path: 'votepoll/:id', component: VotingCardsComponent },
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);