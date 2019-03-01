import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';

import { AuthService } from './services/auth.service';
import { AlertifyService } from './services/alertify.service';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { UserService } from './services/user.service';
import { MemberDetailResolver } from './resolvers/member-detail.resolver';
import { MemberListResolver } from './resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './resolvers/member-edit.resolver';
import { ListsResolver } from './resolvers/list.resolver';
import { MessagesResolver } from './resolvers/messages.resolver';
import { PreventUnsavedChanges } from './guards/prevent-unsaved-changes.guard';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      ListsComponent,
      MessagesComponent,
      MemberCardComponent,
      MemberDetailComponent,
      MemberEditComponent,
      PhotoEditorComponent,
      TimeAgoPipe,
      MemberMessagesComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      ButtonsModule.forRoot(),
      PaginationModule.forRoot(),
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter: tokenGetter,
            whitelistedDomains: ['localhost:10005'],
            blacklistedRoutes: ['localhost:10005/api/auth']
         }
      }),
      NgxGalleryModule,
      BsDatepickerModule.forRoot(),
      FileUploadModule
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      ListsResolver,
      MessagesResolver,
      PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
