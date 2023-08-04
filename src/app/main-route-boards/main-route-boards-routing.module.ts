import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { BoardsRouteComponent } from './pages/boards-route/boards-route.component';

const routes: Routes = [
  { path: 'Boards', component: BoardsRouteComponent },
  { path: 'Boards/:id', component: BoardComponent },
  { path: '', redirectTo: '/Boards', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class MainRouteBoardsRoutingModule {}
