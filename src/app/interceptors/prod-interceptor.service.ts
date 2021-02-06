import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenService } from '../service/token.service';

@Injectable({
    providedIn: 'root'
})

export class InterceptorsService implements HttpInterceptor {
    
constructor(private tokenService:TokenService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let intRequ = req;

        const token = this.tokenService.getToken();
        if(token!=null){

            intRequ=req.clone({headers:req.headers.set('Authorization','Bearer '+ token)});

        }
        return next.handle(intRequ);
    }

}

export const interceptorProvider = [{provide:HTTP_INTERCEPTORS,useClass:InterceptorsService,multi:true}];