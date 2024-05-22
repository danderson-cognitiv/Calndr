import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { EventChatComponent } from './event-chat/event-chat.component';
import { MyEventsComponent } from './my-events/my-events.component';

const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'event/:userEventId', component: EventChatComponent },
    { path: 'events', component: MyEventsComponent },
    { path: 'settings', component: SettingsComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes, {useHash:true})],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }