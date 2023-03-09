import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalServiceService } from 'src/app/shared/services/modal-service.service';
import { Board } from '../../models/board.model';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
})
export class BoardFormComponent {
  constructor(
    private formBuilder: FormBuilder,
    private modalService: ModalServiceService
  ) {}
  boardForm: FormGroup<any> = this.formBuilder.nonNullable.group({
    title: '',
    owner: localStorage.getItem('login'),
    users: [],
  });

  @Output() boardEvent = new EventEmitter<FormGroup | 'close'>();

  onSubmit() {
    this.boardEvent.emit(this.boardForm);
  }

  onClick() {
    this.boardEvent.emit('close');
  }
}
