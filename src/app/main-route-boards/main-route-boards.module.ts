import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { BoardComponent } from './components/board/board.component';
import { BoardsRouteComponent } from './pages/boards-route/boards-route.component';
import { BoardsService } from './services/boards.service';
import { BoardFormComponent } from './components/board-form/board-form.component';
import { SharedModule } from '../shared/shared.module';
import { ModalServiceService } from '../shared/services/modal-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MainRouteBoardsRoutingModule } from './main-route-boards-routing.module';
import { BoardIconComponent } from './components/board-icon/board-icon.component';
import { ColumnFormComponent } from './components/column-form/column-form.component';
import { ColumnComponent } from './components/column/column.component';
import { TaskComponent } from './components/task/task.component';
import { TaskFormComponent } from './components/task-form/task-form.component';

@NgModule({
  declarations: [
    NewBoardComponent,
    BoardComponent,
    BoardsRouteComponent,
    BoardFormComponent,
    BoardIconComponent,
    ColumnFormComponent,
    ColumnComponent,
    TaskComponent,
    TaskFormComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    NgMultiSelectDropDownModule.forRoot(),
    MainRouteBoardsRoutingModule,
  ],
  providers: [BoardsService, ModalServiceService],
  exports: [BoardsRouteComponent, NewBoardComponent],
})
export class MainRouteBoardsModule {}
