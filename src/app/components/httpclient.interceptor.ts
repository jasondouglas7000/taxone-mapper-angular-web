import { HttpInterceptor, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';


export function HttpClientInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>>{
    console.log("HttpClientInterceptor");
    const auth = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + sessionStorage.getItem("token")!)
    })
    
    return next(auth);
}