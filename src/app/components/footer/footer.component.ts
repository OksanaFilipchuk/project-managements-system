import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  link = {
    course: 'https://rs.school/angular/',
    github: 'https://github.com/OksanaFilipchuk',
  };
}
