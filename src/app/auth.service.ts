import { Injectable } from "@angular/core";
import { BehaviorSubject, tap } from "rxjs";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  isNotLoggedIn$ = true;

  constructor(private apiService: ApiService) {
    const token = localStorage.getItem("session@token");

    if (token) {
      this._isLoggedIn$.next(true);
      this.isNotLoggedIn$ = false;
    }
  }

  authenticate(email?: string | null, password?: string | null) {
    return this.apiService.login(email, password).pipe(
      tap((response: any) => {
        localStorage.setItem("session@token", response.token);
        this._isLoggedIn$.next(true);
        this.isNotLoggedIn$ = false;
      })
    );
  }

  logout() {
    localStorage.clear();
    this.isNotLoggedIn$;
    window.location.reload();
  }
}
