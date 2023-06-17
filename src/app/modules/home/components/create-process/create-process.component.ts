import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-process',
  templateUrl: './create-process.component.html',
  styleUrls: ['./create-process.component.scss', '/custom.css',],
})
export class CreateProcessComponent implements OnInit {
  
  @Output() public enviarDados = new EventEmitter();

  constructor() {}
  ngOnInit(): void {}

  public processes: Array<{
    id: number;
    name: string;
    data: Array<Array<any>>;
  }> = [];
  public countProcess: number = 0;

  public processName: string = '';
  public codeNumber: number = NaN;
  public dataNumber: number = NaN;
  public stackNumber: number = NaN;
  public checkboxChecked: boolean = false;

  public NumberTemp1: number = 0;
  public NumberTemp2: number = 0;
  public NumberTemp3: number = 0;

  
  public popTitle: string = '';
  public popMessage: string = '';

  public tabelaLacunas: any = [[0, 31, 32]];


  public colors: any = [
    ['', '#5CAAD6', '#0780A7', '#035473'],
    ['', '#AFA4B1', '#785964', '#4D394E'],
    ['', '#E99D9F', '#bf565c', '#8E3A40'],
    ['', '#77AFA5', '#4B706A', '#224B45'],
    ['', '#EDBB99', '#DC7633', '#784212'],
    ['', '#D2B4DE', '#BB8FCE', '#6A5ACD'],
    ['', '#D8C0A9', '#B2927C', '#7E6754'],
    ['', '#D3D3D3', '#A9A9A9', '#808080'],
  ];

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

