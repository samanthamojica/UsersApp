import { Component } from '@angular/core';
import { KeycloakService } from './keycloak/keycloak.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  canCreate: boolean = false;


  constructor(
    private keycloakService: KeycloakService,
    private session: SessionService
  ) {
  }

  ngOnInit(): void {
    this.session.setupActivityListeners();
    this.canCreate = this.keycloakService.userHasWriteRole();

  }


  async logout() {
    await this.keycloakService.logout();
  }

}
