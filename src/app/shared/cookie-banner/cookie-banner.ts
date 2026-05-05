import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-banner.html',
  styleUrl: './cookie-banner.scss'
})
export class CookieBanner implements OnInit {

  showBanner = false;

  ngOnInit() {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setTimeout(() => {
        this.showBanner = true;
      }, 2000);
    }
  }

  accept() {
    localStorage.setItem('cookieConsent', 'accepted');
    this.showBanner = false;
  }

  decline() {
    localStorage.setItem('cookieConsent', 'declined');
    this.showBanner = false;
  }
}