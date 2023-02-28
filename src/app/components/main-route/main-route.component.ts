import { Component } from '@angular/core';
import { Board } from 'src/app/models/models';

@Component({
  selector: 'app-main-route',
  templateUrl: './main-route.component.html',
  styleUrls: ['./main-route.component.scss'],
})
export class MainRouteComponent {
  boards: Board[] = [
    {
      boardId: 1,
      boardTitle: 'first',
      columns: [{ columnId: 2, columnTitle: 'firstColun' }],
    },
  ];

  addNewBoard() {}
}
