import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from './components/loading.service';
import { LoginService } from './login/shared/login.service';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './components/modal/modal.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe,
    ModalComponent 
    ]
})
export class AppComponent {
  loading$: Observable<boolean>;
	
  constructor(public loadingService: LoadingService, private loginService: LoginService, private modalService: ModalService){
    this.loading$ = this.loadingService.loading;
  }

  isLogged(): boolean{
	  return this.loginService.token !== null;
  }
  
  showModal() {
    this.modalService.showMessage("Hi FOLKS");
  }
  
}