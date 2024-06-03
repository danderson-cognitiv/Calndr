import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { EventChatComponent } from './event-chat/event-chat.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './AuthGuard';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'event/:userEventId', component: EventChatComponent, canActivate: [AuthGuard] },
  { path: 'events', component: MyEventsComponent, canActivate: [AuthGuard] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // { path: '**', redirectTo: '', pathMatch: 'full' } // Catch-all route to redirect to home
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
