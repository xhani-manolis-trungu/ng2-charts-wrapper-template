import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { ChartWrapperComponent } from './chart-wrapper.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ChartsModule],
  exports: [ChartWrapperComponent],
  declarations: [ChartWrapperComponent],
  bootstrap: [ChartWrapperComponent]
})
export class ChartWrapperModule {}
