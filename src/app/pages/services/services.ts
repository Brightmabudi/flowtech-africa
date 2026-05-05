import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services implements AfterViewInit {

  ngAfterViewInit() {
    this.initReveal();
  }

  initReveal() {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
  }
}