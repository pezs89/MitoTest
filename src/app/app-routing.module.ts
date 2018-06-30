import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFound } from './shared/PageNotFoundComponent/page-not-found.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/ticketing',
        pathMatch: 'full'
    },
    {
        path: 'ticketing',
        redirectTo: 'app/modules/ticketing/ticketing.module#TicketingModule',
    },
    {
        path: '**',
        component: PageNotFound
    }
]

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forRoot(appRoutes)
    ]
})

export class AppRoutingModule { }