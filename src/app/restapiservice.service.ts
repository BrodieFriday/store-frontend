import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Options } from '../types';

@Injectable({
  providedIn: 'root'
})
export class RESTAPIServiceService {

  constructor(private httpClient: HttpClient) { }

getData<T>(url: string, options: Options): Observable<T> {
  return this.httpClient.get<T>(url, options) as Observable<T>
}

}