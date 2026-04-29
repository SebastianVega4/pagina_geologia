import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, X, CheckCircle2, CreditCard, Info, Mail, Instagram, ArrowLeft, ZoomIn, UserCheck, Search, Wallet, FileText, Send, ClipboardList } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration-info',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, RouterLink],
  templateUrl: './registration-info.component.html',
  styleUrl: './registration-info.component.scss'
})
export class RegistrationInfoComponent implements OnInit {
  showZoom = false;

  readonly icons = {
    X,
    CheckCircle2,
    CreditCard,
    Info,
    Mail,
    Instagram,
    ArrowLeft,
    ZoomIn,
    UserCheck,
    Search,
    Wallet,
    FileText,
    Send,
    ClipboardList
  };

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  toggleZoom() {
    this.showZoom = !this.showZoom;
    if (this.showZoom) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}
