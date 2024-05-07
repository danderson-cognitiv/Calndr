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


@NgModule({
    declarations: [
      AppComponent,
      SimpleCalendarComponent,
      HomePageComponent,
      FriendsComponent,
      ProfileComponent,
      EventChatComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      CommonModule,
      FormsModule
    ],
    providers: [CalndrProxyService, provideAnimationsAsync()],
    bootstrap: [AppComponent]
  })
  export class AppModule { }