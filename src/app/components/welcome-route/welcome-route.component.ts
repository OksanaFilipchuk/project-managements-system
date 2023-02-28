import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-route',
  templateUrl: './welcome-route.component.html',
  styleUrls: ['./welcome-route.component.scss'],
})
export class WelcomeRouteComponent {
  black: string = 'black';
  title: string = 'About Project Management System';
  capabilities: string[] = [
    'Create boards',
    'Create tasks',
    'Manage tasks',
    'Check done tasks',
  ];
  content2: string = `JS/Frontend development course - one of the courses of Rolling Scope school. 
  The program of JS/Frontend development course consists of 3 stages and continues about 7 mounts. This course cover topics: Git, HTML, CSS, Javascript and Angular. The Mentors and trainers of the school are front-end and javascript developers from different companies/countries.`;
  content3: string = `Project Management System is the final task of JS/Frontend development course. This app was created in Angular by `;
}
