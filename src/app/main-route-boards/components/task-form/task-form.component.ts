import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {
  constructor(private fb: FormBuilder) {}
  @Input() taskFormAction: 'new' | 'edit';
  @Input() task: Task;

  taskForm = this.fb.group({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(25),
    ]),
  });

  getTitleErrorMessage(): any {
    if (this.taskForm.get('title')?.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.taskForm.controls['title'].errors?.['minlength']) {
      return 'The title must be at least 3 characters';
    }
    if (this.taskForm.controls['title'].errors?.['maxlength']) {
      return 'Keep the titles under 20 characters';
    }
  }
  getDescriptionErrorMessage(): any {
    if (this.taskForm.get('description')?.hasError('required')) {
      return 'You must enter a value';
    }
    return 'Keep the description under 25 characters';
  }

  @Output() taskFormEvent = new EventEmitter();

  closeModal() {
    this.taskFormEvent.emit('close');
  }

  onSubmit() {
    this.taskFormEvent.emit(this.taskForm.value);
  }
}
