import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { Header } from './shared/HeaderComponent/header.component';
import { PageNotFound } from './shared/PageNotFoundComponent/page-not-found.component';

import { TicketingModule } from './modules/ticketing/ticketing.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        TicketingModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        Header,
        PageNotFound
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }