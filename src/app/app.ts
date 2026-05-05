import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './core/navbar/navbar';
import { Footer } from './core/footer/footer';
import { CommonModule } from '@angular/common';
import { LoadingScreen } from './shared/loading-screen/loading-screen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer, CommonModule, LoadingScreen],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'flowtech-africa';
  showBackToTop = false;

  @HostListener('window:scroll')
  onScroll() {
    this.showBackToTop = window.scrollY > 400;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}