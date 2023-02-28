import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  token: boolean = true;
  @Output() changeToken = new EventEmitter();

  toggleToken() {
    this.token = !this.token;
    this.changeToken.emit();
    console.log(123);
  }
}
