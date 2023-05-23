import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  private baseURL = "https://telegestao-back.vercel.app";

  constructor(private http: HttpClient) {}

  getSession() {
    return localStorage.getItem("session@token");
  }

  login(email?: string | null, password?: string | null) {
    return this.http.post(`${this.baseURL}/login`, { email, password });
  }

  getLamps() {
    return this.http.get(`${this.baseURL}/lamps?addressed=true`, {
      headers: {
        Authorization: `Bearer ${this.getSession()}`,
      },
    });
  }
}
