import { NestedTreeControl } from "@angular/cdk/tree";
import { Component } from "@angular/core";
import { MatTreeNestedDataSource } from "@angular/material/tree";
import { AuthService } from "./auth.service";

interface SideNavNode {
  title: string;
  icon?: string;
  route?: string;
  children?: SideNavNode[];
}

const TREE_DATA: SideNavNode[] = [
  
  {
    title: "Relatórios",
    icon: "description",
    children: [
      {
        title: "Luminárias",
        route: "reports/lamps-report",
      },
      {
        title: "Erros",
        route: "reports/error-report",
      },
      {
        title: "Histórico de ações",
        route: "reports/user-activiy-report",
      },
      {
        title: "Ordens de serviço",
        route: "reports/service-order-report",
      },
    ],
  },
  {
    title: "Cadastros",
    icon: "settings",
    children: [
      {
        title: "Luminárias",
        route: "lamp",
      },
      {
        title: "Usuários",
        route: "user",
      },
    ],
  },
];

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Sistema de Telegestão";

  treeControl = new NestedTreeControl<SideNavNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<SideNavNode>();

  constructor(public authService: AuthService) {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: SideNavNode) =>
    !!node.children && node.children.length > 0;

  ngOnInit(): void {}
}
