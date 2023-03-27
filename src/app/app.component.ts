import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthorizeService } from './authorizing/services/authorize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AuthorizeService],
})
export class AppComponent implements OnInit {
  constructor(private route: Router, public translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.route.navigate(['Boards']);
    } else {
      this.route.navigate(['Welcome']);
    }
  }
  changeLang(lang: any) {
    this.translate.setDefaultLang(lang);
  }

  navigateTo(event: any) {
    if (event.token) {
      this.route.navigate(['Boards']);
    } else {
      this.route.navigate(['Welcome']);
    }
  }
}
