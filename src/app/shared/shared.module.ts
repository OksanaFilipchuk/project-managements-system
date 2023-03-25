import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { FilterByLoginPipe } from './pipes/filter-by-login.pipe';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    ModalComponent,
    ConfirmationComponent,
    FilterByLoginPipe,
    PageNotFoundComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    ReactiveFormsModule,
  ],
  exports: [
    ModalComponent,
    ConfirmationComponent,
    CommonModule,
    NgbModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatListModule,
    MatDividerModule,
    ReactiveFormsModule,
    FilterByLoginPipe,
    PageNotFoundComponent,
  ],
})
export class SharedModule {}
