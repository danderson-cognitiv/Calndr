import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleCalendarComponent } from './simple-calendar/simple-calendar.component';


const routes: Routes = [
    {path: '', component: SimpleCalendarComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }