import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { WelcomeRouteComponent } from './components/welcome-route/welcome-route.component';
import { AuthorizingModule } from '../authorizing/authorizing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, WelcomeRouteComponent],
  exports: [HeaderComponent, FooterComponent, WelcomeRouteComponent],
  imports: [CommonModule, AuthorizingModule, SharedModule],
})
export class CoreModule {}
