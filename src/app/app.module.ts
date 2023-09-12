import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { TopsComponent } from './components/tops/tops.component';
import { LastSongComponent } from './components/last-song/last-song.component';
import { RecommendedComponent } from './components/recommended/recommended.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TopsComponent,
    LastSongComponent,
    RecommendedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
