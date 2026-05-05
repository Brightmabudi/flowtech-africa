import { Component, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements AfterViewInit {

  form = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  };

  submitted = false;
  newsletter = '';
  subscribed = false;

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

  submitForm() {
    if (!this.form.firstName || !this.form.email) {
      alert('Please fill in your name and email.');
      return;
    }
    this.submitted = true;
    this.form = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      interest: '',
      message: ''
    };
  }

  subscribeNL() {
    if (!this.newsletter || !this.newsletter.includes('@')) {
      alert('Please enter a valid email.');
      return;
    }
    this.subscribed = true;
    this.newsletter = '';
  }
}