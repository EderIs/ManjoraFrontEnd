import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from '../../models/loginUsuario';
import { DefaultLayoutComponent } from '../../containers';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls:['login.component.scss']
})
export class LoginComponent implements OnInit {

  isLogged: Boolean = false;
  isLoginFail: Boolean = false;
  loginUsuario: LoginUsuario;
  nombreUsuario:string;
  password:string;
  public roles : string[] = [];

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles=this.tokenService.getAuthorities();
    }
  }

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) { }

onLogin():void{

this.loginUsuario = new LoginUsuario(this.nombreUsuario,this.password);

this.authService.login(this.loginUsuario).subscribe(model=>{

this.isLogged=true;
this.isLoginFail=false;

this.tokenService.setToken(model.token);
this.tokenService.setUserName(model.nombreUsuario);
this.tokenService.setAuthorities(model.authorities);

this.roles = model.authorities;
this.router.navigate(['/dashboard']);

},err=>{

alert("Datos incorrectos!");
this.isLogged=false;
this.isLoginFail=true;
this.nombreUsuario="";
this.password="";
})

}


}
