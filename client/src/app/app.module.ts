import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleCalendarComponent } from './simple-calendar/simple-calendar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomePageComponent } from './home-page/home-page.component';
import { FriendsComponent } from './friends/friends.component';
import { CalndrProxyService } from './proxies/calndrproxy.service';


@NgModule({
    declarations: [
      AppComponent,
      SimpleCalendarComponent,
      HomePageComponent,
      FriendsComponent
    ],
    imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule
    ],
    providers: [CalndrProxyService, provideAnimationsAsync()],
    bootstrap: [AppComponent]
  })
  export class AppModule { }