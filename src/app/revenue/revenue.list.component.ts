import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'sourceconfig-list',
	templateUrl : 'sourceconfig.list.component.html'
})

export class SourceConfigListComponent {
	private baseApi = environment.baseApi;
	
	public sourceTypes: string[] = ['Database', 'TXT', 'FTP'];
	
	public dataSourceConfigs: any[] = [];
	
	public sourceType: string = 'Database';
	
	constructor(private router: Router, private http: HttpClient){
		this.loadDataSources();
	}
	
	loadDataSources(){
		this.http.get(this.baseApi + "dataSourceConfigs").
		subscribe( (response : any) => {
			this.dataSourceConfigs = response;
			//remove the sourceTypes already used
			this.dataSourceConfigs.forEach(dsc => {
				let idx = this.sourceTypes.indexOf(dsc.dataSourceType);
				//this.sourceTypes.splice(idx, 1);
			});
		}, error => {
			alert("Error listing the datasources");
		});
	}
	
	onEdit(sourceType: string){
		this.router.navigate(['sourceconfig', sourceType, 'E']);
	}
	
	onAdd(sourceType: string){
		this.router.navigate(['sourceconfig', sourceType, 'A']);
	}
	
}