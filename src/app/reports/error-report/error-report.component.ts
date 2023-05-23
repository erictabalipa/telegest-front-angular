import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const pdf = pdfMake;
pdf.vfs = pdfFonts.pdfMake.vfs;

interface Error {
  id: number;
  name: string;
  type: string;
  lamp_name: string;
  status: string;
}

const ELEMENT_DATA: Error[] = [
  {
    id: 0,
    name: "Erro 1",
    type: "Comunicação",
    lamp_name: "Luminária 1",
    status: "Corrigido",
  },
  {
    id: 1,
    name: "Erro 2",
    type: "Programação",
    lamp_name: "Luminária 2",
    status: "Pendente",
  },
  {
    id: 2,
    name: "Erro 3",
    type: "Comunicação",
    lamp_name: "Luminária 3",
    status: "Corrigido",
  },
  {
    id: 3,
    name: "Erro 4",
    type: "Programação",
    lamp_name: "Luminária 4",
    status: "Pendente",
  },
  
];

@Component({
  selector: 'app-error-report',
  templateUrl: './error-report.component.html',
  styleUrls: ['./error-report.component.scss']
})
export class ErrorReportComponent implements OnInit {

  displayedColumns: string[] = ["id", "name", "type", "lamp_name", "status"];
  dataSource = new MatTableDataSource<Error>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  filterValue = "";

  errors: any[] = [];
  downloadDate: any;

  tableName = 'Relatório_Erros-';

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
    const documentDefinition = { content: 'This is an sample PDF test of errors report' };
    pdfMake.createPdf(documentDefinition).download();
  }

}
