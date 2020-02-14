import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TwitchVideoOnlyComponent } from './twitch/twitch-video-only/twitch-video-only.component';
import { TwitchVideoChatComponent } from './twitch/twitch-video-chat/twitch-video-chat.component';
import { TeamViewDashboard } from './twitch/twitch-dashboard/team-view-dashboard.component';
import {HttpClientModule} from '@angular/common/http';
import { TournamentDashboardComponent } from './tournament/tournament-dashboard/tournament-dashboard.component';
import { MixerVideoComponent } from './mixer/mixer-video/mixer-video.component';
import { TwitchCustomVideoChatComponent } from './twitch/twitch-custom-video-chat/twitch-custom-video-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TwitchVideoChatComponent,
    TwitchVideoOnlyComponent,
    TeamViewDashboard,
    TournamentDashboardComponent,
    MixerVideoComponent,
    TwitchCustomVideoChatComponent
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
    MatSlideToggleModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
