import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment';

import { Paginator, Email, EmailPage } from '../components/common/model';
import { PaginationComponent } from '../components/pagination.component';

import { AlertService } from './shared/alert.service';
import { ModalService } from '../components/modal/modal.service';


@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls:['alert.component.css'],
	imports: [CommonModule, FormsModule, PaginationComponent],
	providers: [AlertService]
})
export class AlertComponent {
	public totalPages : number = 0;
	public pagination : Paginator = new Paginator();

	public notificationTypes: string[] = ['ALL', 'OK', 'ERROR'];
	
	public emails: Email[] = [];
	public emailsFull: Email[] = [];
	
	public email: Email = new Email();
	
	constructor(private router: Router, private alertService: AlertService, private modalService: ModalService){
		this.loadEmails();
	}
	
	loadEmails(){
		this.alertService.loadEmails()
		.subscribe((response : EmailPage) => {
			this.emailsFull = response.content;
			this.totalPages = this.calcPages();
			//alert("this.totalPages:" + this.totalPages);
			this.emails = this.emailsFull.slice(0, this.pagination.size);
		});
	}
	
	calcPages(){
		let pages = Math.trunc(this.emailsFull.length / this.pagination.size);
		if (this.emailsFull.length%this.pagination.size != 0){
			pages++;
		}
		return pages;
	}
	
	valid(){
		if (!this.email.email || this.email.email == ''){
			return false;
		}
		
		if (!this.email.type || this.email.type == ''){
			return false;
		}
		
		return true;
	}
	
	onDelete(id: number | null){
		if (id){
			this.alertService.onDelete(id)
			.subscribe(() => {
				this.modalService.showMessage("Email excluido com sucesso");
				this.loadEmails();
			});
		}
	}
	
	onAdd(){
		if (!this.valid()){
			this.modalService.showMessage("Todos os campos são oberigatório");
			return;
		}
		
		this.emailsFull.splice(0,0,this.email);
		this.email = new Email();
		this.totalPages = this.calcPages(); 
		this.onPage(this.pagination.page);
	}
	
	onSave(){
		this.alertService.onSave(this.emails)
		.subscribe((response : Email[]) => {
			this.modalService.showMessage("Email salvo com sucesso");
		}, error => {
			this.modalService.showMessage("Erro salvando email");
		});

	}
	
	onPage(page: number){
		if (page >= 0 && page < this.totalPages){
			this.pagination.page=page;
			let start = this.pagination.page*this.pagination.size;
			this.emails = this.emailsFull.slice(start, start + this.pagination.size);
		}
	}	
}