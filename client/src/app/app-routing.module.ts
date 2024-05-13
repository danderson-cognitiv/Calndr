import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import { EventChatComponent } from './event-chat/event-chat.component';

const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'profile', component: ProfileComponent},
    { path: 'event/:userEventId', component: EventChatComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }