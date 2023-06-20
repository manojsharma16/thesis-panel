import {CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'

@Injectable({
    providedIn : 'root'
})

export class LoginCanActivateGuard{
    constructor(private router : Router){}
    canActivate(state : RouterStateSnapshot, route : ActivatedRouteSnapshot){
        if(!localStorage.getItem('username')){
            return true;
        }else{
            this.router.navigate(['msc-thesis-list']);
            return false;
        }
    }
}