import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PhysicalMemory } from '../../model/physical-memory';

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.scss'],
})
export class CreateProcessComponent implements OnInit {
  @Output() public emmitProcess = new EventEmitter();
  public processes: Array<{ id: number; name: string }> = [];
  public countProcess: number = 0;

  public colors: string[][] = [
    ["", "#E6B0AA", "#D98880", "#CD6155"],
    ["", "#D7BDE2", "#AF7AC5", "#76448A"],
    ["", "#A9CCE3", "#5499C7", "#1A5276"],
    ["", "#A3E4D7", "#48C9B0", "#1E8449"],
    ["", "#ABEBC6", "#58D68D", "#239B56"],
    ["", "#F9E79F", "#F4D03F", "#B7950B"],
    ["", "#F5CBA7", "#EB984E", "#AF601A"],
    ["", "#EDBB99", "#DC7633", "#784212"],
    ["", "#D2B4DE", "#BB8FCE", "#6A5ACD"],
    ["", "#A9DFBF", "#27AE60", "#1E8449"]
  ];
  
  public processName: string = '';
  public codeNumber: number = 0;
  public dataNumber: number = 0;
  public stackNumber: number = 0;

  public NumberTemp1: number = 0;
  public NumberTemp2: number = 0;
  public NumberTemp3: number = 0;

  public tableMemoryTemp: any = [
    ['00000', '', ''],
    ['00001', '', ''],
    ['00010', '', ''],
    ['00011', '', ''],
    ['00100', '', ''],
    ['00101', '', ''],
    ['00110', '', ''],
    ['00111', '', ''],
    ['01000', '', ''],
    ['01001', '', ''],
    ['01010', '', ''],
    ['01011', '', ''],
    ['01100', '', ''],
    ['01101', '', ''],
    ['01110', '', ''],
    ['01111', '', ''],
    ['10000', '', ''],
    ['10001', '', ''],
    ['10010', '', ''],
    ['10011', '', ''],
    ['10100', '', ''],
    ['10101', '', ''],
    ['10110', '', ''],
    ['10111', '', ''],
    ['11000', '', ''],
    ['11001', '', ''],
    ['11010', '', ''],
    ['11011', '', ''],
    ['11100', '', ''],
    ['11101', '', ''],
    ['11110', '', ''],
    ['11111', '', ''],
  ];

  public tabelaLacunas: any = [[0, 31, 32]];
  //public tabelaLacunas: any = [[6, 11, 6], [18, 31, 14]];

  public tableMemory: any = [
    ['00000', '', ''],
    ['00001', '', ''],
    ['00010', '', ''],
    ['00011', '', ''],
    ['00100', '', ''],
    ['00101', '', ''],
    ['00110', '', ''],
    ['00111', '', ''],
    ['01000', '', ''],
    ['01001', '', ''],
    ['01010', '', ''],
    ['01011', '', ''],
    ['01100', '', ''],
    ['01101', '', ''],
    ['01110', '', ''],
    ['01111', '', ''],
    ['10000', '', ''],
    ['10001', '', ''],
    ['10010', '', ''],
    ['10011', '', ''],
    ['10100', '', ''],
    ['10101', '', ''],
    ['10110', '', ''],
    ['10111', '', ''],
    ['11000', '', ''],
    ['11001', '', ''],
    ['11010', '', ''],
    ['11011', '', ''],
    ['11100', '', ''],
    ['11101', '', ''],
    ['11110', '', ''],
    ['11111', '', ''],
  ];

  public fillLacunaTemp(tabelaLacunasTemp: any, lacunaPosi: any, fill: number) {
    if (tabelaLacunasTemp[lacunaPosi][2] === fill) {
      tabelaLacunasTemp.splice(lacunaPosi, 1);
    } else {
      tabelaLacunasTemp[lacunaPosi][0] =
        tabelaLacunasTemp[lacunaPosi][0] + fill;
      tabelaLacunasTemp[lacunaPosi][2] =
        tabelaLacunasTemp[lacunaPosi][1] - tabelaLacunasTemp[lacunaPosi][0] + 1;
    }
    tabelaLacunasTemp.sort((a: any, b: any) => a[2] - b[2]);
    return tabelaLacunasTemp;
  }

  public insertMemoryTemp(
    key: string,
    fill: number,
    initialPosition: number
  ): void {
    for (let i = 0; i < fill; i++) {
      this.tableMemoryTemp[initialPosition + i][1] = key + (i + 1);
    }
  }

