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
import { SettingsComponent } from './settings/settings.component';
import { EventChatComponent } from './event-chat/event-chat.component';
import { CommonModule } from '@angular/common';
import { MyEventsComponent } from './my-events/my-events.component';
import { MatIconModule } from '@angular/material/icon';
import { ThemeSwitcherComponent } from './theme-switcher/theme-switcher.component'; 

// angular-calendar related
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';

import { CalendarComponent } from './calendar/calendar.component';

@NgModule({
    declarations: [
      AppComponent,
      SimpleCalendarComponent,
      HomePageComponent,
      FriendsComponent,
      CreateEventModalComponent,
      ProfileComponent,
      SettingsComponent,
      EventChatComponent,
      MyEventsComponent,
      CalendarComponent,
      ThemeSwitcherComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule,
      CommonModule,
      FormsModule,
      MatIconModule,
      BrowserAnimationsModule,
      NgbModalModule,
      FlatpickrModule,
      CalendarModule.forRoot({
        provide: DateAdapter,
        useFactory: adapterFactory,
      }),
    ],
    exports: [CalendarComponent],
    providers: [CalndrProxyService, provideAnimationsAsync()],
    bootstrap: [AppComponent]
  })
  export class AppModule { }