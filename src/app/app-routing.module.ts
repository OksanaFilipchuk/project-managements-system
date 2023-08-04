import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardsRouteComponent } from './main-route-boards/pages/boards-route/boards-route.component';
import { WelcomeRouteComponent } from './core/components/welcome-route/welcome-route.component';
import { UserFormComponent } from './authorizing/components/user-form/user-form.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'Welcome', pathMatch: 'full' },
  { path: 'Welcome', component: WelcomeRouteComponent },
  { path: 'Boards', component: BoardsRouteComponent },
  { path: 'User-Form', component: UserFormComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
