import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OutputsService } from '../service/outputs.service';
import { TokenService } from '../service/token.service';


@Injectable({
    providedIn: 'root'
})

export class ProGuardService implements CanActivate {

    realRol: string;

    constructor(private tokenService: TokenService,
        private router: Router) {

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const expectedRol = route.data.expectedRol;
        const roles = this.tokenService.getAuthorities();
        this.realRol = 'user';
        roles.forEach(rol => {
            if (rol == 'ROLE_ADMIN') {
                this.realRol = 'admin';
            }
        });
        if (!this.tokenService.getToken() || expectedRol.indexOf(this.realRol) === -1) {
           console.log("Paso por aqui");
            let rutaActual = state.url.split('_');
            if(rutaActual[1] !=null || rutaActual[1] !=""){
              this.router.navigate(['/login']);
              window.sessionStorage.setItem("ruta",rutaActual[0]);
            }else{
                this.router.navigate(['/login']);
            }
            
            return false;
        }
        return true;
    }




}