import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};

  constructor(private router: ActivatedRoute) { }
  subscribeParams: Subscription;

  ngOnInit() {
    //   this.user = {
    //     id : this.router.snapshot.params['id'],
    //     name : this.router.snapshot.params['name']
    // };

    this.subscribeParams = this.router.params
      .subscribe((params: Params) => {
        console.log('subscribe call ..............', params);
        this.user = {
          id : params['id'],
          name : params['name']
        };
      });

  }

  ngOnDestroy() {
    this.subscribeParams.unsubscribe();
  }

}