  public async inserirSegmentosTemp() {
    let count = 0;
    let tabelaLacunasTemp: any[][] = [];
    let temp = [];
    for (let i in this.tabelaLacunas) {
      for (let j in this.tabelaLacunas[i]) {
        temp.push(this.tabelaLacunas[i][j]);
      }
      tabelaLacunasTemp.push(temp);
      temp = [];
    }

    for (let i in tabelaLacunasTemp) {
      if (this.NumberTemp1 <= tabelaLacunasTemp[i][2]) {
        let initialPosition = tabelaLacunasTemp[i][0];
        this.insertMemoryTemp('x', this.NumberTemp1, initialPosition);
        tabelaLacunasTemp = this.fillLacunaTemp(
          tabelaLacunasTemp,
          i,
          this.NumberTemp1
        );
        count++;
      }
      if (count > 0) {
        break;
      }
    }
    if (count === 0) {
      return count;
    }
    for (let i in tabelaLacunasTemp) {
      if (this.NumberTemp2 <= tabelaLacunasTemp[i][2]) {
        let initialPosition = tabelaLacunasTemp[i][0];
        this.insertMemoryTemp('x', this.NumberTemp2, initialPosition);
        tabelaLacunasTemp = this.fillLacunaTemp(
          tabelaLacunasTemp,
          i,
          this.NumberTemp2
        );
        count++;
      }
      if (count > 1) {
        break;
      }
    }
    if (count === 1 || count === 0) {
      return count;
    }
    for (let i in tabelaLacunasTemp) {
      if (this.NumberTemp3 <= tabelaLacunasTemp[i][2]) {
        let initialPosition = tabelaLacunasTemp[i][0];
        this.insertMemoryTemp('x', this.NumberTemp3, initialPosition);
        tabelaLacunasTemp = this.fillLacunaTemp(
          tabelaLacunasTemp,
          i,
          this.NumberTemp3
        );
        count++;
      }
      if (count > 2) {
        break;
      }
    }
    this.tableMemoryTemp = [];
    tabelaLacunasTemp = [];
    return count;
  }

  public show() {
    console.log('Segments: ');
    console.log(
      this.processName,
      this.codeNumber,
      this.dataNumber,
      this.stackNumber
    );

    console.log('tabelaLacunas: ');
    for (let i in this.tabelaLacunas) {
      console.log(this.tabelaLacunas[i]);
    }
    console.log('tableMemory: ');
    console.log(this.tableMemory);
  }

  public orderSegments() {
    let seg = [];
    if (this.NumberTemp1 === this.codeNumber) {
      seg.push('C');
      if (this.NumberTemp2 === this.dataNumber) {
        seg.push('D');
        seg.push('P');
      } else {
        seg.push('P');
        seg.push('D');
      }
    } else if (this.NumberTemp1 === this.dataNumber) {
      seg.push('D');
      if (this.NumberTemp2 === this.codeNumber) {
        seg.push('C');
        seg.push('P');
      } else {
        seg.push('P');
        seg.push('C');
      }
    } else {
      seg.push('P');
      if (this.NumberTemp2 === this.codeNumber) {
        seg.push('C');
        seg.push('D');
      } else {
        seg.push('D');
        seg.push('C');
      }
    }
    return seg;
  }

  public inserirSegmentos(processName: string) {
    let count = 0;
    let seg = this.orderSegments();
    for (let i in this.tabelaLacunas) {
      if (this.NumberTemp1 <= this.tabelaLacunas[i][2]) {
        let initialPosition = this.tabelaLacunas[i][0];
        this.insertMemory(
          processName,
          seg[0],
          this.NumberTemp1,
          initialPosition
        );
        this.fillLacuna(i, this.NumberTemp1);
        this.reorder();
        count++;
      }
      if (count > 0) {
        break;
      }
    }
    for (let i in this.tabelaLacunas) {
      if (this.NumberTemp2 <= this.tabelaLacunas[i][2]) {
        let initialPosition = this.tabelaLacunas[i][0];
        this.insertMemory(
          processName,
          seg[1],
          this.NumberTemp2,
          initialPosition
        );
        this.fillLacuna(i, this.NumberTemp2);
        this.reorder();
        count++;
      }
      if (count > 1) {
        break;
      }
    }
    for (let i in this.tabelaLacunas) {
      if (this.NumberTemp3 <= this.tabelaLacunas[i][2]) {
        let initialPosition = this.tabelaLacunas[i][0];
        this.insertMemory(
          processName,
          seg[2],
          this.NumberTemp3,
          initialPosition
        );
        this.fillLacuna(i, this.NumberTemp3);
        this.reorder();
        count++;
      }
      if (count > 2) {
        break;
      }
    }
    count = 0;
  }

