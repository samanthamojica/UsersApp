import { Injectable } from '@angular/core';
import Keycloak from "keycloak-js";


export interface UserProfile {
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
  token: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloack: Keycloak | undefined;


  constructor() { }

  get keycloack(){
    if(!this._keycloack){
      this._keycloack = new Keycloak({
        //url: "http://localhost:8080/auth",
        url: "https://35.153.45.216:8443/auth",
        realm: "dummy-app",
        clientId: "angular-client"
      })
    }
    return this._keycloack
  }

  private _profile: UserProfile | undefined;

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init (){

    const authenticated = await this.keycloack?.init({
      onLoad: 'login-required'
    })

  }

}
