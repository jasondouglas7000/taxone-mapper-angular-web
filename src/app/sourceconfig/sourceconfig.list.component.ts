import { Component, Signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { environment } from './../../environments/environment';

import { LoadingService } from '../components/loading.service';
import { SourceConfigService } from './shared/sourceconfig.service';

import { SourceConfig } from '../components/common/model';
import { ModalService } from '../components/modal/modal.service';



@Component({
    selector: 'sourceconfig-list',
    templateUrl: 'sourceconfig.list.component.html',
    styleUrls: ['sourceconfig.list.component.css'],
	imports: [CommonModule, FormsModule],
	providers: [SourceConfigService]	
})

export class SourceConfigListComponent {
	private baseApi = environment.baseApi;
	
	public sourceTypes: string[] = ['Database', 'TXT', 'FTP'];
	
	public dataSourceConfigs: SourceConfig[] = [];
	
	public sourceType: string = 'Database';
	
	constructor(private router: Router, private loadingService: LoadingService, private sourceConfigService: SourceConfigService,
        private modalService: ModalService){
		this.loadDataSources();
	}
	
	loadDataSources(){
		this.sourceConfigService.dataSources().
		subscribe( (response : SourceConfig[]) => {
			this.dataSourceConfigs = response;
		}, error => {
			this.modalService.showMessage("Error listing the datasources");
		});
	}
	
	onEdit(sourceType: string | null){
		this.router.navigate(['sourceconfig', sourceType, 'E']);
	}
	
	onAdd(sourceType: string){
		this.router.navigate(['sourceconfig', sourceType, 'A']);
	}
	
}