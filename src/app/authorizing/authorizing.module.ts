import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizingComponent } from './components/authorizing/authorizing.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SingUpFormComponent } from './components/sing-up-form/sing-up-form.component';
import { AuthorizeService } from './services/authorize.service';
import { SingInFormComponent } from './components/sing-in-form/sing-in-form.component';

@NgModule({
  declarations: [AuthorizingComponent, SingUpFormComponent, SingInFormComponent],
  imports: [CommonModule, SharedModule, FormsModule, ReactiveFormsModule],
  exports: [AuthorizingComponent],
  providers: [AuthorizeService],
})
export class AuthorizingModule {}
