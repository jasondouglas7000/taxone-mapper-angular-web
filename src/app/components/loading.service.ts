import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs';

import { Paginator } from '../components/common/model';


@Injectable({
	providedIn: "root"
})
export class LoadingService {
	public loading: BehaviorSubject<boolean> =  new BehaviorSubject <boolean>(false);
}

