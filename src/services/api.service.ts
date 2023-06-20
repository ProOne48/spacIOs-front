import { EnvironmentInterface } from '../definitions/environment.interface';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private domain: URL;

  private environment: EnvironmentInterface;
  constructor() {
    const currentUrl = new URL(window.location.href);
    this.environment = environment;
    this.domain = new URL(this.environment.apiPath, `${currentUrl.protocol}//${currentUrl.hostname}`);
    if (this.environment.apiPort) {
      this.domain.port = this.environment.apiPort.toString(10);
    }
  }

  public getApiUrl(): string {
    return this.domain.toString();
  }
}
