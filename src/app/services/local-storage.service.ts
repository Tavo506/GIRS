import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setLocalStorage(object : string, value: any): void {
    localStorage.setItem(object, value);
  }

  getLocalStorage(object : string): any{
    
    var res = localStorage.getItem(object);
    return res
  }

  removeLocalStorage(object : string): void {
    localStorage.removeItem(object);
  }

}
