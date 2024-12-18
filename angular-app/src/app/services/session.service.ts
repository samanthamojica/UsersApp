import { Injectable, NgZone } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private inactivityTimeout: any;
  private readonly INACTIVITY_TIME = 60000;

  constructor(private keycloakService: KeycloakService, private ngZone: NgZone) {
  }

  public setupActivityListeners(): void {
    ['mousemove', 'keydown', 'click', 'touchstart'].forEach((event) => {
      window.addEventListener(event, this.resetTimer.bind(this));
    });

    this.resetTimer();
  }

  private resetTimer(): void {
    if (this.inactivityTimeout) {
      clearTimeout(this.inactivityTimeout);
    }

    this.ngZone.runOutsideAngular(() => {
      this.inactivityTimeout = setTimeout(() => {
        this.logoutDueToInactivity();
      }, this.INACTIVITY_TIME);
    });
  }

  private logoutDueToInactivity(): void {
    console.warn('Logging out due to inactivity');
    this.keycloakService.logout();
  }

}