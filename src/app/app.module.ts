import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms"
import { AppComponent } from './app.component';
import { ActaComponent } from './acta/acta.component';
import { RegisterComponent } from './register/register.component';
import { routing } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { ActaListaComponent } from './acta-lista/acta-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    ActaComponent,
    RegisterComponent,
    LoginComponent,
    ActaListaComponent
  ],
  imports: [
    BrowserModule,
    routing,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
