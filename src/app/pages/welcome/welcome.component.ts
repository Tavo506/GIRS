import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {


  constructor(private router : Router) { }

  ngOnInit(): void {
    var welcome = this.getLocalStorage();
    if(welcome === 'true') {
      window.location.href = this.router.url + '/home';
    }
  }

  setLocalStorage(): void {
    localStorage.setItem('welcome', 'true');
  }

  getLocalStorage(): any{
    
    var res = localStorage.getItem('welcome');
    return res
  }

  removeLocalStorage(): void {
    localStorage.removeItem('welcome');
  }
}
