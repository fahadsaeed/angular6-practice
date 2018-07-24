import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {CanDeactivateGuradService} from './can-deactivate-gurad.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateGuradService {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changedSave = false;

  constructor(private serversService: ServersService, private router: ActivatedRoute, private route: Router) { }

  ngOnInit() {
    this.router.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['editAllow'] === '1';
    });

    const id = this.router.snapshot.params['id'];
    this.server = this.serversService.getServer(+id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changedSave = true;
    this.route.navigate(['../'], {relativeTo: this.router});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName !== this.server.name  || this.serverStatus !== this.server.status) &&  !this.changedSave ) {
          return confirm('Do you want to discard the changes');
    } else {
      return true;
    }
  }


}
