import { inject  } from '@angular/core';
import { Routes, ResolveFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateFn } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UploadComponent } from "./upload/upload.component";
import { SourceConfigListComponent } from './sourceconfig/sourceconfig.list.component';
import { SourceConfigComponent } from './sourceconfig/sourceconfig.component';
import { MatcherListComponent } from './matcher/matcher.list.component';
import { MatcherComponent } from './matcher/matcher.component';
import { ScheduleListComponent } from './schedule/schedule.list.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { MonitoringComponent } from './monitoring/monitoring.component';
import { MonitoringDetailComponent } from './monitoring/monitoring.detail.component';
import { RevenueComponent } from './revenue/revenue.component';
import { AlertComponent } from './alert/alert.component';
import { NotFoundComponent } from './notfound/notfound.component';

import { LoginService } from './login/shared/login.service';


export const AuthGuardFunction: CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
    let loginService = inject(LoginService);
    if (loginService.token != null){
        return true;
    }else{
        return false;
    }
}

export const routes: Routes = [
	{path : "", component: LoginComponent},
	{path : "upload", component: UploadComponent, canActivate: [AuthGuardFunction]},
	{path : "sourceconfig-list", component: SourceConfigListComponent, canActivate: [AuthGuardFunction]}, 
	{path : "sourceconfig/:sourceType/:operation", component: SourceConfigComponent, canActivate: [AuthGuardFunction]}, 
	{path : "matcher-list", component: MatcherListComponent, canActivate: [AuthGuardFunction]}, 
	{path : "matcher/:tableName", component: MatcherComponent, canActivate: [AuthGuardFunction]},
	{path : "schedule-list", component: ScheduleListComponent, canActivate: [AuthGuardFunction]},
	{path : "schedule", component: ScheduleComponent, canActivate: [AuthGuardFunction]},
	{path : "monitoring", component: MonitoringComponent, canActivate: [AuthGuardFunction]},
	{path : "monitoring-datail/:id", component: MonitoringDetailComponent, canActivate: [AuthGuardFunction]},
	{path : "revenue", component: RevenueComponent, canActivate: [AuthGuardFunction]},
	{path : "alert", component: AlertComponent, canActivate: [AuthGuardFunction]},
	{path : "login", component: LoginComponent},
	{path : "**", component: NotFoundComponent}
];


