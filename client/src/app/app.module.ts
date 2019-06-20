import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContainersComponent } from './containers/containers.component';
import { AppRoutingModule } from './app-routing.module';
import { ContainerComponent } from './containers/container/container.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CreateContainerComponent } from './create-container/create-container.component';
import { AlertComponent } from './alert/alert.component';
import { PullImageComponent } from './pull-image/pull-image.component';
import { ShortenPipe } from './pipes/shorten.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ContainersComponent,
    ContainerComponent,
    SpinnerComponent,
    CreateContainerComponent,
    AlertComponent,
    PullImageComponent,
    ShortenPipe,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
