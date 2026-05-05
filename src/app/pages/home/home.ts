import { Component, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements AfterViewInit {

  ngAfterViewInit() {
    this.initReveal();
    this.spawnTechIcons();
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

  spawnTechIcons() {
    const icons = ['⚙️','💻','🖥️','📡','🔧','🗄️','📊','🔌','⌨️','🤖','☁️','🔒','💾','🛡️','🔗','📈','🧩','⚡'];
    const canvas = document.getElementById('tech-canvas');
    if (!canvas) return;

    const spawn = () => {
      const el = document.createElement('div');
      el.className = 'tech-icon';
      el.textContent = icons[Math.floor(Math.random() * icons.length)];
      el.style.left = (Math.random() * 100) + 'vw';
      const dur = 14 + Math.random() * 20;
      el.style.animationDuration = dur + 's';
      el.style.animationDelay = (Math.random() * -dur) + 's';
      canvas.appendChild(el);
      setTimeout(() => el.remove(), (dur + 5) * 1000);
    };

    for (let i = 0; i < 25; i++) spawn();
    setInterval(spawn, 2200);
  }
}