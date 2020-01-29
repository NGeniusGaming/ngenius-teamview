import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {MatButtonModule,
   MatCardModule,
   MatGridListModule,
   MatIconModule,
   MatToolbarModule,
   MatTooltipModule,
   MatSlideToggleModule} from '@angular/material';
import { LiveVideoComponent } from './twitch/live-video/live-video.component';
import { TwitchDashboardComponent } from './twitch/twitch-dashboard/twitch-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LiveVideoComponent,
    TwitchDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatCardModule,
    MatGridListModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