  public fillLacuna(lacunaPosi: any, fill: number) {
    if (this.tabelaLacunas[lacunaPosi][2] === fill) {
      this.tabelaLacunas.splice(lacunaPosi, 1);
    } else {
      this.tabelaLacunas[lacunaPosi][0] =
        this.tabelaLacunas[lacunaPosi][0] + fill;
      this.tabelaLacunas[lacunaPosi][2] =
        this.tabelaLacunas[lacunaPosi][1] -
        this.tabelaLacunas[lacunaPosi][0] +
        1;
    }
    this.tabelaLacunas.sort((a: any, b: any) => a[2] - b[2]);
  }

  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public insertMemory(
    processName: string,
    key: string,
    fill: number,
    initialPosition: number
  ) {
    for (let i = 0; i < fill; i++) {
      this.tableMemory[initialPosition + i][1] = key + (i + 1);
      this.tableMemory[initialPosition + i][2] = processName + key;
    }
  }

  public sync() {
    this.tableMemoryTemp = [];
    let temp = [];
    for (let i in this.tableMemory) {
      for (let j in this.tableMemory[i]) {
        temp.push(this.tableMemory[i][j]);
      }
      this.tableMemoryTemp.push(temp);
      temp = [];
    }
    console.log(this.tableMemoryTemp, 'fim');
  }

  public reorder() {
    this.tabelaLacunas.sort((a: any, b: any) => a[2] - b[2]);
  }

  public async criar(processName: string) {
    this.reorder();
    const sortedNumbers = [
      this.codeNumber,
      this.dataNumber,
      this.stackNumber,
    ].sort((a, b) => a - b);

    this.NumberTemp1 = sortedNumbers[0];
    this.NumberTemp2 = sortedNumbers[1];
    this.NumberTemp3 = sortedNumbers[2];

    if ((await this.inserirSegmentosTemp()) === 3) {
      this.inserirSegmentos(processName);
      this.sync();
      return true;
    } else {
      return false;
    }
  }

  public remover(name: string) {
    let lacuna = [];
    for (let i in this.tableMemory) {
      if (this.tableMemory[i][2][0] === name) {
        this.tableMemory[i][1] = '';
        this.tableMemory[i][2] = '';
        lacuna.push(i);
      }
    }
    this.createLacuna(lacuna);
  }

  public createLacuna(lacuna: any) {
    this.tabelaLacunas.push([
      Number(lacuna[0]),
      Number(lacuna[lacuna.length - 1]),
      Number(lacuna[lacuna.length - 1]) - Number(lacuna[0]) + 1,
    ]);
    this.reorder();

    for (let i in this.tabelaLacunas) {
      let prox = Number(i) + 1;
      if (prox < this.tabelaLacunas.length) {
        if (
          Number(this.tabelaLacunas[i][1]) + 1 ===
          this.tabelaLacunas[prox][0]
        ) {
          this.tabelaLacunas[i][1] = this.tabelaLacunas[prox][1];
          this.tabelaLacunas[i][2] =
            this.tabelaLacunas[i][1] - this.tabelaLacunas[i][0] + 1;
          this.tabelaLacunas.splice(prox, 1);
        }
      }
    }
    this.reorder();
    this.sync();
  }

  @Output() public enviarDados = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  public async submitProcess() {
    this.sync();
    this.processName = this.processName.toUpperCase();
    const exists = this.processes.some(
      (process) => process.name === this.processName
    );
    if (!exists) {
      let retorno = this.criar(this.processName);
      console.log('testado');
      this.sync();
      if (await retorno) {
        this.processes.push({ id: this.countProcess, name: this.processName });
        this.countProcess++;
        console.log('Adicionado com sucesso!');
      } else {
        console.log('Memóra cheia!!');
      }
    } else {
      console.log('Já existe um processo com esse nome!!');
    }
  }

  public removeProcess(index: number) {
    console.log(
      this.processName,
      this.codeNumber,
      this.dataNumber,
      this.stackNumber
    );

    this.remover(this.processes[index].name);
    this.processes.splice(index, 1);
  }
}
