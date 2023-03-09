import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRouteComponent } from './pages/board-route/board-route.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [BoardRouteComponent],
  imports: [CommonModule, SharedModule, AppRoutingModule],
})
export class BoardRouteModule {}
