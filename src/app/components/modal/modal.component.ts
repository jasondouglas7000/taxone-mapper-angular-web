import { NgIf } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalService } from './modal.service';

@Component({
    selector: 'modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.css'],
    imports: [NgIf]
})
export class ModalComponent{
    message : string = "";
    hide : boolean = true;
	
    constructor(public modalService: ModalService){
        modalService.message
        .subscribe((message: string) => {
            this.message = message;
        });
        modalService.hide
        .subscribe((hide: boolean) => {
            this.hide = hide;
        });
    }
    
	ok(){
        this.modalService.close();
    }

    nullable(e: any){
        e.stopPropagation();
    }
}