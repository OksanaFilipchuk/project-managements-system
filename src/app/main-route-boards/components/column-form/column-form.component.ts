import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-column-form',
  templateUrl: './column-form.component.html',
  styleUrls: ['./column-form.component.scss'],
})
export class ColumnFormComponent {
  @Input() title: string;
  @Input() submitButton: string;
  @Input() currentTitle?: string;
  constructor(private fb: FormBuilder) {}

  columnForm = this.fb.group({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  getErrorMessage(): any {
    if (this.columnForm.get('title')?.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.columnForm.get('title')?.errors?.['minLength']) {
      return 'The title must be at least 3 characters”';
    }
  }

  @Output() columnFormEvent = new EventEmitter();

  closeModal() {
    this.columnFormEvent.emit('close');
  }

  onSubmit() {
    this.columnFormEvent.emit(this.columnForm.value);
  }
}
