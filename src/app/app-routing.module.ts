import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsRouteComponent } from './main-route-boards/pages/boards-route/boards-route.component';
import { WelcomeRouteComponent } from './core/components/welcome-route/welcome-route.component';
import { BoardRouteComponent } from './board-route/pages/board-route/board-route.component';

const routes: Routes = [
  { path: 'Boards', component: BoardsRouteComponent },
  { path: 'Welcome', component: WelcomeRouteComponent },
  { path: 'Board/:id', component: BoardRouteComponent },
  { path: '', redirectTo: '/Welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
