import { Component, Input, Output } from '@angular/core';
import { Board } from 'src/app/models/models';
import { Router } from '@angular/router';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  @Input() board: Board | null = null;
  // @Output()

  constructor(private router: Router) {}

  goToBoard(event: Event) {
    this.router.navigate(['Board']);
  }

  deleteBoard(event: Event) {}
}
