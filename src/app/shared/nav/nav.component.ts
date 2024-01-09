import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiProvider } from '../../providers/api.prov';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit{
  userLoginOn:boolean=false;
  constructor(private authService: ApiProvider){
    this.authService.loggedInStatus.subscribe(logginIn => {this.userLoginOn = logginIn});
  }

  ngOnInit(): void {
      
  }

}
