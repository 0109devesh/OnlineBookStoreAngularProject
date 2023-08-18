import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AppService } from 'src/app/app.service';
import { User } from 'src/app/users/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  public loggedIn = false;

  currentUser!: any;

  private tokenCheckInterval: any; // Interval ID

  constructor(
    private appService: AppService,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.appService.isLoggedIn();
    this.getCurrentUserName();
    this.getCurrentUserObj();

    this.checkTokenStatus(); // Initial token status check
    this.tokenCheckInterval = setInterval(() => {
      this.ngZone.run(() => {
        this.checkTokenStatus(); // Check token status periodically

        this.cdRef.detectChanges(); // Trigger change detection
      });
    }, 1000); // Check every 1 second
  }

  ngOnDestroy(): void {
    clearInterval(this.tokenCheckInterval); // Clear the interval when the component is destroyed
  }

  private checkTokenStatus() {
    this.loggedIn = this.appService.isLoggedIn();
    if (!this.loggedIn) {
      this.currentUser = null; // Clear the user info when not logged in
    }
  }

  getCurrentUserName() {
    this.appService.getCurrentUser().subscribe(
      (username) => {
        this.currentUser = username;
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  getCurrentUserObj() {
    this.appService.getCurrentUserObj().subscribe(
      (user: User) => {
        console.log(user);
        console.log(user.name);
        console.log(user.userId);

        this.currentUser = user.name;
      },
      (error) => {
        console.log('Error', error);
      }
    );
  }

  logoutUser() {
    this.appService.logout();
    location.reload();
  }
}
