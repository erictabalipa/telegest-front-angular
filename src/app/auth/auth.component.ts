import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { tap } from "rxjs";
import { ApiService } from "../api.service";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"],
})
export class AuthComponent implements OnInit {
  form = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService, private router: Router) {}

  submitForm() {
    if (this.form.invalid) {
      alert("Informe todos os dados");
      return;
    }

    this.authService
      .authenticate(
        this.form.get("email")?.value,
        this.form.get("password")?.value
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  ngOnInit(): void {}
}
