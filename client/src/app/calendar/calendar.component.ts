import { Component, ChangeDetectionStrategy, ViewChild, TemplateRef, } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours, } from 'date-fns';
import { Subject } from 'rxjs';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView, } from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { Router } from '@angular/router';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { IUserEventViewModel } from '../../../../database/views/IUserEventViewModel';
import { title } from 'process';
import { IUserModel } from '../../../../database/interfaces/IUserModel';
import { FriendSelectionService } from '../friends/friend-selection.service';


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
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();

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

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];
  currentUserId: string | null = null;

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

  activeDayIsOpen: boolean = true;

  constructor(private router: Router, private proxy$: CalndrProxyService, private friendSelectionService: FriendSelectionService) {}

  ngOnInit(): void {
    this.friendSelectionService.selectedFriends$.subscribe(this.onSelectedFriendsChange.bind(this));
    this.proxy$.getUserByName('DandyAndy77').subscribe({
      next: (user: IUserModel) => {
        console.log('!!! received a user', user, user._id)
        this.currentUserId = user._id;
        this.proxy$.getUserEventsByUserId(user._id).subscribe({
          next: (userEvents: IUserEventViewModel[]) => {
            console.log('received events!', userEvents);
            const events = userEvents.map(({ event, _id: userEventId }) => ({
              start: new Date(event.startTime),
              end: new Date(event.endTime),
              title: event.name,
              color: { ...colors['blue'] },
              actions: this.actions,
              draggable: true,
              meta: { userEventId }

            }));
            console.log("parsed events:", events);
            this.events = events;
          },
          error: (error) => {
            console.error('Failed to load user events:', error);
            this.events = []; 
          }
        })
      },
      error: () => {},
    });
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
    console.log('hi');
    this.router.navigate(['/event/' + event.meta.userEventId]);

    // this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  onSelectedFriendsChange(selectedFriends: any[]) {
    console.log("!!! friends are", selectedFriends);
    const userIds = selectedFriends.map(f => f._id);
    userIds.push(this.currentUserId);

    this.proxy$.getUserEventsByUserIds(userIds).subscribe({
      next: (userEvents: IUserEventViewModel[]) => {
        console.log('received events!', userEvents);
        const events = userEvents.map(({ event, _id: userEventId }: IUserEventViewModel) => ({
          start: new Date(event.startTime),
          end: new Date(event.endTime),
          title: event.name,
          color: { ...colors['blue'] },
          actions: this.actions,
          draggable: true,
          meta: { userEventId }
        }));
        console.log("!!! [app-calendar] attempting to update events", events);
        this.events = events;
      },
      error: (error) => {
        console.error('Failed to load user events:', error);
        this.events = [];
      }
    })
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
