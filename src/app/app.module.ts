import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthComponent } from "./auth/auth.component";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "./material.module";
import { DashComponent } from "./dash/dash.component";
import { UserComponent } from "./user/user.component";
import { CreateUserComponent } from "./user/create-user/create-user.component";
import { LampComponent } from "./lamp/lamp.component";
import { CreateLampComponent } from "./lamp/create-lamp/create-lamp.component";
import { HttpClientModule } from "@angular/common/http";

import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { MatTableExporterModule } from 'mat-table-exporter';

import { ServiceOrderComponent } from './service-order/service-order.component';
import { LampReportComponent } from './reports/lamp-report/lamp-report.component';
import { ErrorReportComponent } from './reports/error-report/error-report.component';
import { UserActiviyReportComponent } from './reports/user-activiy-report/user-activiy-report.component';

import { GoogleChartsModule } from 'angular-google-charts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';

import { ServiceOrderReportComponent } from './reports/service-order-report/service-order-report.component';

import { NgxViacepModule } from "@brunoc/ngx-viacep";
import { CreateServiceOrderComponent } from './service-order/create-service-order/create-service-order.component';
import { ProfileComponent } from './profile/profile.component';

// Pass the fusioncharts library and chart modules


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashComponent,
    UserComponent,
    CreateUserComponent,
    LampComponent,
    CreateLampComponent,
    ServiceOrderComponent,
    LampReportComponent,
    ErrorReportComponent,
    UserActiviyReportComponent,
    ServiceOrderReportComponent,
    CreateServiceOrderComponent,
    ProfileComponent,
  ],
  imports: [
    // Native Angular Modules
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    // Material
    MaterialModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // GoogleCharts
    GoogleChartsModule,
    LeafletModule,
    LeafletMarkerClusterModule,

    // MDB
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,

    // CEP Consulting Module
    NgxViacepModule,

    // Export Tables Module
    MatTableExporterModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
