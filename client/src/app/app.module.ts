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
import { CreateEventModalComponent } from './create-event-modal/create-event-modal.component';
import { ProfileComponent } from './profile/profile.component';
import { EventChatComponent } from './event-chat/event-chat.component';
import { CommonModule } from '@angular/common';
import { MyEventsComponent } from './my-events/my-events.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
      AppComponent,
      SimpleCalendarComponent,
      HomePageComponent,
      FriendsComponent,
      CreateEventModalComponent,
      ProfileComponent,
      EventChatComponent,
      MyEventsComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      CommonModule,
      FormsModule,
      MatIconModule
    ],
    providers: [CalndrProxyService, provideAnimationsAsync()],
    bootstrap: [AppComponent]
  })
  export class AppModule { }