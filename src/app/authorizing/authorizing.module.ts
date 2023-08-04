import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizingComponent } from './components/authorizing/authorizing.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthorizeService } from './services/authorize.service';
import { ModalServiceService } from '../shared/services/modal-service.service';
import { FilterByLoginPipe } from '../shared/pipes/filter-by-login.pipe';
import { UserFormComponent } from './components/user-form/user-form.component';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [AuthorizingComponent, AuthFormComponent, UserFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [AuthorizingComponent],
  providers: [AuthorizeService, ModalServiceService, FilterByLoginPipe],
})
export class AuthorizingModule {}
