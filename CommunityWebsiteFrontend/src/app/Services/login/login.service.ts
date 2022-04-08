import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = "http://localhost:8100"

  constructor(private http : HttpClient) { }

  username : String;
  generateToken(credentials : any){
    return this.http.post(`${this.url}/token`,credentials);
  }

  findRol(username : any) {
    return this.http.get(`${this.url}/findRol/${username}`); 
  }

  loginUser(token : any) {
    localStorage.setItem("token",token);
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");

    if(token == undefined || token == '' || token == null) {
      return false;
    } else {
      return true;
    }
  }

  logout(){
    localStorage.removeItem('token');
    return true;
  }

  getUsername(){
    return this.username;
  }
  setUsername(username : any) {
    this.username = username;
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
