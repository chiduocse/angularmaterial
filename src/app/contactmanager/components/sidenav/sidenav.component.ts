import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatDrawer } from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>;
  isDarkTheme: boolean = false;
  dir: string = 'ltr';
  constructor(
    zone: NgZone,
    private userService: UserService,
    private router: Router) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = mql));
  }

  @ViewChild(MatDrawer) drawer: MatDrawer;


  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }
  toggleDir() {
    this.dir = this.dir == 'ltr' ? 'rtl' : 'ltr';
    this.drawer.toggle().then(() => this.drawer.toggle());
  }
  ngOnInit() {
    this.users = this.userService.users;
    this.userService.loadAll();

    this.router.events.subscribe(() => {
      // tslint:disable-next-line:curly
      if (this.isScreenSmall())
        this.drawer.close();
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
