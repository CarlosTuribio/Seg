import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProcessComponent } from './components/create-process/create-process.component';
import { PhysicalMemoryComponent } from './components/physical-memory/physical-memory.component';

import { HomeComponent } from './pages/home/home.component';
import { SegmentsComponent } from './components/segments/segments.component';
import { ProcessListComponent } from './components/process-list/process-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateProcessComponent,
    PhysicalMemoryComponent,
    HomeComponent,
    SegmentsComponent,
    ProcessListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class HomeModule { }
