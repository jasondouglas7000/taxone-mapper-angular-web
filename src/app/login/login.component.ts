import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { environment } from './../../environments/environment';

import { LoginService } from './shared/login.service';
import { ModalService } from '../components/modal/modal.service';


@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css'],
	imports: [CommonModule, FormsModule]
})

export class LoginComponent{
	private baseApi = environment.baseApi;
	public user: any = {};
	
	constructor(private router: Router, private loginService: LoginService, private modalService: ModalService){}
	
	onLogin(){
		if (!this.valid()){
			this.modalService.showMessage("Todos os campos são obrigatórios");
			return;
		}
		
		this.loginService.login(this.user)
		.subscribe((response: any) => {
			this.loginService.token = response.token;
			this.router.navigate(['upload']);
		}, error => {
			this.modalService.showMessage("Login inválido");
		});
	}
	
	valid(){
		if (!this.user.username ||  this.user.username == ''){
			return false;
		}
		if (!this.user.password ||  this.user.password == ''){
			return false;
		}
		return true;
	}
	
}