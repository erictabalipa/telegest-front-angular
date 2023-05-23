import { DatePipe } from '@angular/common';
import { OnInit, Component, ViewChild, Inject } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

const pdf = pdfMake;
pdf.vfs = pdfFonts.pdfMake.vfs;

declare var documentDefinition: any;

export interface ServiceOrderData {
  id: number;
  cod: string;
  responsible: string;
  priority: string;
  status: string;
  maxDate: string;
  conclusionDate: string;
}

export interface DialogData {
  os_cod: string;
}

const ELEMENT_DATA: ServiceOrderData[] = [
  {
    id: 0,
    cod: '01',
    responsible: 'Tecnico X',
    priority: 'OS 01',
    status: 'Aberta',
    maxDate: '10/09/2022',
    conclusionDate: '12/10/2022'
  },
  {
    id:1,
    cod: '02',
    responsible: 'Tecnico Y',
    priority: 'OS 02',
    status: 'Concluída',
    maxDate: '12/10/2022',
    conclusionDate: '----------'
  }
]



@Component({
  selector: 'app-service-order',
  templateUrl: './service-order.component.html',
  styleUrls: ['./service-order.component.scss']
})
export class ServiceOrderComponent implements OnInit {
  displayedColumns: string[] = ['cod', 'responsible', 'priority', 'maxDate', 'status', 'conclusionDate', 'actions'];
  dataSource = new MatTableDataSource<ServiceOrderData>();

  @ViewChild(MatSort)
    
    
  sort: MatSort = new MatSort();
  filterValue = '';

  tableName = 'Ordens_de_serviço-';
  downloadDate: any;
  today = new Date();
  pipe = new DatePipe('en-US');

  os_cod: string | undefined;
  

  constructor(public dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.os_cod = result;
    });
  }

  clearFilter = () => {
    this.filterValue = '';
    this.dataSource.filter = '';
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

  redirectToItem(itemId: number) {
    alert('redirect');
  }

  ngOnInit(): void {
    this.dataSource.data = ELEMENT_DATA;
    let DownloadFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.downloadDate = DownloadFormat;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  generatePdf(empIndex: number) {
    let docPDF = new documentDefinition(ELEMENT_DATA[empIndex]);
    pdfMake.createPdf(docPDF).open();
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}



