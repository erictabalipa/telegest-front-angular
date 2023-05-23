import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const pdf = pdfMake;
pdf.vfs = pdfFonts.pdfMake.vfs;

interface Lamp {
  id: number;
  name: string;
  fabricator: string;
  modelo: string;
  lamp_status: string;
  location: string;
  lamp_state: boolean;
}

const ELEMENT_DATA: Lamp[] = [
  {
    id: 0,
    name: "Teste 1",
    fabricator: "Fabricante 1",
    modelo: "Modelo 1",
    lamp_status: "Instalada",
    location: "CEP1",
    lamp_state: true
  },
  {
    id: 1,
    name: "Teste 2",
    fabricator: "Fabricante 2",
    modelo: "Modelo 2",
    lamp_status: "Disponível",
    location: "CEP2",
    lamp_state: false
  },
  {
    id: 2,
    name: "Teste 3",
    fabricator: "Fabricante 3",
    modelo: "Modelo 3",
    lamp_status: "Instalada",
    location: "CEP3",
    lamp_state: true
  },
  {
    id: 3,
    name: "Teste 4",
    fabricator: "Fabricante 4",
    modelo: "Modelo 4",
    lamp_status: "Disponível",
    location: "CEP4",
    lamp_state: false
  }
];
@Component({
  selector: 'app-lamp-report',
  templateUrl: './lamp-report.component.html',
  styleUrls: ['./lamp-report.component.scss']
})
export class LampReportComponent implements OnInit {

  displayedColumns: string[] = ["id","name", "fabricator", "modelo", "lamp_status", "location", "lamp_state"];
  dataSource = new MatTableDataSource<Lamp>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  filterValue = "";

  lamps: any[] = [];
  downloadDate: any;

  tableName = 'Relatório_Luminárias-';

  today = new Date();
  pipe = new DatePipe('en-US');

  constructor() { }

  clearFilter = () => {
    this.filterValue = "";
    this.dataSource.filter = "";
  };

  doFilter = (event: any) => {
    const value = event.target.value;
    this.filterValue = value;

    if (value) {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    } else {
      this.clearFilter();
    }
  };

  ngOnInit(): void {
    this.dataSource.data = ELEMENT_DATA;
    let DownloadFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.downloadDate = DownloadFormat;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  generatePdf() {
    const documentDefinition = { content: 'This is an sample PDF test of lamps report' };
    pdfMake.createPdf(documentDefinition).download();
  }

}
