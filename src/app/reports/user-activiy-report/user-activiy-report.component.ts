import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const pdf = pdfMake;
pdf.vfs = pdfFonts.pdfMake.vfs;

interface UserActivity {
  id: number;
  date: string;
  user_name: string;
  action: string;
  device: string;
}

const ELEMENT_DATA: UserActivity[] = [
  {
    id: 0,
    date: "21/03/2021",
    user_name: "Usuário 1",
    action: "Alteração registro de O.S (id_os: 1)",
    device: "Desktop, Chrome, Windows 10, Curitiba-PR",
  },
  {
    id: 1,
    date: "02/05/2022",
    user_name: "Usuário 2",
    action: "Criação registro de O.S (id_os: 1)",
    device: "Desktop, Safari, MacOS 11, Curitiba-PR",
  },
  {
    id: 2,
    date: "10/07/2022",
    user_name: "Usuário 3",
    action: "Exclusão registro de Luminária (id_lamp: 4)",
    device: "Móvel, Chrome, Android 7, Curitiba-PR",
  },
  {
    id: 3,
    date: "28/09/2022",
    user_name: "Usuário 4",
    action: "Alteração registro de Luminária (id_lamp: 2)",
    device: "Móvel, Safari, IOS 11, Curitiba-PR",
  },
  

];

@Component({
  selector: 'app-user-activiy-report',
  templateUrl: './user-activiy-report.component.html',
  styleUrls: ['./user-activiy-report.component.scss']
})
export class UserActiviyReportComponent implements OnInit {

  displayedColumns: string[] = ["id", "date", "user_name", "action", "device"];
  dataSource = new MatTableDataSource<UserActivity>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  filterValue = "";

  activities: any[] = [];
  downloadDate: any;

  tableName = 'Relatório_Atividades_Usuários-';

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
    const documentDefinition = { content: 'This is an sample PDF test of users activities report' };
    pdfMake.createPdf(documentDefinition).download();
  }

}
