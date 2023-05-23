import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const pdf = pdfMake;
pdf.vfs = pdfFonts.pdfMake.vfs;

interface ServiceOrderData {
  id: number;
  code: string;
  responsible: string;
  type: string;
  description: string;
  status: string;
  created_at: string;
  conclusion_date: string;
  updated_at: string;
  deleted: boolean;
}

const ELEMENT_DATA: ServiceOrderData[] = [
  {
    id: 0,
    code: "Código 1",
    responsible: "Usuário 1",
    type: "Instalação 1",
    description: "Descrição da ordem de serviço",
    status: "Em aberto",
    created_at: "12/08/2022",
    conclusion_date: "08/09/2022",
    updated_at: "01/09/2022",
    deleted: true
  },
  {
    id: 1,
    code: "Código 2",
    responsible: "Usuário 2",
    type: "Instalação 2",
    description: "Descrição da ordem de serviço",
    status: "Em execução",
    created_at: "12/08/2022",
    conclusion_date: "08/09/2022",
    updated_at: "01/09/2022",
    deleted: true
  },
  {
    id: 2,
    code: "Código 3",
    responsible: "Usuário 3",
    type: "Instalação 3",
    description: "Descrição da ordem de serviço",
    status: "Cancelada",
    created_at: "12/08/2022",
    conclusion_date: "08/09/2022",
    updated_at: "01/09/2022",
    deleted: false
  },
  {
    id: 3,
    code: "Código 4",
    responsible: "Usuário 4",
    type: "Instalação 4",
    description: "Descrição da ordem de serviço",
    status: "Concluída",
    created_at: "12/08/2022",
    conclusion_date: "08/09/2022",
    updated_at: "01/09/2022",
    deleted: false
  }
];
@Component({
  selector: 'app-service-order-report',
  templateUrl: './service-order-report.component.html',
  styleUrls: ['./service-order-report.component.scss']
})
export class ServiceOrderReportComponent implements OnInit {

  displayedColumns: string[] = ["id", "code", "responsible", "type", "description", "status", "created_at", "conclusion_date", "updated_at", "deleted"];
  dataSource = new MatTableDataSource<ServiceOrderData>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  filterValue = "";

  lamps: any[] = [];
  downloadDate: any;

  tableName = 'Relatório_Ordens_Serviço-';

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
    const documentDefinition = { content: 'This is an sample PDF test of service orders report' };
    pdfMake.createPdf(documentDefinition).download();
  }

}
