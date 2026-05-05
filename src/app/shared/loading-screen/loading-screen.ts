import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.scss'
})
export class LoadingScreen implements OnInit {

  isHidden = false;

  ngOnInit() {
    setTimeout(() => {
      this.isHidden = true;
    }, 2500);
  }
}