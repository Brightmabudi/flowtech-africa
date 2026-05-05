import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = new BehaviorSubject<boolean>(true);
  darkMode$ = this.darkMode.asObservable();

  constructor() {
    const saved = localStorage.getItem('theme');
    if (saved === 'light') {
      this.darkMode.next(false);
      document.body.classList.add('light-mode');
    }
  }

  toggle() {
    const isDark = !this.darkMode.value;
    this.darkMode.next(isDark);
    if (isDark) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }

  isDark() {
    return this.darkMode.value;
  }
}