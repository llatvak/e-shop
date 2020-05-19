import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(activatedRoute: ActivatedRouteSnapshot): boolean {
        // Check if user is logged in and authenticate urls
        if (this.authService.loggedIn()) {
            // Check what user role is and autheticate urls if needed
            if (activatedRoute.data['roles'] !== undefined) {
                if (this.authService.getRole() === activatedRoute.data['roles']) {
                    return true;
                } else {
                    return false;
                }
            }
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}

