import { Component, ErrorHandler, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../user.model';
import { KeycloakService } from '../keycloak/keycloak.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] | undefined;
  canUpdate: boolean = false;

  constructor(private userService: UserService, private router: Router,  private keycloakService: KeycloakService) {

  }

  ngOnInit(): void {
    this.getUsers();
    this.canUpdate = this.keycloakService.userHasWriteRole();
  }

  private getUsers() {
    this.userService.getUserList().subscribe(data => {
      this.users = data;
    });
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(data => {
      console.log(data);
      this.getUsers();
    },this.errorHandler);
  }

  errorHandler(e:HttpErrorResponse){
    alert(`Error al borrar: ${e.error??e.message}`)

  }
}
