import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { IUserModel } from '../../../../database/interfaces/IUserModel';
import { FriendSelectionService } from './friend-selection.service';
import { FriendColorService } from './friend-color.service';
import { AuthService } from '../AuthService';
import { filter, switchMap } from 'rxjs/operators';

const colors: string[] = [
  '#ad2121', '#1e90ff', '#e3bc08', '#34A853', '#FFA500', '#800080', '#008080'
];

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  currentUser: { _id: string, username: string, selected: boolean } | null = null;
  friends: any[] = [];
  friendColorMap: Map<string, string> = new Map();

  constructor(
    private router: Router,
    private proxy$: CalndrProxyService,
    private friendSelectionService: FriendSelectionService,
    private friendColorService: FriendColorService,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    // Wait until the user is loaded before performing operations
    this.authService.currentUser$.pipe(
      filter((user): user is IUserModel => !!user && !!user._id)
    ).subscribe({
      next: (result: IUserModel) => {
        this.currentUser = { _id: result._id, username: 'You', selected: false };
        this.friends = [this.currentUser, ...(result.friends || [])];
        this.friendColorService.initializeFriendColors(this.friends);
      },
      error: (error) => {
        console.error('Failed to load friends:', error);
        this.currentUser = { _id: 'currentUserId', username: 'You', selected: false };
        this.friends = [this.currentUser];
      }
    });
  }

  initializeFriendColors(): void {
    this.friends.forEach((friend, index) => {
      const color = colors[index % colors.length];
      this.friendColorMap.set(friend._id, color);
    });
  }

  toggleFriendSelection(friend: any) {
    friend.selected = !friend.selected;
    this.friendSelectionService.updateSelectedFriends(
      this.friends.filter(friend => friend.selected)
    );
  }

  getFriendColor(friendId: string): string {
    return this.friendColorService.getFriendColor(friendId);
  }
}
