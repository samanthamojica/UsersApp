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
  
  refreshInterval: any;


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

    if(authenticated){
      this._profile = (await this._keycloack?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloack.token || '';
      const tokenParsed = this.keycloack.tokenParsed;
      if(tokenParsed && tokenParsed.resource_access){
        this._profile.roles = tokenParsed.resource_access['angular-client']?.roles || [];
      }
      console.log(this._profile);
      this.refreshInterval = setInterval(() => {
        this.refreshToken();}, 5000)
    }
    
  }

  async logout(){
    this.keycloack.logout({
      //redirectUri: "http://localhost:8080/users-app-ui/#/login",
      redirectUri: "https://35.153.45.216:8443/users-app-ui/#/login",
    });
  }

  userHasWriteRole(){
    return this.profile?.roles.some( role => role === "escritura" || role === "admin")??false;
  }


  refreshToken(){
    this.keycloack
    .updateToken()
    .then(refreshed => {
        if(refreshed){
          console.log('****toke refrescado');
          const tokenParsed = this.keycloack.tokenParsed;
        }else{
          console.log('----toke no refrescado');
        }
        const tokenParsed = this.keycloack.tokenParsed;
        if(tokenParsed && tokenParsed.resource_access && this._profile){
          this._profile.roles = tokenParsed.resource_access['angular-client']?.roles || [];
        } 
      }
    );
  }

}
