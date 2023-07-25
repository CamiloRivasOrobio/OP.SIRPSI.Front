import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Response } from 'src/app/core/models/response';
import { environment } from 'src/environments/environment';
import { AccountService } from './account.service';
import { skipApiKey } from 'src/app/core/interceptors/skip-api-key';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  constructor(public http: HttpClient, private accountService: AccountService) { }

  public GetAll(origin: string, data?: any): Observable<any> {
    return this.http.get<any>(environment.urlApi + origin + (data != null ? data : ""), { context: skipApiKey() });
  }
  public GetById(origin: string, id: any): Observable<Response> {
    return this.http.get<Response>(environment.urlApi + origin + "/" + id, { context: skipApiKey() });
  }
  public Post(origin: string, data?: any): Observable<Response> {
    return this.http.post<Response>(environment.urlApi + origin, data);
  }
  public Put(origin: string, data?: any): Observable<Response> {
    return this.http.put<Response>(environment.urlApi + origin + '/' + data.id, data);
  }
  public Delete(origin: string, id: any): Observable<Response> {
    return this.http.delete<Response>(environment.urlApi + origin + "/" + id);
  }
  public ChangeStatus(origin: string, id: number): Observable<Response> {
    return this.http.put<Response>(environment.urlApi + origin + '/status/' + id, null);
  }
}