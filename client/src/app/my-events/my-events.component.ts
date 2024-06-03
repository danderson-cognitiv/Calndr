import { Component, OnInit } from '@angular/core';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { Router } from '@angular/router';
import { IUserModel } from '../../../../database/interfaces/IUserModel';
import { Observable, filter } from 'rxjs';
import { IUserEventViewModel } from '../../../../database/views/IUserEventViewModel';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})
export class MyEventsComponent implements OnInit {
  currentUser!: IUserModel;
  userEvents!: IUserEventViewModel[];

  constructor(
    private proxy$: CalndrProxyService, 
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.pipe(
      filter((user): user is IUserModel => !!user && !!user._id) // Type guard to ensure user is IUserModel
    ).subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loadUserEvents(user._id).subscribe({
          next: (events: IUserEventViewModel[]) => {
            this.userEvents = events;
            console.log(this.userEvents);
          },
          error: (error) => {
            console.error('Failed to load user events:', error);
          }
        });
      },
      error: (error) => {
        console.error('Failed to load current User:', error);
      }
    });
  }
  
  private loadUserEvents(userId: string): Observable<IUserEventViewModel[]> {
    return this.proxy$.getUserEventsByUserId(userId);
  }
}
