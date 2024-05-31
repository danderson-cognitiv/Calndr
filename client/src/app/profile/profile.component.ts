import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CalndrProxyService } from '../proxies/calndrproxy.service';
import { IUserModel } from '../../../../database/interfaces/IUserModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userForm: FormGroup;
  user:any;

  constructor(private formBuilder: FormBuilder, private proxy$: CalndrProxyService, private router: Router) {
    // Initialize the form with default values or placeholders
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      eventsVisible: [false, Validators.required]  // Defaulting to false, update based on actual user data
    });
  }
  
  ngOnInit(): void {
    this.proxy$.getUserByName('DandyAndy77').subscribe({
      next: (user: IUserModel) => {
        this.user = user;
        this.userForm.patchValue({
          username: user.username,
          email: user.email,
          fName: user.fName,
          lName: user.lName,
          eventsVisible: user.eventsVisible.toString()
        });
      },
      error: (error) => console.error('Failed to load user profile:', error)
    });
  }
  
  

  saveProfile(): void {
    if (this.userForm.valid) {
      const formData = {
        ...this.userForm.value,
        eventsVisible: this.userForm.value.eventsVisible === 'true'
      };
  
      this.proxy$.updateUser(this.user._id, formData).subscribe({
        next: (result) => console.log('Profile updated successfully', result),
        error: (error) => console.error('Failed to update profile:', error)
      });
    }
  }
  
  
}
