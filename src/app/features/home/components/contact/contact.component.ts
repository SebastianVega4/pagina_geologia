import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Send, MessageCircle, Phone, Mail, MapPin } from 'lucide-angular';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  readonly icons = { Send, MessageCircle, Phone, Mail, MapPin };

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    console.log('Form Submitted', this.contactForm);
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    // Reset form
    this.contactForm = { name: '', email: '', subject: '', message: '' };
  }

  openWhatsApp() {
    const phoneNumber = '573124870684';
    const message = encodeURIComponent('Hola! Quisiera más información sobre el Congreso de Geología UPTC 2026.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}
