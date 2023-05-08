import { Component } from '@angular/core';
import { PhysicalMemory } from '../../model/physical-memory';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  template: `<app-create-process
      (enviarDados)="setDados($event)"
    ></app-create-process>
    <app-process-list></app-process-list>
    <app-physical-memory></app-physical-memory>    
    `,
})
export class HomeComponent {
  constructor() {}
  ngOnInit(): void {console.log(this.physicalMemory);}

  public physicalMemory: { physicalMemory: Array<PhysicalMemory> } | undefined;

  public list = Array<PhysicalMemory>;

  public setDados(event: { physicalMemory: Array<PhysicalMemory> }) {
    this.physicalMemory = event;
    console.table(this.physicalMemory);
  }
}
