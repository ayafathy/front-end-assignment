import { HttpClientModule, HttpClient, HttpBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ConfigModel{
  api:string;
}
@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private configuration: ConfigModel;

  constructor(private httpClient: HttpClient, private httpBackend: HttpBackend) {
  }
  loadInfo(): Promise<boolean> {
    // bypass HTTP interceptors by using HttpBackend
    const http = new HttpClient(this.httpBackend);

    return (
      http
        .get<any>('/assets/config/config.json')
        // convert to Promise per Angular's `useFactory` requirement (not officially documented)
        .toPromise()
        .then(response => {
          // using a class factory to keep AppInfo class getters in place
          this.configuration = response;
        })
        // returning `true` to satisfy `useFactory` contract (not officially documented)
        .then(_ => Promise.resolve(true))
        .catch(error => {
          return Promise.resolve(false);
        })
    );
  }

  readConfig(): ConfigModel {
    return this.configuration;
  }
}
