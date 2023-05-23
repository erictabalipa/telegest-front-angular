import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

interface User {
  id: number;
  name: string;
  email: string;
  permission: string;
}

const ELEMENT_DATA: User[] = [
  {
    id: 0,
    name: 'Arroz',
    email: 'arroz@telegestao.com',
    permission: 'Admin'
  },
  {
    id: 1,
    name: 'Feijao',
    email: 'feijao@telegestao.com',
    permission: 'Operador'
  },
  {
    id: 2,
    name: 'Salada',
    email: 'salada@telegestao.com',
    permission: 'Tecnico'
  },
  {
    id: 3,
    name: 'Macarrao',
    email: 'macarrao@telegestao.com',
    permission: 'Tecnico'
  }
]

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'permission',
    'email'
  ];

  dataSource = new MatTableDataSource<User>();

  @ViewChild(MatSort)
    
  sort: MatSort = new MatSort();
  filterValue = '';
  
  tableName = 'Usuários-';
  downloadDate: any;
  today = new Date();
  pipe = new DatePipe('en-US');
  
  
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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
