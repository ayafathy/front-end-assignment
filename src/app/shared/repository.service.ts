import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { ConfigService } from './config-service';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { timeout } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route));
  }


  public create = (route: string, body) => {

    return this.http.post(this.createCompleteRoute(route), body, this.generateHeaders());
  }

  public postFile = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route), body, this.generateMultiPartHeaders());
  }
  token: string;


  async Login(file: File, route: string): Promise<any> {
    return await this.http.post(this.createCompleteRoute(route), file).toPromise();
  }

  pushFileToStorage(file: File, route: string): Observable<HttpEvent<{}>> {
    let formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.createCompleteRoute(route), formdata, {
      reportProgress: true,
      responseType: 'blob'
    });

    return this.http.request(req).pipe(timeout(6000000));
  }

  pushFile = (formdata: FormData, route: string) => {
    /*  let formdata: FormData = new FormData();
  
      formdata.append('file', file);
      formdata.append('obj', obj);
  /*return this.http.post(this.createCompleteRoute(route), formdata,{reportProgress: true,
    responseType: 'json'}).pipe(timeout(6000000));
  */

    let headers = new HttpHeaders();
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");
    let params = new HttpParams();

    return this.http.post(this.createCompleteRoute(route), formdata, { params, headers }).pipe(timeout(6000000));

  }

  public createWithFile = (route: string, body) => {

    return this.http.post(this.createCompleteRoute(route), body);
  }

  public getDataToFile = (route: string) => {
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get(this.createCompleteRoute(route), httpOptions);
  }

  public downloadFile(route: string, filename: string): Observable<HttpResponse<string>> {

    let headers = new HttpHeaders();
    headers = headers.append('Accept', 'text/csv; charset=utf-8');

    return this.http.post(this.createCompleteRoute(route), filename, {
      headers: headers,
      observe: 'response',
      responseType: 'text'
    });

  }

  public getDownloadFile(route: string): Observable<HttpEvent<{}>> {

    const req = new HttpRequest('GET', this.createCompleteRoute(route), {
      reportProgress: true,
      responseType: 'blob'
    });

    return this.http.request(req).pipe(timeout(6000000));
  }
  public update = (route: string, body) => {
    return this.http.put(this.createCompleteRoute(route), body, this.generateHeaders());
  }

  public delete = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route));
  }

  private createCompleteRoute = (route: string) => {
    return `${this.configService.readConfig().api}/${route}`;
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
  private generateMultiPartHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    };
  }
}
