import { Component, OnInit } from '@angular/core';
import { ChartType } from "angular-google-charts";
import * as L from 'leaflet';
import { circle, latLng, marker, polygon, tileLayer } from 'leaflet';
import "leaflet.markercluster";



const dataset = [{
  "id": "NA",
  "value": ".82",
  "showLabel": "1"
}, {
  "id": "SA",
  "value": "2.04",
  "showLabel": "1"
}, {
  "id": "AS",
  "value": "1.78",
  "showLabel": "1"
}, {
  "id": "EU",
  "value": ".40",
  "showLabel": "1"
}, {
  "id": "AF",
  "value": "2.58",
  "showLabel": "1"
}, {
  "id": "AU",
  "value": "1.30",
  "showLabel": "1"
}];

const colorrange = {
  "minvalue": "0",
  "code": "#FFE0B2",
  "gradient": "1",
  "color":
    [{
      "minvalue": "0.5",
      "maxvalue": "1.0",
      "color": "#FFD74D"
    }, {
      "minvalue": "1.0",
      "maxvalue": "2.0",
      "color": "#FB8C00"
    }, {
      "minvalue": "2.0",
      "maxvalue": "3.0",
      "color": "#E65100"
    }]
};

const dataSource = {
  chart: {
    "caption": "PROCESSOS DE EXPORTAÇÃO",
    "subCaption": "PAÍS DE DESTINO",
    "showlegend": "0",
    "showMarkerLabels": "1",
    "nullentityfillcolor": "#004A9F",
    "theme": "fusion",
    "showLabel": "0",
  },
  "markers": {
    "shapes": [{
      "id": "myCustomShape",
      "type": "image",
      "url": "../../assets/images/icons/ts-map-pin.png",
      "xscale": "25",
      "yscale": "25",
      "labelPadding": "10"
    }],
    "items": [
      {
        "id": 1,
        "shapeid": "myCustomShape",
        "x": 547.14,
        "y": 484.9,
        "label": "Washington",
        "labelpos": "bottom",
        "country": "ESTADOS UNIDOS"
      },
      {
        "id": 2,
        "shapeid": "myCustomShape",
        "x": 566.23,
        "y": 428.9,
        "label": "Ottawa",
        "labelpos": "",
        "country": "CANADA"
      },
      {
        "id": 3,
        "shapeid": "myCustomShape",
        "x": 441.5,
        "y": 618.54,
        "label": "Mexico",
        "labelpos": "left",
        "country": "MEXICO"
      },
    ]
  }
};
@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss']
})
  

export class DashComponent implements OnInit {
  dataSource: Object;
  options: Object;
  layers: any;
  layersControl: any;
  titleConsume = 'CONSUMO EM KWH';
  titleEconomy = 'GASTO EM R$';

  maptitle = 'MAPA';

  myType = ChartType.AreaChart;

  mapType = ChartType.Map;

  consumeTypeChart = true;
  
  myDataConsume = [
    ['jan', 600, 1100],
    ['fev', 600, 1160],
    ['mar', 600, 1120],
    ['abr', 600, 1140],
    ['mai', 600, 1120],
    ['jun', 600, 1120],
    ['jul', 600, 1120],
    ['ago', 600, 1120],
    ['set', 600, 1120],
    ['out', 600, 1120],
    ['nov', 600, 1120],
    ['dez', 600, 1120],
  ];

  myDataEconomy = [
    ['jan', 40, 400],
    ['fev', 170, 460],
    ['mar', 60, 1120],
    ['abr', 30, 540],
    ['mai', 60, 1120],
    ['jun', 60, 1120],
    ['jul', 60, 1120],
    ['ago', 60, 1120],
    ['set', 60, 1120],
    ['out', 60, 1120],
    ['nov', 60, 1120],
    ['dez', 60, 1120],
  ];

  chartColumnsConsume = ['Mês', 'LED', 'COMUM'];
  chartColumnsEconomy = ['Mês', 'LED', 'COMUM'];

  googlechartsoptions = {
    legend: { position: 'top', alignment: 'end'},
    width: 600,
    height: 300,
    vAxis: { minValue: 0 }
  }

  constructor() {
    this.dataSource = {
      "chart": {
        "caption": "Average Annual Population Growth",
        "subcaption": " 1955-2015",
        "numbersuffix": "%",
        "includevalueinlabels": "1",
        "labelsepchar": ": ",
        "entityFillHoverColor": "#FFF9C4",
        "theme": "fusion"
      },
      // Aesthetics; ranges synced with the slider
      "colorrange": colorrange,
      // Source data as JSON --> id represents countries of the world.
      "data": dataset

    };
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
      ],
      zoom: 5,
      center: latLng(46.879966, -121.726909)
    };
    
    this.layers = [
      circle([46.95, -122], { radius: 5000 }),
      polygon([[46.8, -121.85], [46.92, -121.92], [46.87, -121.8]]),
      marker([46.879966, -121.726909])
    ]
  }
  // Marker cluster stuff
  markerClusterGroup!: L.MarkerClusterGroup;
  markerClusterData: any[] = [];
  markerClusterOptions!: L.MarkerClusterGroupOptions;

  // Generators for lat/lon values
  generateLat() {
    return Math.random() * 360 - 180;
  }
  generateLon() {
    return Math.random() * 180 - 90;
  }

  ngOnInit(): void {
    this.generateData();
  }

  markerClusterReady(group: L.MarkerClusterGroup) {
    this.markerClusterGroup = group;
  }

  generateData() {
    const data: any[] = [];
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    for (let i = 1; i < 500; i++) {
      const icon = L.icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });

      data.push(L.marker([this.generateLon(), this.generateLat()], { icon }));
    }

    this.markerClusterData = data;
  }

}
