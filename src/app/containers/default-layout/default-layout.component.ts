import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../service/token.service';
import { navItems, navItemsUser } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public sidebarMinimized = false;
  public navItems;
  public roles: string[] = [];
  public nombreUsuarioFont :string;


  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor(
    private router: Router,
    private tokenService: TokenService
  ) {

  }
  ngOnInit(): void {

    if (this.tokenService.getToken != null) {

      this.roles = this.tokenService.getAuthorities();

      if (this.roles[0] == "ROLE_USER") {

        this.navItems = navItemsUser;

      } else {

        this.navItems = navItems;
      }
      this.nombreUsuarioFont =this.tokenService.getUserName();
    }
  }

  logOut(): void {

    this.router.navigate(['/login']);
    this.tokenService.logOut();

  }

}
