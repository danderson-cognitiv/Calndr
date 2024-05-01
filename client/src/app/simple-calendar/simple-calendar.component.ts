import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simple-calendar',
  templateUrl: './simple-calendar.component.html',
  styleUrls: ['./simple-calendar.component.css']
})
export class SimpleCalendarComponent implements OnInit {
  weeks: Date[][] = [];
  currentMonth: number;
  currentYear: number;

  constructor() {
    const today = new Date();
    this.currentMonth = today.getMonth();
    this.currentYear = today.getFullYear();
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1);
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    const days: Date[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(this.currentYear, this.currentMonth, i));
    }

    let week: Date[] = [];
    days.forEach((day) => {
      if (week.length < 7) {
        week.push(day);
      } else {
        this.weeks.push(week);
        week = [day];
      }
    });
    // Add the last week
    if (week.length > 0) {
      this.weeks.push(week);
    }
  }
}
