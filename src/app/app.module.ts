import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';

import { CoincapService } from './services/coincap.service'
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CoinsComponent } from './components/coins/coins.component';
import { CoinComponent } from './components/coin/coin.component';
import { CurrencyShortnerPipe } from './pipes/currency-shortner.pipe';

const config: SocketIoConfig = { url: 'http://socket.coincap.io', options: {} };
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'coin/:id', component: CoinComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CoinsComponent,
    CoinComponent,
    CurrencyShortnerPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatTableModule,
    MatSlideToggleModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CoincapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
