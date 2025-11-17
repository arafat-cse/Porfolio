import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable, model } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class CommonService{
  odata: boolean = true;
  api: boolean = false;
  ToastDuration: number = 2000;
  sidenavToggle = new EventEmitter<Boolean>();

  private lodataPrefix = environment.ServerApi + '/odata/';
  private apiPrefix = environment.ServerApi + '/api/';

  constructor( private http: HttpClient) {}
  emitSidenavToggle(isCollapsed: boolean){
    this.sidenavToggle.emit(isCollapsed);
  }

    /**
   * Generic GET request
   * @param url Endpoint URL
   * @param isLodata Use Lodata prefix
   * @param params Optional query parameters
   * @param headers Optional custom headers
   */

  get<T>(
    url: string,
    isLodata: boolean = true,
    params: HttpParams = new HttpParams(),
    headers: HttpHeaders = new HttpHeaders({
      'Cache-Control': 'no-cache', 
      Authorization: `Bearer ${localStorage.getItem('remember_token') }`,
    })
  ): Observable<T> {
    const urlPrefix = isLodata ? this.lodataPrefix : this.apiPrefix;
    const modifiedUrl = `${urlPrefix}${url}`;
    return this.http.get<T>(modifiedUrl, { headers, params });
  }

    /**
   * Generic POST request
   * @param url Endpoint URL
   * @param body Request payload
   * @param isLodata Use Lodata prefix
   * @param headers Optional custom headers
   */

    post<T>(
          url: string,
    body: any,
    isLodata: boolean = true,
    headers: HttpHeaders = new HttpHeaders({
      'Content-type': 'application/json',
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${localStorage.getItem('remember_token')}`,
    }),
    responseType: 'json' | 'blob' | 'text' = 'json'
    ): Observable<T> {
      const urlPrefix = isLodata ? this.lodataPrefix : this.apiPrefix;
      const modifiedUrl = `${urlPrefix}${url}`;
      if(body instanceof FormData){
        headers = headers.delete('Content-type');
      }
      return this.http.post<T>(modifiedUrl, body, { headers, responseType: responseType as 'json' });
    }
      /**
   * Generic PUT request
   * @param url Endpoint URL
   * @param body Request payload
   * @param isLodata Use Lodata prefix
   * @param headers Optional custom headers
   */
    put<T>(
      url: string,
      body: any,
      isLodata: boolean = true,
      headers: HttpHeaders = new HttpHeaders({
        'Content-type': 'application/json',
        Authorization:` Bearer ${localStorage.getItem('remember_token')}`,
      })
    ): Observable<T>{
      const urlPrefix = isLodata ? this.lodataPrefix : this.apiPrefix;
      const modifiedUrl = `${urlPrefix}${url}`;
      return this.http.put<T>(modifiedUrl, body, {headers});
    }

      /**
   * Generic DELETE request
   * @param url Endpoint URL
   * @param isLodata Use Lodata prefix
   * @param headers Optional custom headers
   */
    delete<T>(
      url: string,
      data: any = null,
      isLodata: boolean = true,
      headers: HttpHeaders = new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('remember_token')}`,
      })
    ): Observable<T>{
      const urlPrefix = isLodata ? this.lodataPrefix : this.apiPrefix;
      const modifiedUrl = `${urlPrefix}${url}`;
      return this.http.request<T>('DELETE', modifiedUrl, { body: data,headers: headers});
    }
    log(message: string): void {}

}