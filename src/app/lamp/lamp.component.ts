import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ApiService } from "../api.service";

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
    lamp_state:true
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
  selector: "app-lamp",
  templateUrl: "./lamp.component.html",
  styleUrls: ["./lamp.component.scss"],
})
export class LampComponent implements OnInit {
  displayedColumns: string[] = ["name", "fabricator", "modelo", "lamp_status", "location", "lamp_state"];
  dataSource = new MatTableDataSource<Lamp>();

  @ViewChild(MatSort)
  sort: MatSort = new MatSort();

  filterValue = "";

  lamps: any[] = [];
  downloadDate: any;

  today = new Date();
  pipe = new DatePipe('en-US');
  

  constructor(private apiService: ApiService) { }

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
    // this.apiService.getLamps().subscribe((response: any) => {
    //   console.log(response);

    //   const lampsToSend = response.map((lamp: any) => {
    //     console.log(lamp.location);
    //     return {
    //       id: lamp._id,
    //       name: lamp.name,
    //       location: `${lamp.location.district}`,
    //       modelo: lamp.model.fabricator,
    //     };
    //   });

    //   console.log(lampsToSend);
     
    // });
    this.dataSource.data = ELEMENT_DATA;
    let DownloadFormat = this.pipe.transform(this.today, 'dd/MM/YYYY');
    this.downloadDate = DownloadFormat;
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
