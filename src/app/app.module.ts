import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ChartWrapperModule } from '../chart-wrapper/chart-wrapper.module';

@NgModule({
  imports: [BrowserModule, FormsModule, ChartsModule, ChartWrapperModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
