import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from './components/loading.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet, RouterLink, NgIf, AsyncPipe]
})
export class AppComponent {
  loading$: Observable<boolean>;
	
  constructor(public loadingService: LoadingService){
    this.loading$ = this.loadingService.loading;
  }

  isLogged(): boolean{
	  return sessionStorage.getItem("token") !== null;
  }
  
}