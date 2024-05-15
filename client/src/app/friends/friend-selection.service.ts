// friend-selection.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendSelectionService {
  private selectedFriendsSubject: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  selectedFriends$: Observable<string[]> = this.selectedFriendsSubject.asObservable();

  constructor() {}

  updateSelectedFriends(selectedFriends: string[]): void {
    this.selectedFriendsSubject.next(selectedFriends);
  }
}
