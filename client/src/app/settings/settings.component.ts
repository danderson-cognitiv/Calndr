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

  constructor(private proxy$: CalndrProxyService) {}

  ngOnInit(): void {
    this.loadFriends();
  }

  loadFriends(): void {
    this.proxy$.getUserByName('DandyAndy77').subscribe({
      next: (result: IUserModel) => {
        this.friends = result.friends || [];
        this.loadSelectionState();
      },
      error: (error) => {
        console.error('Failed to load friends:', error);
        this.friends = [];
      }
    });
  }

  loadSelectionState(): void {
    const storedState = localStorage.getItem('friendSelectionState');
    if (storedState) {
      const selectedFriends = JSON.parse(storedState);
      this.friends.forEach(friend => {
        friend.selected = selectedFriends.includes(friend._id);
      });
    }
  }

  saveSelectionState(): void {
    const selectedFriends = this.friends
      .filter(friend => friend.selected)
      .map(friend => friend._id);
    localStorage.setItem('friendSelectionState', JSON.stringify(selectedFriends));
  }

  submitSettings(): void {
    this.saveSelectionState();
    console.log('Settings submitted:', this.friends);
  }
}
