import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { KeycloakService } from '../keycloak/keycloak.service';

export const rolesGuard: CanActivateFn = (route, state) => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router)
  const roles = keycloakService.profile?.roles;
  const rolesPermitidos = route.data['rolesPermitidos'] as string[];

  if(roles?.some(role => rolesPermitidos.includes(role))){
    //uno de los roles del usuario esta en en los roles permidos para ruta
    return true;
  }else{
    router.navigate(['/forbidden']);
    return false;
  }
  
  
};
