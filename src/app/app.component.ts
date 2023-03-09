import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private route: Router) {}

  navigateTo(event: any) {
    if (event.token) {
      this.route.navigate(['Boards']);
    } else {
      this.route.navigate(['Welcome']);
    }
  }
}
