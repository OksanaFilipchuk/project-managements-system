import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardRouteComponent } from './pages/board-route/board-route.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [BoardRouteComponent],
  imports: [CommonModule, SharedModule],
})
export class BoardRouteModule {}
