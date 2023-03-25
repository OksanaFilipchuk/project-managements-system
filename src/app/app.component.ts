import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizeService } from './authorizing/services/authorize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthorizeService],
})
export class AppComponent implements OnInit {
  constructor(private route: Router) {}
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.route.navigate(['Boards']);
    } else {
      this.route.navigate(['Welcome']);
    }
  }

  navigateTo(event: any) {
    if (event.token) {
      this.route.navigate(['Boards']);
    } else {
      this.route.navigate(['Welcome']);
    }
  }
}
