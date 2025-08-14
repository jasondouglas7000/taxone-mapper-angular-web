import { inject  } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';

import { LoadingService } from './loading.service';


export function LoadingInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>{
    let loadingService = inject(LoadingService);
    loadingService.loading.next(true);
    //console.log("in LoadingInterceptor.intercept");
    return next(req)
    .pipe(delay(1), map((resp:any) => {
        //alert("resp:" + JSON.stringify(resp));
        loadingService.loading.next(false);
        return resp;
    }), 
    catchError((resp: any) => {
        loadingService.loading.next(false);
        return resp;
    })) as Observable<HttpEvent<any>>;
}


