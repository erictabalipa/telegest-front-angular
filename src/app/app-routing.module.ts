import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Components for routers
import { AuthComponent } from "./auth/auth.component";
import { DashComponent } from "./dash/dash.component";
import { CreateLampComponent } from "./lamp/create-lamp/create-lamp.component";
import { LampComponent } from "./lamp/lamp.component";
import { CreateUserComponent } from "./user/create-user/create-user.component";
import { UserComponent } from "./user/user.component";
import { ServiceOrderComponent } from "./service-order/service-order.component";
import { LampReportComponent } from './reports/lamp-report/lamp-report.component';
import { ErrorReportComponent } from './reports/error-report/error-report.component';
import { UserActiviyReportComponent } from './reports/user-activiy-report/user-activiy-report.component';
import { ServiceOrderReportComponent } from './reports/service-order-report/service-order-report.component';
import { CreateServiceOrderComponent } from "./service-order/create-service-order/create-service-order.component";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
  // {
  //   path: 'auth',
  //   component: AuthComponent,
  // },
  {
    path: "",
    component: DashComponent,
  },
  {
    path: "user",
    component: UserComponent,
  },
  {
    path: "user/create",
    component: CreateUserComponent,
  },
  {
    path: "profile",
    component: ProfileComponent,
  },
  {
    path: "lamp",
    component: LampComponent,
  },
  {
    path: "lamp/create",
    component: CreateLampComponent,
  },
  {
    path: "service-order",
    component: ServiceOrderComponent,
  },
  {
    path: "service-order/create",
    component: CreateServiceOrderComponent,
  },

  {
    path: "reports/lamps-report",
    component: LampReportComponent,
  },
  {
    path: "reports/error-report",
    component: ErrorReportComponent,
  },
  {
    path: "reports/user-activiy-report",
    component: UserActiviyReportComponent,
  },
  {
    path: "reports/service-order-report",
    component: ServiceOrderReportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
