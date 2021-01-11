 import { Injectable, Output, EventEmitter, Input } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, GuardsCheckStart, GuardsCheckEnd
} from '@angular/router';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BroadcastService } from './broadcast.service';
// import { filter } from 'rxjs/operators';
import 'rxjs/add/operator/filter';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  @Output() getPermission = new EventEmitter();
  public jwtToken: any;
  public accessRoutes: any;
  public userRole: any;
  public viewPermission: any;
  public routeName: any;
  public checkAdmin: any;
  public landingPageObject: any;
  public projectScreen: any;
  public userId: any;
  public permissions: any[] = [];
  public adminpermission: any = [];
  public userpermission: any = [];
  public devpermission: any = [];
  public guestpermission: any = [];
  public routearray: any[] = [];

  constructor(
    private route: Router,
    public broadcastService: BroadcastService
  ) {
    this.broadcastService.currentUserName.subscribe(authGuardValue => {
      // @ts-ignore
      this.accessRoutes = authGuardValue.Access;
    });

    this.route.events.filter(value => value instanceof GuardsCheckStart).subscribe((value: GuardsCheckStart) => {
      console.log('--------routevalue----', this.route.config);
      this.routeName = value.url.split('/');
    });
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // console.log('------loggedvalue----', state.url);
    return this.checkLoogedIn(state.url);
  }
  checkLoogedIn(url: String) {
    this.routeName = url.split('/');
    this.userId = sessionStorage.getItem('Id');
    if (this.userId !== null) {
      this.jwtToken = sessionStorage.getItem('JwtToken');
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(this.jwtToken);
      this.userRole = decodedToken.role;
      this.accessRoutes = JSON.parse(sessionStorage.getItem('Access'));

      if (this.accessRoutes) {
        this.accessRoutes.forEach(element => {
          let Admin = element['Admin'];
          let Developer = element['Developer'];
          let Guest = element['Guest'];
          let StandardUser = element['Standard User'];
          this.permissions = [];
          if (this.userRole == 'Admin') {
            const permissionlevel = JSON.parse(Admin.value);
            for (let key in permissionlevel) {
              const accessvalue = permissionlevel[key];
              for (let role in accessvalue[0]) {
                if (role == 'Admin') {
                  if (accessvalue[0][role].value == true) {
                    for (let i = 0; i < this.route.config.length; i++) {
                      this.viewPermission = accessvalue[0][role].value;
                      this.permissions.push(key);
                      this.routearray.push(key);
                      this.routearray = this.routearray.filter((item, index) => this.routearray.indexOf(item) === index)
                      this.permissions = this.permissions.filter((item, index) => this.permissions.indexOf(item) === index)
                    }
                    this.broadcastService.sendMessage({ 'Admin': this.permissions });
                  }
                }
              }
            }
          }
          if (this.userRole == 'Developer') {
            const permissionlevel = JSON.parse((Developer.value));
            for (let key in permissionlevel) {
              const accessvalue = permissionlevel[key];
              for (let role in accessvalue[0]) {
                if (role == 'Developer') {
                  if (accessvalue[0][role].value == true) {
                    for (let i = 0; i < this.route.config.length; i++) {
                      this.viewPermission = accessvalue[0][role].value;
                      this.permissions.push(key);
                      this.permissions = this.permissions.filter((item, index) => this.permissions.indexOf(item) === index)
                      this.routearray.push(key);
                      this.routearray = this.routearray.filter((item, index) => this.routearray.indexOf(item) === index)
                    }
                    this.broadcastService.sendMessage({ 'Developer': this.permissions });
                  }
                }
              }
            }
          }
          if (this.userRole == 'Standarduser') {
            const permissionlevel = JSON.parse((StandardUser.value));
            for (let key in permissionlevel) {
              const accessvalue = permissionlevel[key];
              for (let role in accessvalue[0]) {
                if (role == 'User') {
                  if (accessvalue[0][role].value == true) {
                    for (let i = 0; i < this.route.config.length; i++) {
                      this.viewPermission = accessvalue[0][role].value;
                      this.permissions.push(key);
                      this.permissions = this.permissions.filter((item, index) => this.permissions.indexOf(item) === index)
                      this.routearray.push(key);
                      this.routearray = this.routearray.filter((item, index) => this.routearray.indexOf(item) === index)
                    }
                    this.broadcastService.sendMessage({ 'User': this.permissions });
                  }
                }
              }
            }
          }
          if (this.userRole == 'Guest') {
            const permissionlevel = JSON.parse((Guest.value));
            for (let key in permissionlevel) {
              const accessvalue = permissionlevel[key];
              for (let role in accessvalue[0]) {
                if (role == 'Guest') {
                  if (accessvalue[0][role].value == true) {
                    for (let i = 0; i < this.route.config.length; i++) {
                      this.viewPermission = accessvalue[0][role].value;
                      this.permissions.push(key);
                      this.permissions = this.permissions.filter((item, index) => this.permissions.indexOf(item) === index)
                      this.routearray.push(key);
                      this.routearray = this.routearray.filter((item, index) => this.routearray.indexOf(item) === index)
                    }
                    this.broadcastService.sendMessage({ 'Guest': this.permissions });
                  }
                }
              }
            }
          }
        });
        if (this.routeName[1] == 'home') {
          return true
        }
        return this.routearray.filter(routevalue => routevalue === this.routeName[1]).length > 0;
      }
    } else {
      this.route.navigate(['/home']);
      return false;
    }
  }
}
