import { inject  } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function ErrorInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>{

    return next(req)
    .pipe(catchError((resp:any) => {
        if (resp.status==401){
            let router = inject(Router);
            router.navigate(['login']);
        }
        return throwError(() => resp);
    })) as Observable<HttpEvent<any>>;
}


