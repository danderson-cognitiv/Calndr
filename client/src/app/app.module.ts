import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';;
import { AppComponent } from './app.component';
import { SimpleCalendarComponent } from './simple-calendar/simple-calendar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomePageComponent } from './home-page/home-page.component';
import { FriendsComponent } from './friends/friends.component';
import { CalndrProxyService } from './proxies/calndrproxy.service';
import { ProfileComponent } from './profile/profile.component';
import { EventChatComponent } from './event-chat/event-chat.component';
import { CommonModule } from '@angular/common';

// angular-calendar related
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarComponent } from './calendar/calendar.component';




@NgModule({
    declarations: [
      AppComponent,
      SimpleCalendarComponent,
      HomePageComponent,
      FriendsComponent,
      ProfileComponent,
      EventChatComponent,
      CalendarComponent,
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      CommonModule,
      FormsModule,
      BrowserAnimationsModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
    ],
    providers: [CalndrProxyService, provideAnimationsAsync()],
    bootstrap: [AppComponent]
  })
  export class AppModule { }