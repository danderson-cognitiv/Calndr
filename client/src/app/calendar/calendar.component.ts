import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, OnInit } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
import { Subject, BehaviorSubject, of } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Router } from '@angular/router';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { IUserEventViewModel } from '../../../../database/views/IUserEventViewModel';
import { IUserModel } from '../../../../database/interfaces/IUserModel';
import { FriendSelectionService } from '../friends/friend-selection.service';
import { FriendColorService } from '../friends/friend-color.service';
import { AuthService } from '../AuthService';
import { filter, switchMap } from 'rxjs/operators';

const colors: Record<string, EventColor> = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  green: {
    primary: '#34A853',
    secondary: '#B9F6CA'
  },
  orange: {
    primary: '#FFA500',
    secondary: '#FFD580'
  },
  purple: {
    primary: '#800080',
    secondary: '#E6E6FA'
  },
  teal: {
    primary: '#008080',
    secondary: '#AADED6'
  }
};

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.Default,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: 'calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  activeDayIsOpen: boolean = false;
  events: CalendarEvent[] = [];
  refresh = new Subject<void>();
  currentUserId: string | null = null;

  private userLoaded = new BehaviorSubject<boolean>(false);

  // Labels for Editing and Deleting Events from Calendar 
  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  sampleEvents: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'A 3 day event',
      color: { ...colors['red'] },
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { ...colors['yellow'] },
      actions: this.actions,
    },
    {
      start: subDays(endOfMonth(new Date()), 3),
      end: addDays(endOfMonth(new Date()), 3),
      title: 'A long event that spans 2 months',
      color: { ...colors['blue'] },
      allDay: true,
    },
    {
      start: addHours(startOfDay(new Date()), 2),
      end: addHours(new Date(), 2),
      title: 'A draggable and resizable event',
      color: { ...colors['yellow'] },
      actions: this.actions,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
  ];

  constructor(
    private router: Router, 
    private proxy$: CalndrProxyService, 
    private friendSelectionService: FriendSelectionService,
    private friendColorService: FriendColorService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Ensure friends change subscription only occurs after user data is loaded
    this.authService.currentUser$.pipe(
      filter(user => !!user && !!user._id), // Check if user is not null or undefined and has an _id
      switchMap(user => this.loadUserData(user!._id)) // Use non-null assertion operator
    ).subscribe({
      next: () => {
        this.userLoaded.next(true);
      },
      error: (error) => {
        console.error('Failed to load current user data', error);
        this.userLoaded.next(false);
      }
    });
  
    this.userLoaded.pipe(
      filter(loaded => loaded),
      switchMap(() => this.friendSelectionService.selectedFriends$)
    ).subscribe(this.onSelectedFriendsChange.bind(this));
  }

  loadUserData(userId: string) {
    return this.proxy$.getUserById(userId).pipe(
      switchMap(user => {
        console.log('!!! received a user', user, user._id);
        this.currentUserId = user._id;
        this.userLoaded.next(true);
        return of(true);
      })
    );
  }
  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    console.log(`${action} event:`, event);
    this.router.navigate(['/event/' + event.meta.userEventId]);
  }
  
  onSelectedFriendsChange(selectedFriends: any[]): void {
    console.log("!!! friends are", selectedFriends);
    const allUserIds = selectedFriends.map(f => f._id);
    // Add the current user to the list of selected friends if selected
    if (this.currentUserId && !allUserIds.includes(this.currentUserId) && selectedFriends.some(f => f._id === this.currentUserId)) {
      allUserIds.push(this.currentUserId);
    }

    if (allUserIds.length > 0) {
      this.proxy$.getUserEventsByUserIds(allUserIds).subscribe({
        next: (userEvents: IUserEventViewModel[]) => {
          console.log('received events!', userEvents);
    
          const events = userEvents.map(({ event, user, _id: userEventId }: IUserEventViewModel) => ({
            start: new Date(event.startTime),
            end: new Date(event.endTime),
            title: event.name,
            color: { primary: this.friendColorService.getFriendColor(user._id), secondary: '#F0F0F0' },
            actions: this.actions,
            draggable: true,
            meta: { userEventId, user }
          }));
    
          console.log("!!! [app-calendar] attempting to update events", events);
          this.events = events;
        },
        error: (error) => {
          console.error('Failed to load user events:', error);
          this.events = [];
        }
      });
    }    
  }
  
  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
