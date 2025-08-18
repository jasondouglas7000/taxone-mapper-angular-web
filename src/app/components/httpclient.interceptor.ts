import { inject  } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { LoginService } from '../login/shared/login.service';

export function HttpClientInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>{
    let loginService = inject(LoginService);

    const auth = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + loginService.token!)
    })
    
    return next(auth);
}