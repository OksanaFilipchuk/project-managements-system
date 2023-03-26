import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UsersService } from 'src/app/shared/services/users.service';
import { Board, NewBoard } from '../../models/board.model';

@Component({
  selector: 'app-board-form',
  templateUrl: './board-form.component.html',
  styleUrls: ['./board-form.component.scss'],
})
export class BoardFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    public userService: UsersService
  ) {}

  title = '';

  owner = localStorage.getItem('login');

  usersSelected: any = [];
  dropdownList: any = [];
  selectedItems: any[] = [];
  dropdownSettings: any;
  ngOnInit() {
    this.dropdownList = this.userService.getUsers();
    this.dropdownSettings = {
      singleSelection: false,
      idField: '_id',
      textField: 'login',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }
  onItemSelect(item: any) {
    this.usersSelected.push(item);
  }
  onItemSelectAll(item: any) {
    this.usersSelected = { ...this.usersSelected, ...this.dropdownList };
  }

  onItemDeSelect(item: any) {
    this.usersSelected = this.usersSelected.filter(
      (el: any) => el.login != item.login
    );
  }
  onItemDeSelectAll(item: any) {
    this.usersSelected = {};
  }

  @Output() newBoardEvent = new EventEmitter<NewBoard | 'close'>();

  onSubmit() {
    if (this.owner && this.title) {
      this.newBoardEvent.emit({
        title: this.title,
        owner: this.owner,
        users: this.usersSelected,
      });
    }
  }

  onClick() {
    this.newBoardEvent.emit('close');
  }
}
