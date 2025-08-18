import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';


@Injectable({
    providedIn: 'root'
})
export class LoginService{
	private baseApi = environment.baseApi;
    public token: string | null = null;
	
	constructor(private http: HttpClient){}
	

	login(user: any){
		return this.http.post(this.baseApi + 'authenticate', user);
	}

}
