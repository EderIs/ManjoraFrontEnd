import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TokenService } from '../../service/token.service';
import { AuthService } from '../../service/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUsuario } from '../../models/loginUsuario';
import { DefaultLayoutComponent } from '../../containers';
import { OutputsService } from '../../service/outputs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls:['login.component.scss']
})
export class LoginComponent implements OnInit , OnDestroy {

  isLogged: Boolean = false;
  isLoginFail: Boolean = false;
  loginUsuario: LoginUsuario;
  nombreUsuario:string;
  password:string;
  public roles : string[] = [];
  navegacion : String;
  susb : Subscription[]=[];

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private outputService : OutputsService
  ) { }

  
  ngOnInit(): void {
    
   if(window.sessionStorage.getItem("ruta")!=null){
     this.ruta(window.sessionStorage.getItem("ruta"));
   }

    if (this.tokenService.getToken()) {
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles=this.tokenService.getAuthorities();
    }
  }

  ngOnDestroy(): void {
   if(this.susb.length > 0)
  this.susb.forEach(sub=>{
    sub.unsubscribe();
    });
  }

ruta(ruta){
this.navegacion=ruta;
console.log("Dentro: "+this.navegacion);
window.sessionStorage.removeItem("ruta");
}

onLogin():void{

this.loginUsuario = new LoginUsuario(this.nombreUsuario,this.password);

let login = this.authService.login(this.loginUsuario).subscribe(model=>{

this.isLogged=true;
this.isLoginFail=false;

this.tokenService.setToken(model.token);
this.tokenService.setUserName(model.nombreUsuario);
this.tokenService.setAuthorities(model.authorities);

this.roles = model.authorities;
if(this.navegacion !=null && this.navegacion != ""){
  this.router.navigate([this.navegacion]);
}else{
  this.router.navigate(['/dashboard']);
}


},err=>{

alert("Datos incorrectos!");
this.isLogged=false;
this.isLoginFail=true;
this.nombreUsuario="";
this.password="";
});
this.susb.push(login);

}


}
