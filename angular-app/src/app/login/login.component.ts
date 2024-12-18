import { Component } from '@angular/core';
import { KeycloakService } from '../keycloak/keycloak.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {


  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {
  }

  async ngOnInit(): Promise<void> {
    if(!this.keycloakService.keycloack.isTokenExpired()) {
      this.router.navigate(['users']);
      return;
    }
  }

}
