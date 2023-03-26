import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Output() changeAppToken = new EventEmitter<{ token: boolean }>();
  @Output() changeAppLang = new EventEmitter<{ lang: string }>();

  changeToken(event: { token: boolean }) {
    this.changeAppToken.emit(event);
  }
  changeLang(el: any) {
    this.changeAppLang.emit(el.value);
  }
}
