import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalculatorServiceService {
  localStorage: Storage;

  base_url = environment.base_url;

  changes$ = new Subject();

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  constructor(private http: HttpClient) { 
    this.localStorage   = window.localStorage;
  }
  getAdditionAnswer(num1,num2)
  {
    return this.http.get(this.base_url + "api/Addition?num1=" +num1+ "&num2="+ num2);
  }
  getDivisionAnswer(num1,num2)
  {
    return this.http.get(this.base_url + "api/Division?num1=" +num1+ "&num2="+ num2);
  }
  getMultiplyAnswer(num1,num2)
  {
    return this.http.get(this.base_url + "api/Multiply?num1=" +num1+ "&num2="+ num2);
  }
  getSubstractAnswer(num1,num2)
  {
    return this.http.get(this.base_url + "api/Substract?num1=" +num1+ "&num2="+ num2);
  }
  
}
