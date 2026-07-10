import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Send, MessageCircle, Phone, Mail, MapPin } from 'lucide-angular';
import { UmamiService } from '../../../../core/services/umami.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private umami = inject(UmamiService);
  readonly icons = { Send, MessageCircle, Phone, Mail, MapPin };

  contactForm = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  onSubmit() {
    this.umami.trackEvent('submit_contact_form', { subject: this.contactForm.subject });
    console.log('Form Submitted', this.contactForm);
    alert('¡Gracias por tu mensaje! Nos pondremos en contacto pronto.');
    this.contactForm = { name: '', email: '', subject: '', message: '' };
  }

  openWhatsApp() {
    this.umami.trackEvent('click_whatsapp', { location: 'contact_section' });
    const phoneNumber = '573124870684';
    const message = encodeURIComponent('Hola! Quisiera más información sobre el Congreso de Geología UPTC 2026.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  }
}
