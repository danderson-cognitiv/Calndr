// import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { CalendarEvent, CalendarView } from 'angular-calendar';
// import { startOfWeek, endOfWeek, addHours } from 'date-fns';

// @Component({
//   selector: 'app-calendar',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   templateUrl: './calendar.component.html',
//   styleUrls: ['./calendar.component.css']
// })
// export class CalendarComponent {
//   view: CalendarView = CalendarView.Week;
//   viewDate: Date = new Date();

//   events: CalendarEvent[] = [
//     {
//       start: addHours(startOfWeek(new Date()), 2),
//       end: addHours(startOfWeek(new Date()), 4),
//       title: 'An event',
//       color: {
//         primary: '#ad2121',
//         secondary: '#FAE3E3'
//       }
//     },
//     {
//       start: addHours(endOfWeek(new Date()), -3),
//       end: addHours(endOfWeek(new Date()), -1),
//       title: 'Another event',
//       color: {
//         primary: '#1e90ff',
//         secondary: '#D1E8FF'
//       }
//     }
//   ];
// }

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Subject } from 'rxjs';
import { addDays, startOfDay, isSameMonth, isSameDay } from 'date-fns';

@Component({
  selector: 'app-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  refresh: Subject<void> = new Subject<void>();

  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'An event with no end date',
      color: { primary: '#ad2121', secondary: '#FAE3E3' }
    }
  ];

  dayClicked({ day }: { day: any; sourceEvent: MouseEvent | KeyboardEvent }): void {
    const date = day.date;
    const events = day.events as CalendarEvent[];
    if (isSameMonth(date, this.viewDate)) {
      if (isSameDay(this.viewDate, date) || events.length === 0) {
        this.viewDate = date;
        this.addEvent(date);
      }
    }
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  addEvent(date: Date): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(date),
        color: { primary: '#e3bc08', secondary: '#FDF1BA' }
      }
    ];
    this.refresh.next();
  }

  navigateDays(days: number): void {
    this.viewDate = addDays(this.viewDate, days);
  }
}




// import { Component, ChangeDetectionStrategy, TemplateRef, ViewChild } from '@angular/core';
// import { startOfDay, endOfDay, subDays, addDays, endOfMonth, isSameDay, isSameMonth, addHours } from 'date-fns';
// import { Subject } from 'rxjs';
// import {
//   CalendarEvent,
//   CalendarEventAction,
//   CalendarEventTimesChangedEvent,
//   CalendarView,
// } from 'angular-calendar';
// import { EventColor } from 'calendar-utils';

// const colors: Record<string, EventColor> = {
//   red: {
//     primary: '#ad2121',
//     secondary: '#FAE3E3',
//   },
//   blue: {
//     primary: '#1e90ff',
//     secondary: '#D1E8FF',
//   },
//   yellow: {
//     primary: '#e3bc08',
//     secondary: '#FDF1BA',
//   },
// };

// @Component({
//   selector: 'app-calendar-component',
//   changeDetection: ChangeDetectionStrategy.OnPush,
//   templateUrl: './calendar.component.html',
//   styleUrls: ['./calendar.component.css']
// })
// export class CalendarComponent {
//   @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

//   view: CalendarView = CalendarView.Month;
//   CalendarView = CalendarView;
//   viewDate: Date = new Date();

//   modalData: {
//     action: string;
//     event: CalendarEvent;
//   };

//   actions: CalendarEventAction[] = [
//     {
//       label: '<i class="fas fa-fw fa-pencil-alt"></i>',
//       a11yLabel: 'Edit',
//       onClick: ({ event }: { event: CalendarEvent }): void => {
//         this.handleEvent('Edited', event);
//       },
//     },
//     {
//       label: '<i class="fas fa-fw fa-trash-alt"></i>',
//       a11yLabel: 'Delete',
//       onClick: ({ event }: { event: CalendarEvent }): void => {
//         this.events = this.events.filter(iEvent => iEvent !== event);
//         this.handleEvent('Deleted', event);
//       },
//     },
//   ];

//   refresh: Subject<void> = new Subject<void>();

//   events: CalendarEvent[] = [
//     {
//       start: subDays(startOfDay(new Date()), 1),
//       end: addDays(new Date(), 1),
//       title: 'A 3 day event',
//       color: { ...colors['red'] },
//       actions: this.actions,
//       allDay: true,
//       resizable: {
//         beforeStart: true,
//         afterEnd: true,
//       },
//       draggable: true,
//     },
//     {
//       start: startOfDay(new Date()),
//       title: 'An event with no end date',
//       color: { ...colors['yellow'] },
//       actions: this.actions,
//     },
//     {
//       start: subDays(endOfMonth(new Date()), 3),
//       end: addDays(endOfMonth(new Date()), 3),
//       title: 'A long event that spans 2 months',
//       color: { ...colors['blue'] },
//       allDay: true,
//     },
//     {
//       start: addHours(startOfDay(new Date()), 2),
//       end: addHours(new Date(), 2),
//       title: 'A draggable and resizable event',
//       color: { ...colors['yellow'] },
//       actions: this.actions,
//       resizable: {
//         beforeStart: true,
//         afterEnd: true,
//       },
//       draggable: true,
//     },
//   ];

//   activeDayIsOpen: boolean = true;
//   showModal: boolean = false;

//   constructor() {}

//   dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
//     if (isSameMonth(date, this.viewDate)) {
//       if (
//         (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
//         events.length === 0
//       ) {
//         this.activeDayIsOpen = false;
//       } else {
//         this.activeDayIsOpen = true;
//       }
//       this.viewDate = date;
//     }
//   }

//   eventTimesChanged({
//     event,
//     newStart,
//     newEnd,
//   }: CalendarEventTimesChangedEvent): void {
//     this.events = this.events.map(iEvent => {
//       if (iEvent === event) {
//         return { ...event, start: newStart, end: newEnd };
//       }
//       return iEvent;
//     });
//     this.handleEvent('Dropped or resized', event);
//   }

//   handleEvent(action: string, event: CalendarEvent): void {
//     this.modalData = { action, event };
//     this.showModal = true;
//   }

//   addEvent(): void {
//     this.events = [
//       ...this.events,
//       {
//         title: 'New event',
//         start: startOfDay(new Date()),
//         end: endOfDay(new Date()),
//         color: colors['red'],
//         draggable: true,
//         resizable: {
//           beforeStart: true,
//           afterEnd: true,
//         },
//       },
//     ];
//   }

//   deleteEvent(eventToDelete: CalendarEvent) {
//     this.events = this.events.filter(event => event !== eventToDelete);
//   }

//   setView(view: CalendarView) {
//     this.view = view;
//   }

//   closeOpenMonthViewDay() {
//     this.activeDayIsOpen = false;
//   }

//   closeModal() {
//     this.showModal = false;
//   }
// }
