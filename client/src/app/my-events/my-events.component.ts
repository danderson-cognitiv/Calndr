import { Component, OnInit } from '@angular/core';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { Router } from '@angular/router';
import { IUserModel } from '../../../../database/interfaces/IUserModel';
import { Observable } from 'rxjs';
import { IUserEventViewModel } from '../../../../database/views/IUserEventViewModel';


@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  currentUserName:string = 'DandyAndy77'; //todo change this to dynamically save the userId. Write down we are going to hardcode to fname of Dave
  currentUser!: IUserModel;
  userEvents!: IUserEventViewModel[];

  constructor(
    private proxy$: CalndrProxyService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.proxy$.getUserByName(this.currentUserName).subscribe({
      next: (user: IUserModel) => {
        this.currentUser = user;
        this.loadUserEvents(user._id).subscribe({
          next: (events: IUserEventViewModel[]) => {
            this.userEvents = events;
            console.log(this.userEvents)
          },
          error: (error) => {
            console.error('Failed to load user events:', error);
          }
        });
      },
      error: (error) => {
        console.error('Failed to load user:', error);
      } 
    });
  }
  

    private loadUserEvents(userId: string): Observable<IUserEventViewModel[]> {
      return this.proxy$.getUserEventsByUserId(userId);
    }
}


