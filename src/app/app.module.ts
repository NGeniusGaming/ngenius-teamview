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
import { TwitchVideoOnlyComponent } from './twitch/twitch-video-only/twitch-video-only.component';
import { TwitchVideoChatComponent } from './twitch/twitch-video-chat/twitch-video-chat.component';
import { TwitchDashboardComponent } from './twitch/twitch-dashboard/twitch-dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { TournamentDashboardComponent } from './tournament/tournament-dashboard/tournament-dashboard.component';
import { MixerVideoComponent } from './mixer/mixer-video/mixer-video.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TwitchVideoChatComponent,
    TwitchVideoOnlyComponent,
    TwitchDashboardComponent,
    TournamentDashboardComponent,
    MixerVideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
