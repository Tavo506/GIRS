import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {


  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {}

  setLocalStorage() : void {
    this.localStorageService.setLocalStorage("welcome", "true")
  }

  
}
