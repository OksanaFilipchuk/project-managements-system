import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainRouteComponent } from './components/main-route/main-route.component';
import { WelcomeRouteComponent } from './components/welcome-route/welcome-route.component';
import { BoardRouteComponent } from './components/board-route/board-route.component';

const routes: Routes = [
  { path: 'Boards', component: MainRouteComponent },
  { path: 'Welcome', component: WelcomeRouteComponent },
  { path: 'Board/:id', component: BoardRouteComponent },
  { path: '', redirectTo: '/Welcome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
