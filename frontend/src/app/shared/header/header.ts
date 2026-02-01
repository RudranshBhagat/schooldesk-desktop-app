import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-header',
  imports: [RouterModule  ],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  constructor(private authService: Auth){}
    logOut(){
      this.authService.logOut();
    }
    isLoggedIn(){
     return this.authService.isLoggedIn();
    }
}
