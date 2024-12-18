import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { rolesGuard } from './guards/roles.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'forbidden', component: ForbiddenComponent},
  { path: 'users', component: UserListComponent, canActivate: [rolesGuard], data: {rolesPermitidos: ["lectura","admin"]} },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'create-user', component: UserCreateComponent , canActivate: [rolesGuard], data: {rolesPermitidos: ["write","admin"]} },
  { path: 'update-user/:id', component: UserUpdateComponent , canActivate: [rolesGuard], data: {rolesPermitidos: ["write","admin"]} },
  { path: 'login', component: LoginComponent},
  { path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })], 
  exports: [RouterModule]
})
export class AppRoutingModule { }
