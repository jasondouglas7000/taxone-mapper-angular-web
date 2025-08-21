import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService{
    public message : Subject<string> = new Subject<string>(); 
    public hide : Subject<boolean> = new Subject<boolean>(); 
    
    showMessage(message: string){
        this.message.next(message);
        this.hide.next(false);
    }
    
    close(){
        this.hide.next(true);
    }
    
}