import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Ticketing } from './ticketing.component';

const childRoutes: Routes = [
    {
        path: 'ticketing',
        component: Ticketing
    }
]

@NgModule({
    exports: [
        RouterModule
    ],
    imports: [
        RouterModule.forChild(childRoutes)
    ]
})

export class TicketingRoutingModule { }