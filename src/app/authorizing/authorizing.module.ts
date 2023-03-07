import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizingComponent } from './components/authorizing/authorizing.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthorizeService } from './services/authorize.service';
import { ModalServiceService } from '../shared/services/modal-service.service';

@NgModule({
  declarations: [AuthorizingComponent, AuthFormComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [AuthorizingComponent],
  providers: [AuthorizeService, ModalServiceService],
})
export class AuthorizingModule {}
