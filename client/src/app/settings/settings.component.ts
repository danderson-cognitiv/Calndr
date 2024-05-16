import { Component, OnInit } from '@angular/core';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { IUserModel } from '../../../../database/interfaces/IUserModel';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  currentUser: { _id: string, username: string, selected: boolean } | null = null;
  friends: any[] = [];

  constructor( private proxy$: CalndrProxyService) {}

  ngOnInit(): void {
    this.proxy$.getUserByName('DandyAndy77').subscribe({
      next: (result: IUserModel) => {
        this.friends = result.friends || [];
      },
      error: (error) => {
        console.error('Failed to load friends:', error);
        this.friends = [];
      }
    });
  }

  submitSettings(): void {
    console.log('Settings submitted:', this.friends);
  }
}