  public async submitProcess() {
    this.sync();
    this.processName = this.processName.toUpperCase();
    let exists = this.processes.some(
      (process) => process.name === this.processName
    );
    this.validInput();
    if (!exists && this.validInput()) {
      let retorno = this.criar(this.processName);
      this.sync();
      if (await retorno) {
        this.processes.push({
          id: this.countProcess,
          name: this.processName,
          data: this.tables(),
        });
        this.countProcess++;
        this.resetFields();
      } else {
        this.showPopup(1);
      }
    } else {
      if (exists) {
        this.showPopup(2);
      } else {
        this.showPopup(3);
      }
    }
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
  
  public insertMemoryTemp(
    key: string,
    fill: number,
    initialPosition: number
  ): void {
    for (let i = 0; i < fill; i++) {
      this.tableMemoryTemp[initialPosition + i][1] = key + (i + 1);
    }
  }

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

    console.log('Processos: ');
    console.log(this.processes);

    console.log('Colors: ');
    console.log(this.colors);

    console.log('checkbox: ');
    console.log(this.checkboxChecked);
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

  public closePopup() {
    let element = document.getElementById('popup');
    if (element) {
      element.style.display = 'none';
    }
  }

  public showProcess(processName: string) {
    let element = document.getElementById('contain-' + processName);
    for (let i in this.processes) {
      let z = document.getElementById('contain-' + this.processes[i].name);
      if (z) {
        z.style.display = 'none';
      }
    }
    if (element) {
      element.style.display = 'flex';
    }

    for (let i in this.processes) {
      let button = document.getElementById('btn-lat-' + this.processes[i].name);
      if (button && button.classList.contains('open-process')) {
        button.classList.remove('open-process');
      }
    }
    let btn = document.getElementById('btn-lat-' + processName);
    if (btn) {
      btn.classList.add('open-process');
    }

    for (let i in this.processes) {
      let button = document.getElementById('btn-top-' + this.processes[i].name);
      if (button && button.classList.contains('open-process')) {
        button.classList.remove('open-process');
      }
    }

    let btn2 = document.getElementById('btn-top-' + processName);
    if (btn2) {
      btn2.classList.add('open-process');
    }
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
  }

  public reorder() {
    this.tabelaLacunas.sort((a: any, b: any) => a[2] - b[2]);
  }

  public decimalToBinary(decimal: number): string {
    let binary = '';

    while (decimal > 0) {
      binary = (decimal % 2) + binary;
      decimal = Math.floor(decimal / 2);
    }

    while (binary.length < 5) {
      binary = '0' + binary;
    }

    return binary;
  }

  public getAdress(segCode: String) {
    for (let i in this.tableMemory) {
      if (this.tableMemory[i][2] === segCode) {
        return this.tableMemory[i][0];
      }
    }
  }

  public removeColor(processName: String) {
    for (let i in this.colors) {
      if (this.colors[i][0] === processName) {
        this.colors[i][0] = '';
        break;
      }
    }
  }

  public setColor(processName: String) {
    for (let i in this.colors) {
      if (this.colors[i][0] === '') {
        this.colors[i][0] = processName;
        break;
      }
    }
  }

  public whatColor(code: String) {
    for (let i in this.colors) {
      if (this.colors[i][0] === code[0]) {
        if (code[1] === 'C') {
          return this.colors[i][3];
        }
        if (code[1] === 'D') {
          return this.colors[i][2];
        }
        if (code[1] === 'P') {
          return this.colors[i][1];
        }
      }
    }
  }

  public randonChar(): string {
    let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let indice = Math.floor(Math.random() * letras.length);

    for (let i in this.processes) {
      if (letras.charAt(indice) === this.processes[i].name) {
        return this.randonChar();
      }
    }
    return letras.charAt(indice);
  }

  public tornarInputSomenteLeitura(): void {
    let inputElement = document.getElementById('processo') as HTMLInputElement;
    if (inputElement) {
      inputElement.readOnly = true;
    }
    inputElement = document.getElementById('codigo') as HTMLInputElement;
    if (inputElement) {
      inputElement.readOnly = true;
    }
    inputElement = document.getElementById('dado') as HTMLInputElement;
    if (inputElement) {
      inputElement.readOnly = true;
    }
    inputElement = document.getElementById('pilha') as HTMLInputElement;
    if (inputElement) {
      inputElement.readOnly = true;
    }
  }

  public liberarEdicao(): void {
    let inputElement = document.getElementById('processo') as HTMLInputElement;
    if (inputElement) {
      inputElement.readOnly = false;
    }
    inputElement = document.getElementById('codigo') as HTMLInputElement;
    if (inputElement) {
      inputElement.readOnly = false;
    }
    inputElement = document.getElementById('dado') as HTMLInputElement;
    if (inputElement) {
      inputElement.readOnly = false;
    }
    inputElement = document.getElementById('pilha') as HTMLInputElement;
    if (inputElement) {
      inputElement.readOnly = false;
    }
  }

  public resetFields() {
    this.checkboxChecked = false;
    this.processName = '';
    this.codeNumber = NaN;
    this.dataNumber = NaN;
    this.stackNumber = NaN;
    this.liberarEdicao();
  }

  randonNumbers() {
    if (this.checkboxChecked) {
      this.processName = this.randonChar();
      this.codeNumber = Math.floor(Math.random() * 4) + 1;
      this.dataNumber = Math.floor(Math.random() * 4) + 1;
      this.stackNumber = Math.floor(Math.random() * 4) + 1;
      this.tornarInputSomenteLeitura();
    } else {
      this.resetFields();
    }
  }

  public tables() {
    this.setColor(this.processName);
    let data = [];
    let temprray = [];
    let temp = [];

    temprray.push('00');
    temprray.push(this.getAdress(this.processName + 'C'));
    temprray.push(this.decimalToBinary(this.codeNumber));
    temp.push(temprray);
    temprray = [];
    temprray.push('00');
    temprray.push(this.getAdress(this.processName + 'D'));
    temprray.push(this.decimalToBinary(this.codeNumber));
    temp.push(temprray);
    temprray = [];
    temprray.push('00');
    temprray.push(this.getAdress(this.processName + 'P'));
    temprray.push(this.decimalToBinary(this.codeNumber));
    temp.push(temprray);
    data.push(temp);
    temprray = [];

    for (let i = 0; i < this.codeNumber; i++) {
      temprray.push([this.decimalToBinary(i), 'C' + (i + 1)]);
    }
    data.push(temprray);
    temprray = [];
    for (let i = 0; i < this.dataNumber; i++) {
      temprray.push([this.decimalToBinary(i), 'D' + (i + 1)]);
    }
    data.push(temprray);
    temprray = [];
    for (let i = 0; i < this.stackNumber; i++) {
      temprray.push([this.decimalToBinary(i), 'P' + (i + 1)]);
    }
    data.push(temprray);
    return data;
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
    this.updateLacuna();
    this.removeColor(name);
  }

  public updateLacuna() {
    this.tabelaLacunas = [[]];
    let tabelaLacunas: number[][] = [];
    let tempLacuna = [];
    let lacunaIni: number[] = [];
    let lacunaFim: number[] = [];
    let flag1 = 0;
    let flag2 = 1;

    for (let i in this.tableMemory) {
      if (this.tableMemory[i]['1'] === '' && flag1 === 0) {
        lacunaIni.push(Number(i));
        flag1 = 1;
        flag2 = 0;
      }
      if (this.tableMemory[i]['1'] !== '' && flag2 === 0) {
        lacunaFim.push(Number(i));
        flag1 = 0;
        flag2 = 1;
      }
    }

    for (let i in lacunaIni) {
      tempLacuna.push(lacunaIni[i]);
      if (lacunaFim[i]) {
        tempLacuna.push(lacunaFim[i] - 1);
      } else {
        tempLacuna.push(31);
      }
      tempLacuna.push(tempLacuna[1] - tempLacuna[0] + 1);
      tabelaLacunas.push(tempLacuna);
      tempLacuna = [];
    }

    this.tabelaLacunas = tabelaLacunas;

    this.reorder();
    this.sync();
  }

  public validInput() {
    if (
      this.processName !== '' &&
      this.codeNumber > 0 &&
      this.dataNumber > 0 &&
      this.stackNumber > 0
    ) {
      return true;
    } else return false;
  }

  public showPopup(cod: number) {
    switch (cod) {
      case 1:
        this.popTitle = 'Memória cheia!!';
        this.popMessage = 'Não existe espaço suficente para a criação do processo.';
        break;
      case 2:
        this.popTitle = 'Já existe um processo com esse nome!!';
        this.popMessage = 'O processo '+ this.processName +' já foi criado.';
        break;
      case 3:
        this.popTitle = 'Preencha todos os campos!!';
        this.popMessage = 'Os campos Processo, Código, Dados e Pilha, são obrigatórios.';
        break;
      case 4:
        this.popTitle = 'Gerenciamento de Memória com Segmentação';
        this.popMessage = 'O gerenciamento de memória de thread é uma técnica usada por sistemas operacionais para organizar e alocar memória com mais eficiência. Esse método divide o espaço de endereço em segmentos lógicos, cada um correspondendo a uma parte lógica ou funcional do programa ou processo. Cada segmento tem um tamanho e um endereço base. Quando um programa é executado, seus segmentos são alocados em regiões de memória física conforme necessário. Isso permite um mapeamento mais flexível e modular, pois cada segmento pode ser tratado de forma independente, facilitando o compartilhamento de dados e protegendo a memória entre os processos.';
        break;
      case 5:
        this.popTitle = 'Memória Lógica';
        this.popMessage = 'A memória lógica refere-se a uma visão abstrata e virtual da memória que cada processo possui. Cada processo possui sua própria memória lógica dividida em segmentos ou partes lógicas como código, dados e pilha. Esses segmentos são identificados por endereços lógicos ou virtuais usados ​​por processos para acessar e manipular dados armazenados na memória. Com a memória lógica, um processo pode ter a ilusão de ter uma memória consistente e exclusiva, independentemente de como sua memória física está organizada. Durante a execução do programa, o sistema operacional é responsável por traduzir endereços lógicos em endereços físicos correspondentes, usando técnicas como tabelas de páginas e tabelas de segmentos, para que os processos possam alocar e acessar os recursos de memória corretamente. ';
        break;
      case 6:
        this.popTitle = 'Tabela de Segmentos';
        this.popMessage = 'Uma tabela de segmentos é uma estrutura de dados usada no gerenciamento de memória segmentada. Sua finalidade é rastrear os segmentos do processo que existem na memória e registrar informações como endereço base, tamanho e status de cada segmento. Por meio dessa tabela, o sistema operacional pode realizar consultas, operações de alocação e desalocação de segmentos, além de garantir a integridade e o uso correto da memória. A tabela de segmentos é importante para que o sistema operacional mapeie e acesse os segmentos do processo com eficiência e forneça um ambiente de execução seguro e organizado. Isso dá ao processador acesso direto e rápido a dados e instruções.';
        break;
      case 7:
        this.popTitle = 'Memória Física';
        this.popMessage = 'A memória física é a parte real da memória do sistema na qual os threads do processo são armazenados. Isso dá ao processador acesso direto e rápido a dados e instruções. A alocação eficiente de segmentos na memória física requer garantir que não haja sobreposição entre os segmentos e otimizar a configuração para minimizar a fragmentação. Isso permite que os processos acessem segmentos de memória de forma rápida e contínua, contribuindo para um desempenho eficiente do sistema. ';
        break;
    }
    let element = document.getElementById('popup');
    if (element) {
      element.style.display = 'block';
    }
  }

  public removeProcess(index: number) {
    this.remover(this.processes[index].name);
    this.processes.splice(index, 1);
  }
}
