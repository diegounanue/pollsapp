import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import {AppComponent} from './app.component';
import { PollsComponent } from './pollslist/pollslist.component';
import { Login } from './login/login';
import { LoggedInGuard } from './loggedInGuard';

const appRoutes: Routes = [  
    { path: '', component: AppComponent },
    { path: 'login',  component: Login },
    { path: 'polls', component: PollsComponent, canActivate: [LoggedInGuard] }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);