import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { TableModule } from 'primeng/table';
import { AppComponent } from './app.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [AppComponent, ContactFormComponent, ContactListComponent],
  imports: [BrowserModule, ReactiveFormsModule, AppRoutingModule,TableModule,FormsModule,BrowserAnimationsModule,
    ToastrModule.forRoot({timeOut: 3000,positionClass: 'toast-bottom-right',preventDuplicates: true})],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
